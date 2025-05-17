import React, { useState } from 'react';
import AtmScreen from '../components/AtmScreen';
import AccountCard from '../components/AccountCard';
import NumericKeypad from '../components/NumericKeypad';
import ActionButton from '../components/ActionButton';
import { useAtm } from '../contexts/AtmContext';
import { ArrowLeft, DollarSign } from 'lucide-react';

const WithdrawScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [customAmount, setCustomAmount] = useState(false);
  
  const handleBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'home' });
  };
  
  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    const account = state.accounts.find(acc => acc.id === accountId);
    if (account) {
      dispatch({ type: 'SELECT_ACCOUNT', payload: account });
    }
  };
  
  const handleQuickWithdraw = (amount: number) => {
    if (!selectedAccount) return;
    
    const account = state.accounts.find(acc => acc.id === selectedAccount);
    if (account) {
      if (account.balance < amount) {
        dispatch({ type: 'SET_ERROR', payload: 'Insufficient funds for withdrawal' });
        return;
      }
      
      dispatch({ type: 'WITHDRAW', payload: amount });
    }
  };
  
  const handleNumberClick = (num: number) => {
    if (withdrawAmount.length < 6) {
      setWithdrawAmount(prev => {
        // Don't allow more than 2 decimal places
        if (prev.includes('.') && prev.split('.')[1].length >= 2) {
          return prev;
        }
        return prev + num;
      });
    }
  };
  
  const handleClearClick = () => {
    setWithdrawAmount('');
  };
  
  const handleEnterClick = () => {
    if (!selectedAccount || !withdrawAmount) return;
    
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a valid amount' });
      return;
    }
    
    const account = state.accounts.find(acc => acc.id === selectedAccount);
    if (account) {
      if (account.balance < amount) {
        dispatch({ type: 'SET_ERROR', payload: 'Insufficient funds for withdrawal' });
        return;
      }
      
      dispatch({ type: 'WITHDRAW', payload: amount });
    }
  };
  
  const handleCancelClick = () => {
    if (customAmount) {
      setCustomAmount(false);
      setWithdrawAmount('');
    } else {
      setSelectedAccount(null);
      dispatch({ type: 'SELECT_ACCOUNT', payload: null });
    }
  };
  
  return (
    <AtmScreen title="Withdraw Cash">
      <div className="flex flex-col h-full">
        {!selectedAccount ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Select an Account
              </h2>
              <p className="text-gray-600 mt-1">
                Choose an account to withdraw from
              </p>
            </div>
            
            <div className="space-y-4 mb-8">
              {state.accounts.map((account) => (
                <AccountCard
                  key={account.id}
                  account={account}
                  onClick={() => handleAccountSelect(account.id)}
                />
              ))}
            </div>
          </>
        ) : !customAmount ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Withdrawal Amount
              </h2>
              <p className="text-gray-600 mt-1">
                Choose an amount to withdraw
              </p>
            </div>
            
            {state.error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                {state.error}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <ActionButton
                onClick={() => handleQuickWithdraw(20)}
                variant="primary"
                fullWidth
              >
                $20
              </ActionButton>
              
              <ActionButton
                onClick={() => handleQuickWithdraw(40)}
                variant="primary"
                fullWidth
              >
                $40
              </ActionButton>
              
              <ActionButton
                onClick={() => handleQuickWithdraw(60)}
                variant="primary"
                fullWidth
              >
                $60
              </ActionButton>
              
              <ActionButton
                onClick={() => handleQuickWithdraw(80)}
                variant="primary"
                fullWidth
              >
                $80
              </ActionButton>
              
              <ActionButton
                onClick={() => handleQuickWithdraw(100)}
                variant="primary"
                fullWidth
              >
                $100
              </ActionButton>
              
              <ActionButton
                onClick={() => handleQuickWithdraw(200)}
                variant="primary"
                fullWidth
              >
                $200
              </ActionButton>
              
              <ActionButton
                onClick={() => setCustomAmount(true)}
                variant="secondary"
                fullWidth
                icon={<DollarSign size={18} />}
              >
                Other Amount
              </ActionButton>
            </div>
            
            <div className="mt-4">
              <AccountCard
                account={state.accounts.find(acc => acc.id === selectedAccount)!}
                selected
              />
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Enter Withdrawal Amount
              </h2>
              <p className="text-gray-600 mt-1">
                Enter the amount you wish to withdraw
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
                {withdrawAmount || '0'}
              </div>
            </div>
            
            <NumericKeypad
              onNumberClick={handleNumberClick}
              onClearClick={handleClearClick}
              onEnterClick={handleEnterClick}
              onCancelClick={handleCancelClick}
              inputValue={withdrawAmount}
            />
            
            <div className="mt-4">
              <AccountCard
                account={state.accounts.find(acc => acc.id === selectedAccount)!}
                selected
              />
            </div>
          </>
        )}
        
        <div className="flex justify-start mt-auto pt-4">
          <ActionButton
            onClick={handleBack}
            variant="secondary"
            icon={<ArrowLeft size={18} />}
          >
            Back to Main Menu
          </ActionButton>
        </div>
      </div>
    </AtmScreen>
  );
};

export default WithdrawScreen;