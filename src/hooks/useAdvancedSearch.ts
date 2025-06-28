import { useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { Resource } from '../data/resources';

interface AdvancedSearchFilters {
  tags: string[];
  dateRange: { start: string; end: string };
  location: string;
  minRating: number;
  difficulty: string;
  type: string;
  isFree: string;
}

export const useAdvancedSearch = (resources: Resource[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    tags: [],
    dateRange: { start: '', end: '' },
    location: '',
    minRating: 0,
    difficulty: 'all',
    type: 'all',
    isFree: 'all'
  });
  const [sortBy, setSortBy] = useState('name');

  const fuse = useMemo(() => {
    if (!resources?.length) return null;

    return new Fuse(resources, {
      keys: [
        { name: 'name', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'tags', weight: 0.3 }
      ],
      threshold: 0.4,
      includeScore: true
    });
  }, [resources]);

  const filteredResources = useMemo(() => {
    if (!resources?.length) return [];

    let results = resources;

    // Text search
    if (searchTerm.trim() && fuse) {
      const fuseResults = fuse.search(searchTerm);
      results = fuseResults.map(result => result.item);
    }

    // Apply filters
    results = results.filter(resource => {
      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => 
          resource.tags.some(resourceTag => 
            resourceTag.toLowerCase().includes(tag.toLowerCase())
          )
        );
        if (!hasMatchingTag) return false;
      }

      // Date range filter
      if (filters.dateRange.start && resource.dateAdded) {
        if (new Date(resource.dateAdded) < new Date(filters.dateRange.start)) {
          return false;
        }
      }
      if (filters.dateRange.end && resource.dateAdded) {
        if (new Date(resource.dateAdded) > new Date(filters.dateRange.end)) {
          return false;
        }
      }

      // Location filter
      if (filters.location && resource.location) {
        if (!resource.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // Rating filter
      if (filters.minRating > 0 && resource.rating) {
        if (resource.rating < filters.minRating) {
          return false;
        }
      }

      // Difficulty filter
      if (filters.difficulty !== 'all' && resource.difficulty) {
        if (resource.difficulty !== filters.difficulty) {
          return false;
        }
      }

      // Type filter
      if (filters.type !== 'all' && resource.type) {
        if (resource.type !== filters.type) {
          return false;
        }
      }

      // Free/Paid filter
      if (filters.isFree !== 'all') {
        const isFree = filters.isFree === 'free';
        if (resource.isFree !== isFree) {
          return false;
        }
      }

      return true;
    });

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'rating-asc':
          return (a.rating || 0) - (b.rating || 0);
        case 'newest':
          if (!a.dateAdded || !b.dateAdded) return 0;
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'oldest':
          if (!a.dateAdded || !b.dateAdded) return 0;
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        case 'popular':
          return (b.reviewCount || 0) - (a.reviewCount || 0);
        default:
          return 0;
      }
    });

    return results;
  }, [resources, searchTerm, filters, sortBy, fuse]);

  const updateFilter = (key: keyof AdvancedSearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({
      tags: [],
      dateRange: { start: '', end: '' },
      location: '',
      minRating: 0,
      difficulty: 'all',
      type: 'all',
      isFree: 'all'
    });
    setSortBy('name');
  };

  const availableTags = useMemo(() => {
    const allTags = resources.flatMap(resource => resource.tags);
    return [...new Set(allTags)].sort();
  }, [resources]);

  return {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilter,
    sortBy,
    setSortBy,
    filteredResources,
    clearAllFilters,
    availableTags
  };
};