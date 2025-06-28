import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Users, Filter } from 'lucide-react';
import { categories } from '../data/resources';
import ResourceCard from '../components/cards/ResourceCard';
import AdvancedSearch from '../components/AdvancedSearch';
import ContentContainer from '../components/layout/ContentContainer';
import { useAdvancedSearch } from '../hooks/useAdvancedSearch';

const ResourceCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categories.find(cat => cat.id === categoryId);
  
  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    filteredResources,
    clearAllFilters,
    availableTags
  } = useAdvancedSearch(category?.resources || []);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
          <p className="text-gray-600 mb-4">
            The category "{categoryId}" was not found.
          </p>
          <Link
            to="/resources"
            className="inline-flex items-center text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  const showNoResults = filteredResources.length === 0;
  const hasActiveFilters = searchTerm || 
    filters.tags.length > 0 ||
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.location ||
    filters.minRating > 0 ||
    filters.difficulty !== 'all' ||
    filters.type !== 'all' ||
    filters.isFree !== 'all';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`bg-gradient-to-r ${category.gradient} py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/resources"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={16} />
            Back to Resources
          </Link>

          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <span className="text-4xl">{category.icon}</span>
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {category.title}
              </h1>
              <div className="flex items-center text-white/80">
                <Users size={16} className="mr-1" />
                <span>{category.resources.length} resources available</span>
                {filteredResources.length !== category.resources.length && (
                  <span className="ml-2">
                    • {filteredResources.length} matching your search
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="text-xl text-white/90 max-w-3xl">
            {category.description}
          </p>
        </div>
      </div>

      <ContentContainer>
        <AdvancedSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
          onFilterChange={updateFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onClearAll={clearAllFilters}
          availableTags={availableTags}
          placeholder={`Search ${category.title.toLowerCase()}...`}
        />

        {showNoResults ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters
                ? "Try adjusting your search terms or filters."
                : "No resources available in this category."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                categoryId={categoryId}
              />
            ))}
          </div>
        )}
      </ContentContainer>
    </div>
  );
};

export default ResourceCategoryPage;