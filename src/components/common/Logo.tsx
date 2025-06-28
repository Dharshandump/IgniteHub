import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  showText?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Logo: React.FC<LogoProps> = ({ showText = true, size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-9 h-9',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-4xl'
  };

  return (
    <Link to="/" className="flex items-center space-x-3">
      {/* Logo icon */}
      <div
        className={`
          ${sizeClasses[size]} 
          rounded-full bg-gradient-to-tr from-purple-600 via-pink-500 to-pink-400
          flex items-center justify-center shadow-md
        `}
      >
        <span className="text-white font-bold text-xl">🚀</span>
      </div>

      {/* Logo text */}
      {showText && (
        <span
          className={`
            ${textSizeClasses[size]} 
            font-extrabold tracking-tight 
            bg-gradient-to-r from-purple-700 to-pink-600 
            bg-clip-text text-transparent
          `}
        >
          IgniteHub
        </span>
      )}
    </Link>
  );
};

export default Logo;
