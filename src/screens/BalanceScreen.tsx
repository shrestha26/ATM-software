import React from 'react';
import AtmScreen from '../components/AtmScreen';
import AccountCard from '../components/AccountCard';
import ActionButton from '../components/ActionButton';
import { useAtm } from '../contexts/AtmContext';
import { ArrowLeft } from 'lucide-react';

const BalanceScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  
  const handleBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'home' });
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(amount);
  };
  
  const totalBalance = state.accounts.reduce((total, account) => total + account.balance, 0);
  
  return (
    <AtmScreen title="Account Balances">
      <div className="flex flex-col h-full">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Your Account Summary
          </h2>
          <p className="text-gray-600 mt-1">
            Here are your current account balances
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
          <span className="font-medium text-gray-700">Total Balance:</span>
          <span className="text-xl font-bold text-blue-900">{formatCurrency(totalBalance)}</span>
        </div>
        
        <div className="space-y-4 mb-8">
          {state.accounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
            />
          ))}
        </div>
        
        <div className="flex justify-between mt-auto pt-4">
          <ActionButton
            onClick={handleBack}
            variant="secondary"
            icon={<ArrowLeft size={18} />}
          >
            Back to Main Menu
          </ActionButton>
          
          <ActionButton
            onClick={() => dispatch({ type: 'SET_SCREEN', payload: 'history' })}
            variant="primary"
          >
            View Transactions
          </ActionButton>
        </div>
      </div>
    </AtmScreen>
  );
};

export default BalanceScreen;