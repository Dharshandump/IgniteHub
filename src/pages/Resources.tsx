import React, { useState, useMemo } from 'react';
import { categories } from '../data/resources';

import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import SearchInput from '../components/ui/SearchInput';
import CategoryPreviewCard from '../components/cards/CategoryPreviewCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

import { filterBySearchTerm, sortItems } from '../utils/search';

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const processedCategories = useMemo(() => {
    const filtered = filterBySearchTerm(categories, searchTerm);
    return sortItems(filtered, sortBy);
  }, [searchTerm, sortBy]);

  const showNoResults = processedCategories.length === 0 && searchTerm.trim();

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Resource Categories"
        subtitle="Explore our curated collection of resources organized by category to help you find exactly what you need."
        gradient="from-purple-600 to-pink-600"
      />

      <ContentContainer>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search categories..."
        />

        <div className="bg-white rounded-lg shadow-sm border p-4 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white border shadow-lg z-50">
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                  <SelectItem value="resources">Most Resources</SelectItem>
                  <SelectItem value="resources-asc">Fewest Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-500">
              Showing {processedCategories.length} of {categories.length} categories
            </div>
          </div>
        </div>

        {showNoResults ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No categories found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processedCategories.map((category, index) => (
              <CategoryPreviewCard
                key={category.id}
                category={category}
                animationDelay={index}
              />
            ))}
          </div>
        )}
      </ContentContainer>
    </div>
  );
};

export default ResourcesPage;
