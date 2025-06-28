import React from 'react';
import { Star, ThumbsUp, ThumbsDown, Flag } from 'lucide-react';
import { ResourceReview } from '../../lib/supabase';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useReviews } from '../../hooks/useReviews';

interface ReviewCardProps {
  review: ResourceReview;
  onVote?: (reviewId: string, isHelpful: boolean) => void;
  onReport?: (reviewId: string) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, onVote, onReport }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold">
            {review.user_profiles?.display_name?.[0] || 'U'}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              {review.user_profiles?.display_name || 'Anonymous User'}
            </h4>
            <p className="text-sm text-gray-500">{formatDate(review.created_at)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {review.is_verified && (
            <Badge className="bg-green-100 text-green-800">Verified</Badge>
          )}
          {review.is_featured && (
            <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
          )}
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={`${
                star <= review.rating
                  ? 'text-yellow-400 fill-current'
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-900">{review.rating}/5</span>
      </div>

      {/* Title */}
      {review.title && (
        <h3 className="text-lg font-semibold text-gray-900">{review.title}</h3>
      )}

      {/* Review Text */}
      {review.review_text && (
        <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
      )}

      {/* Pros and Cons */}
      {(review.pros?.length || review.cons?.length) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {review.pros && review.pros.length > 0 && (
            <div>
              <h4 className="font-medium text-green-700 mb-2">👍 Pros</h4>
              <ul className="space-y-1">
                {review.pros.map((pro, index) => (
                  <li key={index} className="text-sm text-gray-700">• {pro}</li>
                ))}
              </ul>
            </div>
          )}
          
          {review.cons && review.cons.length > 0 && (
            <div>
              <h4 className="font-medium text-red-700 mb-2">👎 Cons</h4>
              <ul className="space-y-1">
                {review.cons.map((con, index) => (
                  <li key={index} className="text-sm text-gray-700">• {con}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote?.(review.id, true)}
            className="text-gray-600 hover:text-green-600"
          >
            <ThumbsUp size={16} className="mr-1" />
            Helpful ({review.helpful_count})
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onVote?.(review.id, false)}
            className="text-gray-600 hover:text-red-600"
          >
            <ThumbsDown size={16} className="mr-1" />
            Not Helpful ({review.unhelpful_count})
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onReport?.(review.id)}
          className="text-gray-400 hover:text-red-600"
        >
          <Flag size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;