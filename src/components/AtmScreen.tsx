import React from 'react';

interface AtmScreenProps {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
}

const AtmScreen: React.FC<AtmScreenProps> = ({ children, title, footer }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full border-4 border-gray-200">
      {/* Header */}
      {title && (
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-4">
          <h2 className="text-xl font-semibold text-center">{title}</h2>
        </div>
      )}
      
      {/* Content */}
      <div className="flex-grow flex flex-col p-6 overflow-auto">
        {children}
      </div>
      
      {/* Footer */}
      {footer && (
        <div className="bg-gray-100 p-3 border-t border-gray-200">
          {footer}
        </div>
      )}
    </div>
  );
};

export default AtmScreen;