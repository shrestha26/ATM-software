import { User, Account, Transaction } from '../types/types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'Shrestha Behera',
    pin: '1234',
  },
  {
    id: 'user2',
    name: 'Jane Smith',
    pin: '5678',
  },
];

export const accounts: Account[] = [
  {
    id: 'acc1',
    userId: 'user1',
    type: 'checking',
    number: '****1234',
    balance: 5280.42,
  },
  {
    id: 'acc2',
    userId: 'user1',
    type: 'savings',
    number: '****5678',
    balance: 12750.89,
  },
  {
    id: 'acc3',
    userId: 'user1',
    type: 'credit',
    number: '****9012',
    balance: -450.30,
  },
  {
    id: 'acc4',
    userId: 'user2',
    type: 'checking',
    number: '****3456',
    balance: 3500.00,
  },
  {
    id: 'acc5',
    userId: 'user2',
    type: 'savings',
    number: '****7890',
    balance: 8900.25,
  },
];

export const transactions: Transaction[] = [
  {
    id: 'tx1',
    accountId: 'acc1',
    type: 'withdrawal',
    amount: 200,
    description: 'ATM Withdrawal',
    date: '2025-05-01T10:30:00',
  },
  {
    id: 'tx2',
    accountId: 'acc1',
    type: 'deposit',
    amount: 500,
    description: 'Direct Deposit - Payroll',
    date: '2025-04-28T09:15:00',
  },
  {
    id: 'tx3',
    accountId: 'acc1',
    type: 'withdrawal',
    amount: 65.99,
    description: 'Purchase - Grocery Store',
    date: '2025-04-25T14:22:00',
  },
  {
    id: 'tx4',
    accountId: 'acc2',
    type: 'deposit',
    amount: 1000,
    description: 'Savings Deposit',
    date: '2025-04-20T16:45:00',
  },
  {
    id: 'tx5',
    accountId: 'acc2',
    type: 'withdrawal',
    amount: 50,
    description: 'Transfer to Checking',
    date: '2025-04-15T11:30:00',
  },
  {
    id: 'tx6',
    accountId: 'acc1',
    type: 'deposit',
    amount: 50,
    description: 'Transfer from Savings',
    date: '2025-04-15T11:30:00',
  },
];

// Generate more transactions for history
export const generateRandomTransactions = (accountId: string, count: number): Transaction[] => {
  const types: ('withdrawal' | 'deposit' | 'transfer')[] = ['withdrawal', 'deposit', 'transfer'];
  const descriptions = [
    'Grocery Store',
    'Gas Station',
    'Restaurant',
    'Online Purchase',
    'Utility Bill',
    'Subscription',
    'ATM Withdrawal',
    'Direct Deposit',
    'Transfer',
    'Refund'
  ];
  
  const randomTransactions: Transaction[] = [];
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)];
    const description = descriptions[Math.floor(Math.random() * descriptions.length)];
    const amount = parseFloat((Math.random() * 200 + 5).toFixed(2));
    
    // Create a random date within the last 30 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 30));
    
    randomTransactions.push({
      id: `tx-random-${accountId}-${i}`,
      accountId,
      type,
      amount,
      description: `${type === 'deposit' ? 'Deposit - ' : type === 'withdrawal' ? 'Payment - ' : 'Transfer - '}${description}`,
      date: date.toISOString(),
    });
  }
  
  return randomTransactions;
};