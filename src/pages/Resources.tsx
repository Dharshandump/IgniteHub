import React, { useState, useMemo } from 'react';
import { categories } from '../data/resources';

import PageHeader from '../components/layout/PageHeader';
import ContentContainer from '../components/layout/ContentContainer';
import SearchInput from '../components/ui/SearchInput';
import CategoryPreviewCard from '../components/cards/CategoryPreviewCard';
import ResourceCard from '../components/cards/ResourceCard';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

import { filterBySearchTerm, sortItems } from '../utils/search';

const ResourcesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [activeTab, setActiveTab] = useState('categories');

  // Process categories for category view
  const processedCategories = useMemo(() => {
    const filtered = filterBySearchTerm(categories, searchTerm);
    return sortItems(filtered, sortBy);
  }, [searchTerm, sortBy]);

  // Process resources for resource view
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }

    const term = searchTerm.toLowerCase();
    const results: Array<{ resource: any; categoryId: string; categoryTitle: string }> = [];

    categories.forEach(category => {
      category.resources.forEach(resource => {
        const matchesName = resource.name.toLowerCase().includes(term);
        const matchesDescription = resource.description.toLowerCase().includes(term);
        const matchesTags = resource.tags.some((tag: string) => tag.toLowerCase().includes(term));
        const matchesCategory = category.title.toLowerCase().includes(term);

        if (matchesName || matchesDescription || matchesTags || matchesCategory) {
          results.push({
            resource,
            categoryId: category.id,
            categoryTitle: category.title
          });
        }
      });
    });

    // Sort results
    return results.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.resource.name.localeCompare(b.resource.name);
        case 'name-desc':
          return b.resource.name.localeCompare(a.resource.name);
        case 'category':
          return a.categoryTitle.localeCompare(b.categoryTitle);
        case 'featured':
          return (b.resource.featured ? 1 : 0) - (a.resource.featured ? 1 : 0);
        default:
          return 0;
      }
    });
  }, [searchTerm, sortBy]);

  // Determine which view to show
  const showResourceResults = searchTerm.trim() && searchResults.length > 0;
  const showNoResults = searchTerm.trim() && searchResults.length === 0 && processedCategories.length === 0;

  // Auto-switch to resources tab when search has results
  React.useEffect(() => {
    if (showResourceResults && activeTab === 'categories') {
      setActiveTab('resources');
    } else if (!searchTerm.trim() && activeTab === 'resources') {
      setActiveTab('categories');
    }
  }, [showResourceResults, searchTerm, activeTab]);

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
          placeholder="Search categories and resources..."
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
                  {showResourceResults && (
                    <>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="featured">Featured First</SelectItem>
                    </>
                  )}
                  {!showResourceResults && (
                    <>
                      <SelectItem value="resources">Most Resources</SelectItem>
                      <SelectItem value="resources-asc">Fewest Resources</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="text-sm text-gray-500">
              {showResourceResults ? (
                <>Showing {searchResults.length} resource{searchResults.length !== 1 ? 's' : ''}</>
              ) : (
                <>Showing {processedCategories.length} of {categories.length} categories</>
              )}
            </div>
          </div>
        </div>

        {/* Search Results Tabs */}
        {searchTerm.trim() && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="categories" className="flex items-center gap-2">
                Categories
                {processedCategories.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {processedCategories.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="resources" className="flex items-center gap-2">
                Resources
                {searchResults.length > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {searchResults.length}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        )}

        {showNoResults ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search terms or browse all categories.
            </p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Clear Search
            </button>
          </div>
        ) : (
          <>
            {/* Categories View */}
            {(!searchTerm.trim() || activeTab === 'categories') && processedCategories.length > 0 && (
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

            {/* Resources View */}
            {searchTerm.trim() && activeTab === 'resources' && searchResults.length > 0 && (
              <div className="space-y-8">
                {/* Group by category */}
                {Object.entries(
                  searchResults.reduce((acc, { resource, categoryId, categoryTitle }) => {
                    if (!acc[categoryId]) {
                      acc[categoryId] = {
                        title: categoryTitle,
                        resources: []
                      };
                    }
                    acc[categoryId].resources.push({ resource, categoryId });
                    return acc;
                  }, {} as Record<string, { title: string; resources: Array<{ resource: any; categoryId: string }> }>)
                ).map(([categoryId, { title, resources }]) => (
                  <div key={categoryId} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
                      <Badge variant="outline" className="text-sm">
                        {resources.length} resource{resources.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {resources.map(({ resource, categoryId }) => (
                        <ResourceCard
                          key={resource.id}
                          resource={resource}
                          categoryId={categoryId}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </ContentContainer>
    </div>
  );
};

export default ResourcesPage;