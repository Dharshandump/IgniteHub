import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Resource } from '../data/resources';

interface CategoryCardProps {
  resource: Resource;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ resource }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-purple-200 relative group h-full flex flex-col min-h-[400px]">
      <div className="flex justify-between items-start mb-4 flex-shrink-0">
        <h3 className="text-xl font-semibold text-gray-900 line-clamp-2 flex-1 mr-4 leading-tight">
          {resource.name}
        </h3>
        <div className="flex items-center gap-2 flex-shrink-0">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors group"
          >
            <ExternalLink size={18} className="text-purple-600 group-hover:text-purple-700" />
          </a>
        </div>
      </div>

      <div className="flex-grow flex flex-col">
        <p className="text-gray-600 mb-4 leading-relaxed flex-grow text-sm">
          {resource.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4 flex-shrink-0">
          {resource.difficulty && (
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              {resource.difficulty}
            </span>
          )}
          {resource.type && (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
              {resource.type}
            </span>
          )}
          {resource.isFree && (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full font-medium">
              Free
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 flex-shrink-0">
          {resource.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-medium hover:from-purple-200 hover:to-pink-200 transition-colors cursor-default"
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{resource.tags.length - 4} more
            </span>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default CategoryCard;
