import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationLinkProps {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
  isMobile?: boolean;
  onClick?: () => void;
}
// ==========================
// 🚀 NavigationLink Component Bro
// ==========================

const NavigationLink: React.FC<NavigationLinkProps> = ({ 
  to, 
  children, 
  isActive, 
  isMobile = false,
  onClick 
}) => {

  const baseClasses = "font-medium transition-colors duration-200 hover:text-purple-600";

  const desktopClasses = isActive 
    ? "text-purple-600 border-b-2 border-purple-600 pb-1" 
    : "text-gray-700";

  const mobileClasses = isActive
    ? "text-purple-600 bg-purple-50"
    : "text-gray-700 hover:text-purple-600 hover:bg-gray-50";

  const classes = isMobile 
    ? `${baseClasses} py-2 px-4 rounded-lg ${mobileClasses}`
    : `${baseClasses} ${desktopClasses}`;

  return (
    <Link to={to} onClick={onClick} className={classes}>
      {children}
    </Link>
  );
};

export default NavigationLink;
