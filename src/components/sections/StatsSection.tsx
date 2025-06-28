import React from 'react';
import { categories } from '../../data/resources';
import { Users, BookOpen, Globe, Zap } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

interface StatItemProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  description: string;
  delay?: number;
}

const StatItem: React.FC<StatItemProps> = ({ icon, value, label, description, delay = 0 }) => {
  const { count, elementRef } = useCountUp({
    end: value,
    duration: 2500,
    delay
  });

  return (
    <div
      ref={elementRef}
      className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
    >
      <div className="flex justify-center mb-4 transform transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <div className="text-4xl font-bold text-gray-900 mb-2 font-mono">
        {count.toLocaleString()}
      </div>
      <div className="text-lg font-semibold text-gray-700 mb-1">
        {label}
      </div>
      <div className="text-sm text-gray-600">
        {description}
      </div>
    </div>
  );
};

const StatsSection: React.FC = () => {
  const totalResources = categories.reduce((total, category) => total + category.resources.length, 0);
  const freeResources = categories.reduce((total, category) => 
    total + category.resources.filter(resource => resource.isFree).length, 0
  );
  const categoriesCount = categories.length;
  const featuredResources = categories.reduce((total, category) => 
    total + category.resources.filter(resource => resource.featured).length, 0
  );

  const stats = [
    {
      icon: <BookOpen className="text-purple-600" size={32} />,
      value: totalResources,
      label: 'Curated Resources',
      description: 'Hand-picked tools and platforms',
      delay: 0
    },
    {
      icon: <Globe className="text-blue-600" size={32} />,
      value: categoriesCount,
      label: 'Categories',
      description: 'Organized by purpose and use case',
      delay: 200
    },
    {
      icon: <Zap className="text-yellow-600" size={32} />,
      value: freeResources,
      label: 'Free Resources',
      description: 'No cost to get started',
      delay: 400
    },
    {
      icon: <Users className="text-green-600" size={32} />,
      value: featuredResources,
      label: 'Featured Tools',
      description: 'Editor\'s choice recommendations',
      delay: 600
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Empowering Innovation at Scale
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our growing collection of resources helps thousands of young innovators turn their ideas into reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;