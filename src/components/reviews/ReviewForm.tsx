import React, { useState } from 'react';
import { Star, Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

interface ReviewFormProps {
  onSubmit: (data: {
    rating: number;
    title?: string;
    reviewText?: string;
    pros?: string[];
    cons?: string[];
  }) => Promise<boolean>;
  initialData?: {
    rating: number;
    title?: string;
    reviewText?: string;
    pros?: string[];
    cons?: string[];
  };
  isSubmitting?: boolean;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit, initialData, isSubmitting = false }) => {
  const [rating, setRating] = useState(initialData?.rating || 0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [title, setTitle] = useState(initialData?.title || '');
  const [reviewText, setReviewText] = useState(initialData?.reviewText || '');
  const [pros, setPros] = useState<string[]>(initialData?.pros || []);
  const [cons, setCons] = useState<string[]>(initialData?.cons || []);
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }

    const success = await onSubmit({
      rating,
      title: title.trim() || undefined,
      reviewText: reviewText.trim() || undefined,
      pros: pros.length > 0 ? pros : undefined,
      cons: cons.length > 0 ? cons : undefined
    });

    if (success && !initialData) {
      // Reset form for new reviews
      setRating(0);
      setTitle('');
      setReviewText('');
      setPros([]);
      setCons([]);
    }
  };

  const addPro = () => {
    if (newPro.trim()) {
      setPros([...pros, newPro.trim()]);
      setNewPro('');
    }
  };

  const addCon = () => {
    if (newCon.trim()) {
      setCons([...cons, newCon.trim()]);
      setNewCon('');
    }
  };

  const removePro = (index: number) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const removeCon = (index: number) => {
    setCons(cons.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating */}
      <div>
        <Label className="text-base font-medium">Rating *</Label>
        <div className="flex items-center space-x-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-1 hover:scale-110 transition-transform"
            >
              <Star
                size={24}
                className={`${
                  star <= (hoveredRating || rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                } transition-colors`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {rating > 0 && `${rating}/5`}
          </span>
        </div>
      </div>

      {/* Title */}
      <div>
        <Label htmlFor="title">Review Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Summarize your experience..."
          className="mt-1"
        />
      </div>

      {/* Review Text */}
      <div>
        <Label htmlFor="reviewText">Your Review</Label>
        <Textarea
          id="reviewText"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your detailed experience with this resource..."
          rows={4}
          className="mt-1"
        />
      </div>

      {/* Pros */}
      <div>
        <Label>What did you like? (Pros)</Label>
        <div className="mt-2 space-y-2">
          <div className="flex space-x-2">
            <Input
              value={newPro}
              onChange={(e) => setNewPro(e.target.value)}
              placeholder="Add a positive point..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addPro())}
            />
            <Button type="button" onClick={addPro} size="sm">
              <Plus size={16} />
            </Button>
          </div>
          {pros.length > 0 && (
            <div className="space-y-1">
              {pros.map((pro, index) => (
                <div key={index} className="flex items-center justify-between bg-green-50 p-2 rounded">
                  <span className="text-sm text-green-800">• {pro}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removePro(index)}
                    className="text-green-600 hover:text-red-600"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cons */}
      <div>
        <Label>What could be improved? (Cons)</Label>
        <div className="mt-2 space-y-2">
          <div className="flex space-x-2">
            <Input
              value={newCon}
              onChange={(e) => setNewCon(e.target.value)}
              placeholder="Add an area for improvement..."
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCon())}
            />
            <Button type="button" onClick={addCon} size="sm">
              <Plus size={16} />
            </Button>
          </div>
          {cons.length > 0 && (
            <div className="space-y-1">
              {cons.map((con, index) => (
                <div key={index} className="flex items-center justify-between bg-red-50 p-2 rounded">
                  <span className="text-sm text-red-800">• {con}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCon(index)}
                    className="text-red-600 hover:text-red-600"
                  >
                    <X size={14} />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={rating === 0 || isSubmitting}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        {isSubmitting ? 'Submitting...' : (initialData ? 'Update Review' : 'Submit Review')}
      </Button>
    </form>
  );
};

export default ReviewForm;