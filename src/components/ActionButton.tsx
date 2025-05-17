import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  icon
}) => {
  const getButtonStyle = () => {
    const baseClasses = "rounded-lg py-3 px-5 font-medium shadow-sm transition-all duration-200 flex items-center justify-center gap-2";
    const widthClasses = fullWidth ? "w-full" : "";
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "active:scale-98 transform";
    
    switch (variant) {
      case 'primary':
        return `${baseClasses} ${widthClasses} ${disabledClasses} bg-blue-800 hover:bg-blue-900 text-white`;
      case 'secondary':
        return `${baseClasses} ${widthClasses} ${disabledClasses} bg-gray-200 hover:bg-gray-300 text-gray-800`;
      case 'danger':
        return `${baseClasses} ${widthClasses} ${disabledClasses} bg-red-600 hover:bg-red-700 text-white`;
      case 'success':
        return `${baseClasses} ${widthClasses} ${disabledClasses} bg-emerald-600 hover:bg-emerald-700 text-white`;
      default:
        return `${baseClasses} ${widthClasses} ${disabledClasses} bg-blue-800 hover:bg-blue-900 text-white`;
    }
  };
  
  return (
    <button 
      className={getButtonStyle()} 
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
};

export default ActionButton;