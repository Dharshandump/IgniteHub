import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import Logo from './common/Logo';
import NavigationLink from './navigation/NavigationLink';
import MobileMenu from './navigation/MobileMenu';
import { isActiveRoute } from '../utils/navigation';

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: '/resources' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Logo />
          
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <NavigationLink
                key={item.name}
                to={item.path}
                isActive={isActiveRoute(location.pathname, item.path)}
              >
                {item.name}
              </NavigationLink>
            ))}
          </nav>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        <MobileMenu
          isOpen={isMobileMenuOpen}
          currentPath={location.pathname}
          onClose={closeMobileMenu}
        />
      </div>
    </header>
  );
};

export default Header;