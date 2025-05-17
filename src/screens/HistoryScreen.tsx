import React, { useState } from 'react';
import AtmScreen from '../components/AtmScreen';
import AccountCard from '../components/AccountCard';
import TransactionList from '../components/TransactionList';
import ActionButton from '../components/ActionButton';
import { useAtm } from '../contexts/AtmContext';
import { ArrowLeft, Filter } from 'lucide-react';

const HistoryScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
  
  const handleBack = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'home' });
  };
  
  const handleAccountSelect = (accountId: string) => {
    setSelectedAccount(accountId === selectedAccount ? null : accountId);
  };
  
  return (
    <AtmScreen title="Transaction History">
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Transactions
            </h2>
            
            <div className="flex items-center text-blue-800 gap-1">
              <Filter size={16} />
              <span className="text-sm font-medium">
                {selectedAccount ? 'Filtered by account' : 'All accounts'}
              </span>
            </div>
          </div>
          
          {selectedAccount && (
            <div className="mt-3">
              <AccountCard
                account={state.accounts.find(acc => acc.id === selectedAccount)!}
                selected
              />
            </div>
          )}
        </div>
        
        <div className="flex-grow overflow-hidden">
          <TransactionList 
            transactions={state.transactions} 
            accountId={selectedAccount || undefined}
          />
        </div>
        
        <div className="mt-6 border-t border-gray-200 pt-4">
          <div className="text-sm text-gray-700 mb-3">Filter by account:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {state.accounts.map((account) => (
              <div
                key={account.id}
                onClick={() => handleAccountSelect(account.id)}
                className={`p-2 rounded border cursor-pointer text-sm ${
                  selectedAccount === account.id
                    ? 'bg-blue-100 border-blue-400 text-blue-800'
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                }`}
              >
                <div className="font-medium">{account.type}</div>
                <div className="text-xs text-gray-600">{account.number}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-start mt-4">
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

export default HistoryScreen;