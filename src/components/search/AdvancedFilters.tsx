import React from 'react';
import { X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/select';

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

  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    onFilterChange('dateRange', {
      ...filters.dateRange,
      [field]: value
    });
  };

  return (
    <div className="border-t pt-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

        {/* Date Range Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Date Range</Label>
          <div className="space-y-2">
            <div>
              <Label className="text-xs text-gray-500">From</Label>
              <Input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                className="text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">To</Label>
              <Input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Location</Label>
          <Input
            value={filters.location}
            onChange={(e) => onFilterChange('location', e.target.value)}
            placeholder="Enter location..."
            className="text-sm"
          />
        </div>

        {/* Rating Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Minimum Rating: {filters.minRating}/5
          </Label>
          <Slider
            value={[filters.minRating]}
            onValueChange={(value) => onFilterChange('minRating', value[0])}
            max={5}
            min={0}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Difficulty Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Difficulty</Label>
          <Select
            value={filters.difficulty}
            onValueChange={(value) => onFilterChange('difficulty', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="expert">Expert</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Type Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Type</Label>
          <Select
            value={filters.type}
            onValueChange={(value) => onFilterChange('type', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="course">Course</SelectItem>
              <SelectItem value="tutorial">Tutorial</SelectItem>
              <SelectItem value="article">Article</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="book">Book</SelectItem>
              <SelectItem value="tool">Tool</SelectItem>
              <SelectItem value="website">Website</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Free/Paid Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Pricing</Label>
          <Select
            value={filters.isFree}
            onValueChange={(value) => onFilterChange('isFree', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select pricing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Resources</SelectItem>
              <SelectItem value="free">Free Only</SelectItem>
              <SelectItem value="paid">Paid Only</SelectItem>
            </SelectContent>
          </Select>
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