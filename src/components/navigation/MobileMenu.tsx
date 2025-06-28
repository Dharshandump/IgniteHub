import React from 'react';
import NavigationLink from './NavigationLink';
import { isActiveRoute } from '../../utils/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  currentPath: string;
  onClose: () => void;
}

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Resources', path: '/resources' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, currentPath, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="md:hidden pb-4 border-t">
      {/* Mobile nav links */}
      <nav className="flex flex-col space-y-2 pt-4">
        {navigationItems.map((item) => (
          <NavigationLink
            key={item.name}
            to={item.path}
            isActive={isActiveRoute(currentPath, item.path)}
            isMobile
            onClick={onClose}
          >
            {item.name}
          </NavigationLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileMenu;
