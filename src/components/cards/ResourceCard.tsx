import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Resource } from '../../data/resources';

interface ResourceCardProps {
  resource: Resource;
  categoryId?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, categoryId = '' }) => {
  return (
    <div className="flex flex-col justify-between h-full border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-white relative group">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <Link 
            to={`/resource/${resource.id}`}
            className="flex-1 mr-4"
          >
            <h3 className="text-xl font-semibold text-gray-900 leading-tight mb-2 line-clamp-2 hover:text-purple-600 transition-colors cursor-pointer">
              {resource.name}
            </h3>
          </Link>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-purple-50 hover:bg-purple-100 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={18} className="text-purple-600" />
          </a>
        </div>

        <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
          {resource.description}
        </p>
      </div>

      <div className="space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          {resource.featured && (
            <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-medium">
              ⭐ Featured
            </span>
          )}
          {resource.difficulty && (
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">
              {resource.difficulty}
            </span>
          )}
          {resource.type && (
            <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
              {resource.type}
            </span>
          )}
          {resource.isFree && (
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
              Free
            </span>
          )}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {resource.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="inline-block px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-medium cursor-default hover:from-purple-200 hover:to-pink-200 transition"
            >
              {tag}
            </span>
          ))}
          {resource.tags.length > 4 && (
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
              +{resource.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 pt-2">
          <Link
            to={`/resource/${resource.id}`}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-center py-2 px-4 rounded-lg transition-all duration-200 text-sm font-medium flex items-center justify-center"
          >
            <BookOpen size={16} className="mr-2" />
            View Details
          </Link>
        </div>
      </div>

      {/* Hover ring effect */}
      <div className="absolute inset-0 rounded-2xl ring-0 ring-purple-300/40 group-hover:ring-4 transition-all pointer-events-none" />
    </div>
  );
};

export default ResourceCard;