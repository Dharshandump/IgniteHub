import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

import GradientButton from '../ui/GradientButton';
import { scrollToElement } from '../../utils/navigation';

const HeroSection: React.FC = () => {
  const handleExploreClick = () => {
    scrollToElement('resources-section');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-accent/5 py-24 sm:py-32">
      {/* Optional: subtle grid */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to bottom, white, transparent)] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
        
        {/* Welcome badge */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full font-medium shadow-sm backdrop-blur-sm">
            <Sparkles size={18} />
            <span>Welcome to IgniteHub</span>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
          Discover Curated Tools for{' '}
          <span className="bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Young Innovators
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Hand ~ picked resources to help you learn, build, and launch your ideas 🚀
        </p>

        {/* Call to action */}
        <GradientButton 
          onClick={handleExploreClick}
          size="large"
          icon={ArrowRight}
        >
          Explore Resources
        </GradientButton>
      </div>
    </section>
  );
};

export default HeroSection;
