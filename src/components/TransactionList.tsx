import React, { useState } from 'react';
import { Transaction } from '../types/types';

interface TransactionListProps {
  transactions: Transaction[];
  accountId?: string;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, accountId }) => {
  const [filter, setFilter] = useState<'all' | 'withdrawal' | 'deposit' | 'transfer'>('all');
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    }).format(amount);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const filteredTransactions = transactions
    .filter(tx => accountId ? tx.accountId === accountId : true)
    .filter(tx => filter === 'all' ? true : tx.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="w-full">
      {/* Filter buttons */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'all' 
              ? 'bg-blue-800 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('deposit')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'deposit' 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Deposits
        </button>
        <button
          onClick={() => setFilter('withdrawal')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'withdrawal' 
              ? 'bg-red-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Withdrawals
        </button>
        <button
          onClick={() => setFilter('transfer')}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            filter === 'transfer' 
              ? 'bg-purple-600 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Transfers
        </button>
      </div>
      
      {/* Transactions list */}
      <div className="overflow-y-auto max-h-96 rounded-lg border border-gray-200">
        {filteredTransactions.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No transactions found
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <li key={transaction.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                  </div>
                  <div className={`font-medium ${getAmountColor(transaction)}`}>
                    {getAmountPrefix(transaction)}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// Helper functions for transaction formatting
const getAmountColor = (transaction: Transaction): string => {
  switch (transaction.type) {
    case 'deposit':
      return 'text-green-600';
    case 'withdrawal':
      return 'text-red-600';
    case 'transfer':
      return 'text-purple-600';
    default:
      return 'text-gray-800';
  }
};

const getAmountPrefix = (transaction: Transaction): string => {
  switch (transaction.type) {
    case 'deposit':
      return '+';
    case 'withdrawal':
      return '-';
    case 'transfer':
      return '';
    default:
      return '';
  }
};

export default TransactionList;