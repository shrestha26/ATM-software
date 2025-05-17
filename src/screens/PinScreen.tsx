import React, { useState } from 'react';
import AtmScreen from '../components/AtmScreen';
import NumericKeypad from '../components/NumericKeypad';
import { useAtm } from '../contexts/AtmContext';
import { Lock } from 'lucide-react';

const PinScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleNumberClick = (num: number) => {
    if (pin.length < 4) {
      setPin(prev => prev + num);
    }
  };
  
  const handleClearClick = () => {
    setPin('');
  };
  
  const handleEnterClick = () => {
    if (pin.length < 4) {
      setErrorMessage('Please enter a 4-digit PIN');
      return;
    }
    
    dispatch({ type: 'AUTHENTICATE', payload: { pin } });
    
    // Check if authentication failed
    setTimeout(() => {
      if (state.error) {
        setAttempts(prev => prev + 1);
        setPin('');
        
        if (attempts >= 2) {
          // After 3 failed attempts, go back to welcome screen
          setTimeout(() => {
            dispatch({ type: 'LOGOUT' });
          }, 3000);
        }
      }
    }, 100);
  };
  
  const handleCancelClick = () => {
    dispatch({ type: 'LOGOUT' });
  };
  
  return (
    <AtmScreen title="Enter Your PIN">
      <div className="flex flex-col items-center justify-center h-full">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-800 text-white p-3 rounded-full">
              <Lock size={30} />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Secure Authentication</h2>
          <p className="text-gray-600">Please enter your 4-digit PIN</p>
          
          {state.error && (
            <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-lg">
              {state.error}
              {attempts >= 2 && (
                <div className="mt-2 font-medium">
                  Too many failed attempts. Card will be ejected.
                </div>
              )}
            </div>
          )}
          
          {errorMessage && !state.error && (
            <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
              {errorMessage}
            </div>
          )}
        </div>
        
        <NumericKeypad
          onNumberClick={handleNumberClick}
          onClearClick={handleClearClick}
          onEnterClick={handleEnterClick}
          onCancelClick={handleCancelClick}
          hideInput={true}
          inputValue={pin}
        />
        
        <p className="mt-6 text-sm text-gray-500">
          For demo, use PIN: 1234
        </p>
      </div>
    </AtmScreen>
  );
};

export default PinScreen;