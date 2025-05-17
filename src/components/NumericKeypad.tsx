import React from 'react';

interface NumericKeypadProps {
  onNumberClick: (num: number) => void;
  onClearClick: () => void;
  onEnterClick: () => void;
  onCancelClick: () => void;
  hideInput?: boolean;
  inputValue: string;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onNumberClick,
  onClearClick,
  onEnterClick,
  onCancelClick,
  hideInput = false,
  inputValue,
}) => {
  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Display */}
      <div className="bg-gray-100 p-4 rounded-lg text-center mb-4 h-14 flex items-center justify-center">
        <span className="text-2xl font-mono tracking-widest">
          {hideInput ? inputValue.replace(/./g, '*') : inputValue}
        </span>
      </div>
      
      {/* Keypad */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => onNumberClick(num)}
            className="bg-white border border-gray-300 hover:bg-gray-100 transition-colors 
                      text-xl font-semibold rounded-lg p-4 h-16 shadow-sm
                      active:scale-95 active:bg-gray-200 transform duration-100"
          >
            {num}
          </button>
        ))}
        
        {/* Bottom row */}
        <button
          onClick={onClearClick}
          className="bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold 
                    rounded-lg p-4 h-16 shadow-sm active:scale-95 transform duration-100"
        >
          CLEAR
        </button>
        
        <button
          onClick={() => onNumberClick(0)}
          className="bg-white border border-gray-300 hover:bg-gray-100 transition-colors
                    text-xl font-semibold rounded-lg p-4 h-16 shadow-sm
                    active:scale-95 active:bg-gray-200 transform duration-100"
        >
          0
        </button>
        
        <button
          onClick={onEnterClick}
          className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold 
                    rounded-lg p-4 h-16 shadow-sm active:scale-95 transform duration-100"
        >
          ENTER
        </button>

        {/* Cancel button at the bottom */}
        <button
          onClick={onCancelClick}
          className="col-span-3 bg-red-600 hover:bg-red-700 text-white text-lg font-semibold 
                    rounded-lg p-4 h-16 mt-2 shadow-sm active:scale-95 transform duration-100"
        >
          CANCEL
        </button>
      </div>
    </div>
  );
};

export default NumericKeypad;