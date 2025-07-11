import React from 'react';
import { Account } from '../types/types';

interface AccountCardProps {
  account: Account;
  onClick?: () => void;
  selected?: boolean;
}
// This is some comment
const AccountCard: React.FC<AccountCardProps> = ({ account, onClick, selected = false }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(amount);
  };
  
  const getCardStyle = () => {
    const baseClasses = "p-4 rounded-lg shadow-sm transition-all duration-200";
    
    if (account.type === 'checking') {
      return `${baseClasses} ${selected 
        ? 'bg-blue-100 border-2 border-blue-500 shadow-md' 
        : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'}`;
    } else if (account.type === 'savings') {
      return `${baseClasses} ${selected 
        ? 'bg-green-100 border-2 border-green-500 shadow-md' 
        : 'bg-green-50 border border-green-200 hover:bg-green-100'}`;
    } else {
      return `${baseClasses} ${selected 
        ? 'bg-purple-100 border-2 border-purple-500 shadow-md' 
        : 'bg-purple-50 border border-purple-200 hover:bg-purple-100'}`;
    }
  };
  
  return (
    <div 
      className={`${getCardStyle()} cursor-pointer transform ${selected ? 'scale-105' : 'hover:scale-102'}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600 font-medium uppercase tracking-wide">
            {account.type}
          </div>
          <div className="text-gray-800 font-medium mt-1">
            Account {account.number}
          </div>
        </div>
        <div className={`text-xl font-semibold ${account.balance < 0 ? 'text-red-600' : 'text-gray-800'}`}>
          {formatCurrency(account.balance)}
        </div>
      </div>
      
      {selected && (
        <div className="mt-3 text-sm text-blue-800 font-medium">
          ✓ Selected
        </div>
      )}
    </div>
  );
};

export default AccountCard;
