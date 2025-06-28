/*
  # Analytics and User Tracking System

  1. New Tables
    - `resource_views` - Track resource clicks and views
    - `search_analytics` - Monitor search patterns
    - `category_analytics` - Track category visits
    - `user_sessions` - Track user sessions and journeys

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and anonymous users
    - Track both authenticated and anonymous usage
*/

-- Resource Views Tracking
CREATE TABLE IF NOT EXISTS resource_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id text NOT NULL,
  category_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  session_id text NOT NULL,
  ip_address inet,
  user_agent text,
  referrer text,
  viewed_at timestamptz DEFAULT now(),
  duration_seconds integer DEFAULT 0
);

-- Search Analytics
CREATE TABLE IF NOT EXISTS search_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  search_term text NOT NULL,
  category_id text,
  results_count integer NOT NULL DEFAULT 0,
  user_id uuid REFERENCES auth.users(id),
  session_id text NOT NULL,
  filters_applied jsonb DEFAULT '{}',
  searched_at timestamptz DEFAULT now()
);

-- Category Analytics
CREATE TABLE IF NOT EXISTS category_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  session_id text NOT NULL,
  time_spent_seconds integer DEFAULT 0,
  resources_viewed integer DEFAULT 0,
  visited_at timestamptz DEFAULT now()
);

-- User Sessions
CREATE TABLE IF NOT EXISTS user_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text UNIQUE NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  ip_address inet,
  user_agent text,
  started_at timestamptz DEFAULT now(),
  last_activity timestamptz DEFAULT now(),
  page_views integer DEFAULT 0,
  total_duration_seconds integer DEFAULT 0
);

-- Enable RLS
ALTER TABLE resource_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE category_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Policies for resource_views
CREATE POLICY "Anyone can insert resource views"
  ON resource_views FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own resource views"
  ON resource_views FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for search_analytics
CREATE POLICY "Anyone can insert search analytics"
  ON search_analytics FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own search analytics"
  ON search_analytics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for category_analytics
CREATE POLICY "Anyone can insert category analytics"
  ON category_analytics FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can read own category analytics"
  ON category_analytics FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for user_sessions
CREATE POLICY "Anyone can insert/update sessions"
  ON user_sessions FOR ALL
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_resource_views_resource_id ON resource_views(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_views_category_id ON resource_views(category_id);
CREATE INDEX IF NOT EXISTS idx_resource_views_viewed_at ON resource_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_search_analytics_search_term ON search_analytics(search_term);
CREATE INDEX IF NOT EXISTS idx_search_analytics_searched_at ON search_analytics(searched_at);
CREATE INDEX IF NOT EXISTS idx_category_analytics_category_id ON category_analytics(category_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON user_sessions(session_id);