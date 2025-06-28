import React from 'react';
import { Rocket, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from './common/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-sky-900 text-gray-100 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Logo size="small" />
          <p className="mt-4 text-sm text-gray-300">
            Empowering young innovators with curated resources and opportunities.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
          <nav className="flex flex-col gap-2">
            <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/resources" className="text-gray-300 hover:text-white">Resources</Link>
            <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          </nav>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
          <div className="flex space-x-4">
            <a
              href="https://www.linkedin.com/in/dharshan-sondi-6a389a34a/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Linkedin size={20} />
            </a>
            <Link
              to="/contact"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 mt-8 pt-6 text-center text-sm text-gray-300">
        <div className="flex justify-center items-center gap-2 mb-2">
          <Rocket size={16} className="text-sky-400" />
          Launching dreams into reality
        </div>
        © 2025 IgniteHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
