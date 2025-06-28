import { useState, useEffect } from 'react';
import { supabase, ResourceReview, isSupabaseConfigured } from '../lib/supabase';
import { toast } from 'sonner';

export const useReviews = (resourceId?: string) => {
  const [reviews, setReviews] = useState<ResourceReview[]>([]);
  const [loading, setLoading] = useState(false);
  const [userReview, setUserReview] = useState<ResourceReview | null>(null);

  // Fetch reviews for a resource
  const fetchReviews = async (resourceId: string) => {
    if (!isSupabaseConfigured()) {
      console.log('Reviews feature requires Supabase configuration');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resource_reviews')
        .select(`
          *,
          user_profiles (
            display_name,
            avatar_url
          )
        `)
        .eq('resource_id', resourceId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  // Fetch user's review for a resource
  const fetchUserReview = async (resourceId: string) => {
    if (!isSupabaseConfigured()) {
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('resource_reviews')
        .select('*')
        .eq('resource_id', resourceId)
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setUserReview(data);
    } catch (error) {
      console.error('Error fetching user review:', error);
    }
  };

  // Submit a review
  const submitReview = async (
    resourceId: string,
    categoryId: string,
    rating: number,
    title?: string,
    reviewText?: string,
    pros?: string[],
    cons?: string[]
  ) => {
    if (!isSupabaseConfigured()) {
      toast.error('Reviews feature requires Supabase configuration');
      return false;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to submit a review');
        return false;
      }

      const reviewData = {
        resource_id: resourceId,
        category_id: categoryId,
        user_id: user.id,
        rating,
        title,
        review_text: reviewText,
        pros,
        cons
      };

      const { error } = await supabase
        .from('resource_reviews')
        .upsert(reviewData, {
          onConflict: 'resource_id,user_id'
        });

      if (error) throw error;

      toast.success('Review submitted successfully!');
      await fetchReviews(resourceId);
      await fetchUserReview(resourceId);
      return true;
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
      return false;
    }
  };

  // Vote on a review
  const voteOnReview = async (reviewId: string, isHelpful: boolean) => {
    if (!isSupabaseConfigured()) {
      toast.error('Reviews feature requires Supabase configuration');
      return false;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to vote');
        return false;
      }

      const { error } = await supabase
        .from('review_votes')
        .upsert({
          review_id: reviewId,
          user_id: user.id,
          is_helpful: isHelpful
        }, {
          onConflict: 'review_id,user_id'
        });

      if (error) throw error;

      toast.success('Vote recorded!');
      if (resourceId) {
        await fetchReviews(resourceId);
      }
      return true;
    } catch (error) {
      console.error('Error voting on review:', error);
      toast.error('Failed to record vote');
      return false;
    }
  };

  // Report a resource
  const reportResource = async (
    resourceId: string,
    categoryId: string,
    reportType: string,
    description?: string
  ) => {
    if (!isSupabaseConfigured()) {
      toast.error('Reporting feature requires Supabase configuration');
      return false;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in to report');
        return false;
      }

      const { error } = await supabase
        .from('resource_reports')
        .insert({
          resource_id: resourceId,
          category_id: categoryId,
          user_id: user.id,
          report_type: reportType,
          description
        });

      if (error) throw error;

      toast.success('Report submitted. Thank you for helping improve our platform!');
      return true;
    } catch (error) {
      console.error('Error reporting resource:', error);
      toast.error('Failed to submit report');
      return false;
    }
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  useEffect(() => {
    if (resourceId && isSupabaseConfigured()) {
      fetchReviews(resourceId);
      fetchUserReview(resourceId);
    }
  }, [resourceId]);

  return {
    reviews,
    userReview,
    loading,
    averageRating,
    submitReview,
    voteOnReview,
    reportResource,
    fetchReviews
  };
};