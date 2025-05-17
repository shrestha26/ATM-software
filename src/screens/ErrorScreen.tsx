import React from 'react';
import AtmScreen from '../components/AtmScreen';
import ActionButton from '../components/ActionButton';
import { useAtm } from '../contexts/AtmContext';
import { AlertOctagon, ArrowLeft } from 'lucide-react';

const ErrorScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  
  const handleBack = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_SCREEN', payload: 'home' });
  };
  
  return (
    <AtmScreen title="Error">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center max-w-md mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 text-red-600 p-4 rounded-full">
              <AlertOctagon size={40} />
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-red-700 mb-4">
            Transaction Error
          </h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">
              {state.error || 'An unexpected error occurred. Please try again later.'}
            </p>
          </div>
          
          <p className="text-gray-600 mb-8">
            For assistance, please contact customer service at 1-800-BANK-HELP.
          </p>
          
          <ActionButton
            onClick={handleBack}
            variant="primary"
            icon={<ArrowLeft size={18} />}
          >
            Return to Main Menu
          </ActionButton>
        </div>
      </div>
    </AtmScreen>
  );
};

export default ErrorScreen;