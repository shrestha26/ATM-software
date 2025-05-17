export interface User {
  id: string;
  name: string;
  pin: string;
}

export interface Account {
  id: string;
  userId: string;
  type: 'checking' | 'savings' | 'credit';
  number: string;
  balance: number;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'withdrawal' | 'deposit' | 'transfer';
  amount: number;
  description: string;
  date: string;
  reference?: string;
}

export type Screen = 
  | 'welcome' 
  | 'pin' 
  | 'home' 
  | 'balance' 
  | 'withdraw' 
  | 'deposit' 
  | 'transfer' 
  | 'history'
  | 'receipt'
  | 'error';

export interface ATMState {
  currentScreen: Screen;
  authenticated: boolean;
  currentUser: User | null;
  selectedAccount: Account | null;
  accounts: Account[];
  transactions: Transaction[];
  amount: number;
  error: string | null;
  receiptData: any | null;
}