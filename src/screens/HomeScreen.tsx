import React from 'react';
import AtmScreen from '../components/AtmScreen';
import ActionButton from '../components/ActionButton';
import { useAtm } from '../contexts/AtmContext';
import { Wallet, ArrowDownToLine, ArrowUpFromLine, Banknote, Rewind as ClockRewind, LogOut } from 'lucide-react';

const HomeScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  
  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  
  const handleOptionSelect = (screen: 'balance' | 'withdraw' | 'deposit' | 'transfer' | 'history') => {
    dispatch({ type: 'SET_SCREEN', payload: screen });
  };
  
  return (
    <AtmScreen 
      title="Main Menu"
      footer={
        <div className="flex justify-between items-center text-sm">
          <div>
            <span className="text-gray-600">Welcome, </span>
            <span className="font-medium">{state.currentUser?.name}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="text-red-600 flex items-center gap-1 hover:text-red-700"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      }
    >
      <div className="flex flex-col h-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Hello, {state.currentUser?.name}
          </h2>
          <p className="text-gray-600">
            Please select a transaction
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
          <ActionButton 
            onClick={() => handleOptionSelect('balance')}
            fullWidth
            icon={<Wallet size={20} />}
          >
            Check Balance
          </ActionButton>
          
          <ActionButton 
            onClick={() => handleOptionSelect('withdraw')}
            variant="success"
            fullWidth
            icon={<ArrowUpFromLine size={20} />}
          >
            Withdraw Cash
          </ActionButton>
          
          <ActionButton 
            onClick={() => handleOptionSelect('deposit')}
            variant="primary"
            fullWidth
            icon={<ArrowDownToLine size={20} />}
          >
            Deposit Funds
          </ActionButton>
          
          <ActionButton 
            onClick={() => handleOptionSelect('transfer')}
            variant="secondary"
            fullWidth
            icon={<Banknote size={20} />}
          >
            Transfer Funds
          </ActionButton>
          
          <ActionButton 
            onClick={() => handleOptionSelect('history')}
            variant="secondary"
            fullWidth
            icon={<ClockRewind size={20} />}
          >
            Transaction History
          </ActionButton>
          
          <ActionButton 
            onClick={handleLogout}
            variant="danger"
            fullWidth
            icon={<LogOut size={20} />}
          >
            End Session
          </ActionButton>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Your session will automatically timeout after 3 minutes of inactivity
          </p>
        </div>
      </div>
    </AtmScreen>
  );
};

export default HomeScreen;