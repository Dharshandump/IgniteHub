import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
  gradient: string;
  resources: any[];
}

interface CategoryPreviewCardProps {
  category: Category;
  animationDelay?: number;
}

const CategoryPreviewCard: React.FC<CategoryPreviewCardProps> = ({ category, animationDelay = 0 }) => {
  return (
    <Link
      to={`/resources/${category.id}`}
      className="group block h-full"
      style={{ animationDelay: `${animationDelay * 0.1}s` }}
    >
      <div className="flex flex-col justify-between h-full rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:border-purple-300 transform hover:-translate-y-1">
        <div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110`}
        >
          <span className="text-3xl">{category.icon}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
          {category.title}
        </h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed flex-grow">
          {category.description}
        </p>
        <div className="flex items-center text-purple-600 font-medium group-hover:text-purple-700">
          <span>Explore {category.resources.length} resources</span>
          <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={16} />
        </div>
      </div>
    </Link>
  );
};

export default CategoryPreviewCard;
