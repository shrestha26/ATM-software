import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { ATMState, Screen, User, Account, Transaction } from '../types/types';
import { users, accounts, transactions, generateRandomTransactions } from '../data/mockData';

// Initial state
const initialState: ATMState = {
  currentScreen: 'welcome',
  authenticated: false,
  currentUser: null,
  selectedAccount: null,
  accounts: [],
  transactions: [],
  amount: 0,
  error: null,
  receiptData: null,
};

// Action types
type Action =
  | { type: 'SET_SCREEN'; payload: Screen }
  | { type: 'AUTHENTICATE'; payload: { pin: string } }
  | { type: 'LOGOUT' }
  | { type: 'SELECT_ACCOUNT'; payload: Account }
  | { type: 'SET_AMOUNT'; payload: number }
  | { type: 'WITHDRAW'; payload: number }
  | { type: 'DEPOSIT'; payload: number }
  | { type: 'TRANSFER'; payload: { fromAccount: Account; toAccount: Account; amount: number } }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_RECEIPT'; payload: any }
  | { type: 'CLEAR_TRANSACTION' };

// Reducer function
const atmReducer = (state: ATMState, action: Action): ATMState => {
  switch (action.type) {
    case 'SET_SCREEN':
      return { ...state, currentScreen: action.payload, error: null };
      
    case 'AUTHENTICATE':
      const user = users.find(u => u.pin === action.payload.pin);
      if (user) {
        const userAccounts = accounts.filter(acc => acc.userId === user.id);
        const userTransactions = transactions.filter(tx => 
          userAccounts.some(acc => acc.id === tx.accountId)
        ).concat(
          // Add some random transactions for demo purposes
          ...userAccounts.map(acc => generateRandomTransactions(acc.id, 10))
        );
        
        return {
          ...state,
          authenticated: true,
          currentUser: user,
          accounts: userAccounts,
          transactions: userTransactions,
          currentScreen: 'home',
          error: null
        };
      }
      return { 
        ...state, 
        error: 'Invalid PIN. Please try again.',
        currentScreen: 'pin'
      };
      
    case 'LOGOUT':
      return { ...initialState, currentScreen: 'welcome' };
      
    case 'SELECT_ACCOUNT':
      return { ...state, selectedAccount: action.payload, error: null };
      
    case 'SET_AMOUNT':
      return { ...state, amount: action.payload, error: null };
      
    case 'WITHDRAW':
      if (!state.selectedAccount) return { ...state, error: 'No account selected' };
      
      if (state.selectedAccount.balance < action.payload) {
        return { ...state, error: 'Insufficient funds', currentScreen: 'error' };
      }
      
      const updatedAccounts = state.accounts.map(acc => 
        acc.id === state.selectedAccount.id
          ? { ...acc, balance: acc.balance - action.payload }
          : acc
      );
      
      const withdrawalTx: Transaction = {
        id: `tx-${Date.now()}`,
        accountId: state.selectedAccount.id,
        type: 'withdrawal',
        amount: action.payload,
        description: 'ATM Withdrawal',
        date: new Date().toISOString(),
      };
      
      return {
        ...state,
        accounts: updatedAccounts,
        transactions: [withdrawalTx, ...state.transactions],
        selectedAccount: updatedAccounts.find(acc => acc.id === state.selectedAccount?.id) || null,
        receiptData: withdrawalTx,
        currentScreen: 'receipt',
        error: null
      };
      
    case 'DEPOSIT':
      if (!state.selectedAccount) return { ...state, error: 'No account selected' };
      
      const accountsAfterDeposit = state.accounts.map(acc => 
        acc.id === state.selectedAccount?.id
          ? { ...acc, balance: acc.balance + action.payload }
          : acc
      );
      
      const depositTx: Transaction = {
        id: `tx-${Date.now()}`,
        accountId: state.selectedAccount.id,
        type: 'deposit',
        amount: action.payload,
        description: 'ATM Deposit',
        date: new Date().toISOString(),
      };
      
      return {
        ...state,
        accounts: accountsAfterDeposit,
        transactions: [depositTx, ...state.transactions],
        selectedAccount: accountsAfterDeposit.find(acc => acc.id === state.selectedAccount?.id) || null,
        receiptData: depositTx,
        currentScreen: 'receipt',
        error: null
      };
      
    case 'TRANSFER':
      const { fromAccount, toAccount, amount } = action.payload;
      
      if (fromAccount.balance < amount) {
        return { ...state, error: 'Insufficient funds for transfer', currentScreen: 'error' };
      }
      
      const accountsAfterTransfer = state.accounts.map(acc => {
        if (acc.id === fromAccount.id) {
          return { ...acc, balance: acc.balance - amount };
        } else if (acc.id === toAccount.id) {
          return { ...acc, balance: acc.balance + amount };
        }
        return acc;
      });
      
      const transferFromTx: Transaction = {
        id: `tx-from-${Date.now()}`,
        accountId: fromAccount.id,
        type: 'transfer',
        amount: amount,
        description: `Transfer to ${toAccount.type} ${toAccount.number}`,
        date: new Date().toISOString(),
        reference: `TX-${Date.now()}`
      };
      
      const transferToTx: Transaction = {
        id: `tx-to-${Date.now()}`,
        accountId: toAccount.id,
        type: 'deposit',
        amount: amount,
        description: `Transfer from ${fromAccount.type} ${fromAccount.number}`,
        date: new Date().toISOString(),
        reference: transferFromTx.reference
      };
      
      return {
        ...state,
        accounts: accountsAfterTransfer,
        transactions: [transferFromTx, transferToTx, ...state.transactions],
        selectedAccount: accountsAfterTransfer.find(acc => acc.id === fromAccount.id) || null,
        receiptData: transferFromTx,
        currentScreen: 'receipt',
        error: null
      };
      
    case 'SET_ERROR':
      return { ...state, error: action.payload };
      
    case 'SET_RECEIPT':
      return { ...state, receiptData: action.payload };
      
    case 'CLEAR_TRANSACTION':
      return { ...state, amount: 0, receiptData: null };
      
    default:
      return state;
  }
};

// Create context
type AtmContextType = {
  state: ATMState;
  dispatch: React.Dispatch<Action>;
};

const AtmContext = createContext<AtmContextType | undefined>(undefined);

// Context provider
export const AtmProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(atmReducer, initialState);
  
  // Auto logout after inactivity (3 minutes)
  useEffect(() => {
    if (state.authenticated) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'LOGOUT' });
      }, 3 * 60 * 1000); // 3 minutes
      
      return () => clearTimeout(timeout);
    }
  }, [state.authenticated, state.currentScreen]);
  
  return (
    <AtmContext.Provider value={{ state, dispatch }}>
      {children}
    </AtmContext.Provider>
  );
};

// Custom hook for using the ATM context
export const useAtm = (): AtmContextType => {
  const context = useContext(AtmContext);
  if (context === undefined) {
    throw new Error('useAtm must be used within an AtmProvider');
  }
  return context;
};