
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'large';
  icon?: LucideIcon;
  className?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  onClick, 
  href,
  variant = 'primary',
  size = 'medium',
  icon: Icon,
  className = ''
}) => {
  const baseClasses = "inline-flex items-center font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
    secondary: "bg-white text-purple-600 hover:bg-gray-50"
  };
  
  const sizeClasses = {
    medium: "px-6 py-3",
    large: "px-8 py-4"
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {children}
      {Icon && <Icon className="ml-2" size={20} />}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
};

export default GradientButton;
