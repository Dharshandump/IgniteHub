import React from 'react';
import { categories } from '../../data/resources';
import CategoryPreviewCard from '../cards/CategoryPreviewCard';

const ResourcesGrid: React.FC = () => {
  return (
    <section id="resources-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Your Path to Innovation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our carefully curated categories of resources designed to accelerate your journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryPreviewCard
              key={category.id}
              category={category}
              animationDelay={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesGrid;
