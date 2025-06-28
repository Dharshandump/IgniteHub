import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

import GradientButton from '../ui/GradientButton';

const CallToActionSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* CTA heading */}
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Build Something Amazing?
        </h2>

        {/* CTA subheading */}
        <p className="text-xl text-purple-100 mb-8">
          Join thousands of young innovators who are already using these resources to bring their ideas to life.
        </p>

        {/* CTA button */}
        <Link to="/resources">
          <GradientButton variant="secondary" size="large" icon={ArrowRight}>
            Start Exploring
          </GradientButton>
        </Link>
      </div>
    </section>
  );
};

export default CallToActionSection;