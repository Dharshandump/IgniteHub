import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';

interface AdvancedFiltersProps {
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
  onClearFilters: () => void;
  availableTags: string[];
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  availableTags
}) => {
  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    onFilterChange('tags', newTags);
  };

  return (
    <div className="border-t pt-4 space-y-6">
      <div className="grid grid-cols-1 gap-6">
        {/* Tags Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Tags</Label>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {availableTags.map(tag => (
              <Badge
                key={tag}
                variant={filters.tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-purple-100 transition-colors"
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
                {filters.tags.includes(tag) && (
                  <X size={12} className="ml-1" />
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Pricing Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Pricing</Label>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={filters.isFree === 'all' ? "default" : "outline"}
              className="cursor-pointer hover:bg-purple-100 transition-colors"
              onClick={() => onFilterChange('isFree', 'all')}
            >
              All Resources
            </Badge>
            <Badge
              variant={filters.isFree === 'free' ? "default" : "outline"}
              className="cursor-pointer hover:bg-purple-100 transition-colors"
              onClick={() => onFilterChange('isFree', 'free')}
            >
              Free Only
            </Badge>
            <Badge
              variant={filters.isFree === 'paid' ? "default" : "outline"}
              className="cursor-pointer hover:bg-purple-100 transition-colors"
              onClick={() => onFilterChange('isFree', 'paid')}
            >
              Paid Only
            </Badge>
          </div>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="flex justify-end pt-4 border-t">
        <Button variant="outline" onClick={onClearFilters}>
          <X size={16} className="mr-2" />
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};

export default AdvancedFilters;