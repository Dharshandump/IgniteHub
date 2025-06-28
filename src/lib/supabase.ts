import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly set
if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('placeholder') || supabaseAnonKey.includes('placeholder')) {
  console.warn('Supabase environment variables not properly configured. Contact form will use fallback email service.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder_anon_key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
    db: {
      schema: 'public',
    },
    realtime: {
      params: {
        eventsPerSecond: 10,
      },
    },
  }
);

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  const isConfigured = supabaseUrl && 
         supabaseAnonKey && 
         !supabaseUrl.includes('placeholder') && 
         !supabaseAnonKey.includes('placeholder') &&
         supabaseUrl.startsWith('https://') &&
         supabaseUrl.includes('.supabase.co');
  
  return isConfigured;
};

// Helper function to test Supabase connection with enhanced error handling
export const testSupabaseConnection = async () => {
  try {
    // Only test if properly configured
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, skipping connection test');
      return false;
    }

    console.log('Testing Supabase connection...');

    // Test with a simple query that should work regardless of RLS
    const { data, error } = await supabase
      .from('contacts')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Supabase connection test failed:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return false;
    }
    
    console.log('Supabase connection test successful');
    return true;
  } catch (error: any) {
    console.error('Supabase connection test error:', {
      name: error.name,
      message: error.message
    });
    
    // Check for specific error types
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error('Network error: Unable to reach Supabase. Check internet connection and URL.');
    } else if (error.message.includes('CORS')) {
      console.error('CORS error: Check Supabase project CORS settings.');
    }
    
    return false;
  }
};

// Database types
export interface ResourceView {
  id: string;
  resource_id: string;
  category_id: string;
  user_id?: string;
  session_id: string;
  ip_address?: string;
  user_agent?: string;
  referrer?: string;
  viewed_at: string;
  duration_seconds: number;
}

export interface SearchAnalytics {
  id: string;
  search_term: string;
  category_id?: string;
  results_count: number;
  user_id?: string;
  session_id: string;
  filters_applied: Record<string, any>;
  searched_at: string;
}

export interface UserProfile {
  id: string;
  display_name?: string;
  bio?: string;
  avatar_url?: string;
  website_url?: string;
  location?: string;
  points: number;
  reviews_count: number;
  helpful_votes_received: number;
  created_at: string;
  updated_at: string;
}

export interface ResourceReview {
  id: string;
  resource_id: string;
  category_id: string;
  user_id: string;
  rating: number;
  title?: string;
  review_text?: string;
  pros?: string[];
  cons?: string[];
  helpful_count: number;
  unhelpful_count: number;
  is_verified: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  user_profiles?: UserProfile;
}

export interface UserCollection {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  is_public: boolean;
  color: string;
  icon: string;
  items_count: number;
  created_at: string;
  updated_at: string;
}

export interface CollectionItem {
  id: string;
  collection_id: string;
  resource_id: string;
  category_id: string;
  notes?: string;
  added_at: string;
}

export interface UserNotification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  data: Record<string, any>;
  is_read: boolean;
  created_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: string;
}