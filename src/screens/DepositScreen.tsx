import React, { useState } from 'react';
import AtmScreen from '../components/AtmScreen';
import AccountCard from '../components/AccountCard';
import NumericKeypad from '../components/NumericKeypad';
import ActionButton from '../components/ActionButton';
import { useAtm } from '../contexts/AtmContext';
import { ArrowLeft, Upload, BanknoteIcon, FileCheck } from 'lucide-react';

const DepositScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  const [depositType, setDepositType] = useState<'cash' | 'check' | null>(null);
  const [depositAmount, setDepositAmount] = useState('');
  
  const handleBack = () => {
    if (depositType) {
      setDepositType(null);
      setDepositAmount('');
    } else if (selectedAccount) {
      setSelectedAccount(null);
      dispatch({ type: 'SELECT_ACCOUNT', payload: null });
    } else {
      dispatch({ type: 'SET_SCREEN', payload: 'home' });
    }
  };
  
  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId);
    const account = state.accounts.find(acc => acc.id === accountId);
    if (account) {
      dispatch({ type: 'SELECT_ACCOUNT', payload: account });
    }
  };
  
  const handleDepositTypeSelect = (type: 'cash' | 'check') => {
    setDepositType(type);
  };
  
  const handleNumberClick = (num: number) => {
    if (depositAmount.length < 6) {
      setDepositAmount(prev => {
        // Don't allow more than 2 decimal places
        if (prev.includes('.') && prev.split('.')[1].length >= 2) {
          return prev;
        }
        return prev + num;
      });
    }
  };
  
  const handleClearClick = () => {
    setDepositAmount('');
  };
  
  const handleEnterClick = () => {
    if (!selectedAccount || !depositType || !depositAmount) return;
    
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a valid amount' });
      return;
    }
    
    const account = state.accounts.find(acc => acc.id === selectedAccount);
    if (account) {
      dispatch({ type: 'DEPOSIT', payload: amount });
    }
  };
  
  const handleCancelClick = () => {
    setDepositType(null);
    setDepositAmount('');
  };
  
  return (
    <AtmScreen title="Deposit Funds">
      <div className="flex flex-col h-full">
        {!selectedAccount ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Select an Account
              </h2>
              <p className="text-gray-600 mt-1">
                Choose an account to deposit to
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
        ) : !depositType ? (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Select Deposit Type
              </h2>
              <p className="text-gray-600 mt-1">
                What would you like to deposit?
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-8">
              <ActionButton
                onClick={() => handleDepositTypeSelect('cash')}
                variant="success"
                fullWidth
                icon={<BanknoteIcon size={20} />}
              >
                Cash Deposit
              </ActionButton>
              
              <ActionButton
                onClick={() => handleDepositTypeSelect('check')}
                variant="primary"
                fullWidth
                icon={<FileCheck size={20} />}
              >
                Check Deposit
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
                {depositType === 'cash' ? 'Cash Deposit' : 'Check Deposit'}
              </h2>
              <p className="text-gray-600 mt-1">
                Enter the amount to deposit
              </p>
            </div>
            
            {state.error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                {state.error}
              </div>
            )}
            
            <div className="flex items-center justify-center mb-6">
              <div className="text-4xl font-bold text-green-600 flex items-center">
                <span className="text-2xl mr-1">$</span>
                {depositAmount || '0'}
              </div>
            </div>
            
            <div className="flex justify-center mb-4">
              <div className="bg-green-100 text-green-700 p-3 rounded-lg flex items-center">
                <Upload size={20} className="mr-2" />
                <span>
                  {depositType === 'cash' 
                    ? 'Insert cash when prompted after entering amount' 
                    : 'Insert check when prompted after entering amount'}
                </span>
              </div>
            </div>
            
            <NumericKeypad
              onNumberClick={handleNumberClick}
              onClearClick={handleClearClick}
              onEnterClick={handleEnterClick}
              onCancelClick={handleCancelClick}
              inputValue={depositAmount}
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
            Back
          </ActionButton>
        </div>
      </div>
    </AtmScreen>
  );
};

export default DepositScreen;