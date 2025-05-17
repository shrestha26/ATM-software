import React, { useState } from 'react';

interface CardSlotProps {
  onCardInserted: () => void;
}

const CardSlot: React.FC<CardSlotProps> = ({ onCardInserted }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [isCardInserted, setIsCardInserted] = useState(false);
  
  const handleCardInsert = () => {
    if (isCardInserted) return;
    
    setIsCardInserted(true);
    
    // Simulate card processing
    setTimeout(() => {
      onCardInserted();
    }, 1500);
  };
  
  return (
    <div className="flex flex-col items-center mt-6">
      {/* Card slot */}
      <div 
        className="w-64 h-16 bg-gray-800 rounded-lg relative overflow-hidden border-2 border-gray-700"
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
        onClick={handleCardInsert}
      >
        {/* Slot opening */}
        <div className="absolute left-0 right-0 top-0 h-2 bg-black"></div>
        
        {/* Card reader light */}
        <div className={`absolute top-4 right-4 w-2 h-2 rounded-full ${
          isCardInserted ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}></div>
        
        {/* Card being inserted */}
        {isCardHovered && !isCardInserted && (
          <div 
            className="absolute left-1/2 top-0 w-48 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md transform -translate-x-1/2 -translate-y-1/2 hover:translate-y-0 transition-transform duration-300 cursor-pointer"
            style={{ marginTop: '30px' }}
          >
            <div className="w-full h-2 bg-yellow-400 absolute top-1"></div>
          </div>
        )}
        
        {/* Card inserted */}
        {isCardInserted && (
          <div 
            className="absolute left-1/2 top-0 w-48 h-9 bg-gradient-to-br from-blue-600 to-blue-800 rounded-md transform -translate-x-1/2 transition-transform duration-700 animate-card-insert"
            style={{ marginTop: '30px' }}
          >
            <div className="w-full h-2 bg-yellow-400 absolute top-1"></div>
          </div>
        )}
      </div>
      
      <p className="mt-3 text-gray-600 text-sm">
        {isCardInserted 
          ? "Reading card..." 
          : "Please insert your card"}
      </p>
    </div>
  );
};

export default CardSlot;