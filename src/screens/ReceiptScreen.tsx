import React from 'react';
import AtmScreen from '../components/AtmScreen';
import ActionButton from '../components/ActionButton';
import { useAtm } from '../contexts/AtmContext';
import { ArrowLeft, Printer, FileText } from 'lucide-react';

const ReceiptScreen: React.FC = () => {
  const { state, dispatch } = useAtm();
  
  const handleBack = () => {
    dispatch({ type: 'CLEAR_TRANSACTION' });
    dispatch({ type: 'SET_SCREEN', payload: 'home' });
  };
  
  const handlePrintReceipt = () => {
    // In a real app, this would trigger printing
    alert('Printing receipt...');
  };
  
  const handleDeclineReceipt = () => {
    dispatch({ type: 'CLEAR_TRANSACTION' });
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
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).format(date);
  };
  
  if (!state.receiptData) {
    return (
      <AtmScreen title="Transaction Complete">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Transaction Processed
            </h2>
            <p className="text-gray-600">
              Your transaction has been completed successfully.
            </p>
            
            <div className="mt-8">
              <ActionButton
                onClick={handleBack}
                variant="primary"
              >
                Return to Main Menu
              </ActionButton>
            </div>
          </div>
        </div>
      </AtmScreen>
    );
  }
  
  const receipt = state.receiptData;
  const account = state.accounts.find(acc => acc.id === receipt.accountId);
  
  return (
    <AtmScreen title="Transaction Receipt">
      <div className="flex flex-col h-full">
        <div className="bg-white border border-gray-200 rounded-lg p-6 mx-auto w-full max-w-md shadow-sm">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-blue-900">SecureBank ATM</h2>
            <p className="text-sm text-gray-600">Transaction Receipt</p>
          </div>
          
          <div className="border-t border-b border-gray-200 py-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-gray-600">Transaction Type:</div>
              <div className="font-medium text-right capitalize">{receipt.type}</div>
              
              <div className="text-gray-600">Date & Time:</div>
              <div className="font-medium text-right">{formatDate(receipt.date)}</div>
              
              <div className="text-gray-600">Account:</div>
              <div className="font-medium text-right">
                {account?.type} {account?.number}
              </div>
              
              {receipt.reference && (
                <>
                  <div className="text-gray-600">Reference:</div>
                  <div className="font-medium text-right">{receipt.reference}</div>
                </>
              )}
              
              <div className="text-gray-600">Amount:</div>
              <div className="font-medium text-right text-lg">
                {formatCurrency(receipt.amount)}
              </div>
              
              <div className="text-gray-600">New Balance:</div>
              <div className="font-medium text-right text-lg">
                {formatCurrency(account?.balance || 0)}
              </div>
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-500">
            <p>Thank you for using SecureBank ATM</p>
            <p className="mt-1">Transaction ID: {receipt.id}</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-8">
          <ActionButton
            onClick={handlePrintReceipt}
            variant="primary"
            icon={<Printer size={18} />}
          >
            Print Receipt
          </ActionButton>
          
          <ActionButton
            onClick={handleDeclineReceipt}
            variant="secondary"
            icon={<FileText size={18} />}
          >
            No Receipt
          </ActionButton>
        </div>
        
        <div className="flex justify-start mt-auto pt-4">
          <ActionButton
            onClick={handleBack}
            variant="secondary"
            icon={<ArrowLeft size={18} />}
          >
            Return to Main Menu
          </ActionButton>
        </div>
      </div>
    </AtmScreen>
  );
};

export default ReceiptScreen;