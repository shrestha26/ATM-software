import React, { useState } from 'react';
import AtmScreen from '../components/AtmScreen';
import AccountCard from '../components/AccountCard';
import NumericKeypad from '../components/NumericKeypad';
import ActionButton from '../components/ActionButton';
import { useAtm } from '../contexts/AtmContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const TransferScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  const [fromAccount, setFromAccount] = useState<string | null>(null);
  const [toAccount, setToAccount] = useState<string | null>(null);
  const [transferAmount, setTransferAmount] = useState('');
  
  const handleBack = () => {
    if (toAccount) {
      setToAccount(null);
      setTransferAmount('');
    } else if (fromAccount) {
      setFromAccount(null);
      dispatch({ type: 'SELECT_ACCOUNT', payload: null });
    } else {
      dispatch({ type: 'SET_SCREEN', payload: 'home' });
    }
  };
  
  const handleFromAccountSelect = (accountId: string) => {
    setFromAccount(accountId);
    const account = state.accounts.find(acc => acc.id === accountId);
    if (account) {
      dispatch({ type: 'SELECT_ACCOUNT', payload: account });
    }
  };
  
  const handleToAccountSelect = (accountId: string) => {
    setToAccount(accountId);
  };
  
  const handleNumberClick = (num: number) => {
    if (transferAmount.length < 6) {
      setTransferAmount(prev => {
        // Don't allow more than 2 decimal places
        if (prev.includes('.') && prev.split('.')[1].length >= 2) {
          return prev;
        }
        return prev + num;
      });
    }
  };
  
  const handleClearClick = () => {
    setTransferAmount('');
  };
  
  const handleEnterClick = () => {
    if (!fromAccount || !toAccount || !transferAmount) return;
    
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a valid amount' });
      return;
    }
    
    const from = state.accounts.find(acc => acc.id === fromAccount);
    const to = state.accounts.find(acc => acc.id === toAccount);
    if (from && to) {
      if (from.balance < amount) {
        dispatch({ type: 'SET_ERROR', payload: 'Insufficient funds for transfer' });
        return;
      }
      
      dispatch({ 
        type: 'TRANSFER', 
        payload: { 
          fromAccount: from, 
          toAccount: to, 
          amount 
        } 
      });
    }
  };
  
  const handleCancelClick = () => {
    setTransferAmount('');
  };
  
  return (
    <AtmScreen title="Transfer Funds">
      <div className="flex flex-col h-full">
        {!fromAccount ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Source Account
              </h2>
              <p className="text-gray-600 mt-1">
                Choose an account to transfer from
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {state.accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onClick={() => handleFromAccountSelect(account.id)}
                />
              ))}
            </div>
          </>
        ) : !toAccount ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Destination Account
              </h2>
              <p className="text-gray-600 mt-1">
                Choose an account to transfer to
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {state.accounts
                .filter(acc => acc.id !== fromAccount)
                .map((account) => (
                  <AccountCard
                    key={account.id}
                    account={account}
                    onClick={() => handleToAccountSelect(account.id)}
                  />
                ))}
            </div>
            
            <div className="mt-4">
              <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-sm text-blue-800 font-medium">From:</p>
                <AccountCard
                  account={state.accounts.find(acc => acc.id === fromAccount)!}
                  selected
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Enter Transfer Amount
              </h2>
              <p className="text-gray-600 mt-1">
                Enter the amount you wish to transfer
              </p>
            </div>
            
            {state.error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                {state.error}
              </div>
            )}
            
            <div className="flex items-center justify-center mb-6">
              <div className="text-4xl font-bold text-blue-900 flex items-center">
                <span className="text-2xl mr-1">$</span>
                {transferAmount || '0'}
              </div>
            </div>
            
            <NumericKeypad
              onNumberClick={handleNumberClick}
              onClearClick={handleClearClick}
              onEnterClick={handleEnterClick}
              onCancelClick={handleCancelClick}
              inputValue={transferAmount}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="p-2 border border-blue-200 rounded-lg bg-blue-50">
                <p className="text-xs text-blue-800 font-medium">From:</p>
                <AccountCard
                  account={state.accounts.find(acc => acc.id === fromAccount)!}
                  selected
                />
              </div>
              
              <div className="p-2 border border-green-200 rounded-lg bg-green-50">
                <p className="text-xs text-green-800 font-medium">To:</p>
                <AccountCard
                  account={state.accounts.find(acc => acc.id === toAccount)!}
                  selected
                />
              </div>
            </div>
          </>
        )}
        
        <div className="flex justify-between mt-auto pt-4">
          <ActionButton
            onClick={handleBack}
            variant="secondary"
            icon={<ArrowLeft size={18} />}
          >
            Back
          </ActionButton>
          
          {fromAccount && toAccount && transferAmount && (
            <ActionButton
              onClick={handleEnterClick}
              variant="primary"
              icon={<ArrowRight size={18} />}
            >
              Confirm Transfer
            </ActionButton>
          )}
        </div>
      </div>
    </AtmScreen>
  );
};

export default TransferScreen;