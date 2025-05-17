import React from 'react';
import { useAtm, AtmProvider } from './contexts/AtmContext';
import WelcomeScreen from './screens/WelcomeScreen';
import PinScreen from './screens/PinScreen';
import HomeScreen from './screens/HomeScreen';
import BalanceScreen from './screens/BalanceScreen';
import WithdrawScreen from './screens/WithdrawScreen';
import DepositScreen from './screens/DepositScreen';
import TransferScreen from './screens/TransferScreen';
import HistoryScreen from './screens/HistoryScreen';
import ReceiptScreen from './screens/ReceiptScreen';
import ErrorScreen from './screens/ErrorScreen';
import './index.css';

// Add missing styles for animations
const GlobalStyles: React.FC = () => (
  <style>{`
    @keyframes card-insert {
      0% { transform: translateX(-50%) translateY(-40%); }
      100% { transform: translateX(-50%) translateY(100%); }
    }
    
    .animate-card-insert {
      animation: card-insert 1s forwards;
    }
    
    .scale-102 {
      transform: scale(1.02);
    }
    
    .scale-98 {
      transform: scale(0.98);
    }
  `}</style>
);

const ATM: React.FC = () => {
  const { state } = useAtm();
  
  // Function to render the appropriate screen based on current state
  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'pin':
        return <PinScreen />;
      case 'home':
        return <HomeScreen />;
      case 'balance':
        return <BalanceScreen />;
      case 'withdraw':
        return <WithdrawScreen />;
      case 'deposit':
        return <DepositScreen />;
      case 'transfer':
        return <TransferScreen />;
      case 'history':
        return <HistoryScreen />;
      case 'receipt':
        return <ReceiptScreen />;
      case 'error':
        return <ErrorScreen />;
      default:
        return <ErrorScreen />;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 p-4 md:p-8">
      <GlobalStyles />
      
      <div className="max-w-4xl mx-auto">
        {/* ATM Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">SecureBank ATM</h1>
          <p className="text-gray-300 mt-1">Safe, Secure, Simple</p>
        </div>
        
        {/* ATM Cabinet */}
        <div className="bg-gray-200 rounded-xl p-3 shadow-2xl">
          {/* ATM Screen */}
          <div className="h-[600px] max-h-[80vh] bg-gray-100 p-2 rounded-lg">
            {renderScreen()}
          </div>
          
          {/* ATM Keypad/Controls Area */}
          <div className="mt-4 bg-gray-300 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-600">
                Card reader status: {state.authenticated ? 'Card inserted' : 'Ready'}
              </div>
              
              <div className="text-xs text-gray-600">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        
        {/* Development note */}
        <div className="text-center mt-6 text-gray-400 text-sm">
          <p>Demo ATM Machine · For demonstration only</p>
          <p className="mt-1">PIN for demo: 1234</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AtmProvider>
      <ATM />
    </AtmProvider>
  );
}

export default App;