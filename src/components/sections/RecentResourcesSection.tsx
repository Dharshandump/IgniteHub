import React from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/resources';
import ResourceCard from '../cards/ResourceCard';

const RecentResourcesSection: React.FC = () => {
  // Get all resources with dates and sort by most recent
  const allResources = categories.flatMap(category => 
    category.resources
      .filter(resource => resource.dateAdded)
      .map(resource => ({
        ...resource,
        categoryId: category.id,
        categoryTitle: category.title
      }))
  );

  const recentResources = allResources
    .sort((a, b) => new Date(b.dateAdded!).getTime() - new Date(a.dateAdded!).getTime())
    .slice(0, 6);

  if (recentResources.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Clock className="text-purple-600 mr-3" size={24} />
              <h2 className="text-3xl font-bold text-gray-900">
                Recently Added
              </h2>
            </div>
            <p className="text-xl text-gray-600">
              Fresh resources to fuel your innovation journey
            </p>
          </div>
          
          <Link 
            to="/resources"
            className="hidden md:flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            View All Resources
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentResources.map((resource) => (
            <div key={resource.id} className="relative">
              <ResourceCard
                resource={resource}
                categoryId={resource.categoryId}
              />
              <div className="absolute top-4 right-4">
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                  New
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Link 
            to="/resources"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
          >
            View All Resources
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentResourcesSection;