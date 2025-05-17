import React from 'react';
import AtmScreen from '../components/AtmScreen';
import { useAtm } from '../contexts/AtmContext';
import CardSlot from '../components/CardSlot';
import { CreditCard } from 'lucide-react';

const WelcomeScreen: React.FC = () => {
  const { dispatch } = useAtm();
  
  const handleCardInserted = () => {
    // Move to PIN screen after card is inserted
    setTimeout(() => {
      dispatch({ type: 'SET_SCREEN', payload: 'pin' });
    }, 1000);
  };

  return (
    <AtmScreen>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-800 text-white p-4 rounded-full">
              <CreditCard size={40} />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-blue-900 mb-4">Welcome to SecureBank ATM</h1>
          
          <p className="text-gray-600 mb-8">
            Please insert your card to begin. Your security is our priority.
          </p>
          
          <div className="border-t border-b border-gray-200 py-6 my-6">
            <CardSlot onCardInserted={handleCardInserted} />
          </div>
          
          <div className="text-sm text-gray-500 mt-8">
            <p>For assistance, please call 1-800-BANK-HELP</p>
            <p className="mt-2">Available 24/7</p>
          </div>
        </div>
      </div>
    </AtmScreen>
  );
};

export default WelcomeScreen;