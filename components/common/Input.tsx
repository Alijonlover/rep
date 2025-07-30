import * as React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({ icon, ...props }) => {
  return (
    <div className="relative">
      {icon && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        className={`w-full bg-transparent border-0 border-b-2 border-gray-600 text-gray-100 placeholder-gray-400 py-3 pr-3 transition-colors duration-300 focus:outline-none focus:ring-0 focus:border-teal-400 ${icon ? 'pl-10' : 'pl-4'}`}
        {...props}
      />
    </div>
  );
};

export default Input;