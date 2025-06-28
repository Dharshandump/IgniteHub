import React from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import AdvancedFilters from './search/AdvancedFilters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible';

interface AdvancedSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: {
    tags: string[];
    dateRange: { start: string; end: string };
    location: string;
    minRating: number;
    difficulty: string;
    type: string;
    isFree: string;
  };
  onFilterChange: (key: string, value: any) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onClearAll: () => void;
  availableTags: string[];
  placeholder?: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  onClearAll,
  availableTags,
  placeholder = 'Search resources...'
}) => {
  const [showAdvanced, setShowAdvanced] = React.useState(false);

  const hasActiveFilters =
    searchTerm || 
    filters.tags.length > 0 ||
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.location ||
    filters.minRating > 0 ||
    filters.difficulty !== 'all' ||
    filters.type !== 'all' ||
    filters.isFree !== 'all';

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8 space-y-4">
      {/* Main Search Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
            placeholder={placeholder}
          />
        </div>

        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="name-desc">Name (Z-A)</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="rating-asc">Lowest Rated</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>

        <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  !
                </span>
              )}
            </Button>
          </CollapsibleTrigger>
        </Collapsible>

        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearAll}>
            <X size={16} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
        <CollapsibleContent>
          <AdvancedFilters
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearAll}
            availableTags={availableTags}
          />
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedSearch;