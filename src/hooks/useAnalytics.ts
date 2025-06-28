import { useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

// Generate or get session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('igniteHub_sessionId');
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem('igniteHub_sessionId', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const sessionId = getSessionId();

  // Track resource view
  const trackResourceView = useCallback(async (
    resourceId: string,
    categoryId: string,
    duration: number = 0
  ) => {
    try {
      // Skip tracking if Supabase is not configured
      if (!isSupabaseConfigured()) {
        console.log('Analytics tracking skipped (Supabase not configured)');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('resource_views').insert({
        resource_id: resourceId,
        category_id: categoryId,
        user_id: user?.id,
        session_id: sessionId,
        user_agent: navigator.userAgent,
        referrer: document.referrer,
        duration_seconds: duration
      });
    } catch (error) {
      console.error('Error tracking resource view:', error);
    }
  }, [sessionId]);

  // Track search
  const trackSearch = useCallback(async (
    searchTerm: string,
    categoryId: string | null,
    resultsCount: number,
    filtersApplied: Record<string, any> = {}
  ) => {
    try {
      // Skip tracking if Supabase is not configured
      if (!isSupabaseConfigured()) {
        console.log('Analytics tracking skipped (Supabase not configured)');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('search_analytics').insert({
        search_term: searchTerm,
        category_id: categoryId,
        results_count: resultsCount,
        user_id: user?.id,
        session_id: sessionId,
        filters_applied: filtersApplied
      });
    } catch (error) {
      console.error('Error tracking search:', error);
    }
  }, [sessionId]);

  // Track category visit
  const trackCategoryVisit = useCallback(async (
    categoryId: string,
    timeSpent: number = 0,
    resourcesViewed: number = 0
  ) => {
    try {
      // Skip tracking if Supabase is not configured
      if (!isSupabaseConfigured()) {
        console.log('Analytics tracking skipped (Supabase not configured)');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('category_analytics').insert({
        category_id: categoryId,
        user_id: user?.id,
        session_id: sessionId,
        time_spent_seconds: timeSpent,
        resources_viewed: resourcesViewed
      });
    } catch (error) {
      console.error('Error tracking category visit:', error);
    }
  }, [sessionId]);

  // Update session
  const updateSession = useCallback(async () => {
    try {
      // Skip tracking if Supabase is not configured
      if (!isSupabaseConfigured()) {
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      await supabase.from('user_sessions').upsert({
        session_id: sessionId,
        user_id: user?.id,
        user_agent: navigator.userAgent,
        last_activity: new Date().toISOString()
      }, {
        onConflict: 'session_id'
      });
    } catch (error) {
      console.error('Error updating session:', error);
    }
  }, [sessionId]);

  // Initialize session on mount
  useEffect(() => {
    if (isSupabaseConfigured()) {
      updateSession();
      
      // Update session every 5 minutes
      const interval = setInterval(updateSession, 5 * 60 * 1000);
      
      return () => clearInterval(interval);
    }
  }, [updateSession]);

  return {
    trackResourceView,
    trackSearch,
    trackCategoryVisit,
    updateSession
  };
};