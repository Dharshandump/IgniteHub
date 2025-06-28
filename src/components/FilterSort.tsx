import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import { Button } from './ui/button';

interface FilterSortProps {
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  availableTags: string[];
  onClearFilters: () => void;
}

const FilterSort: React.FC<FilterSortProps> = ({
  selectedTags,
  onTagToggle,
  sortBy,
  onSortChange,
  availableTags,
  onClearFilters
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by
          </label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sorting option" />
            </SelectTrigger>
            <SelectContent className="bg-white border shadow-lg z-50">
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by tags
          </label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end">
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="whitespace-nowrap"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      {selectedTags.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-600">Active filters:</span>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
              >
                {tag}
                <button
                  onClick={() => onTagToggle(tag)}
                  className="hover:text-purple-900"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSort;
