/*
  # User Reviews and Feedback System

  1. New Tables
    - `user_profiles` - Extended user profiles
    - `resource_reviews` - User reviews and ratings
    - `review_votes` - Helpful/unhelpful votes on reviews
    - `resource_reports` - Report issues with resources

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Prevent spam and abuse
*/

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  bio text,
  avatar_url text,
  website_url text,
  location text,
  points integer DEFAULT 0,
  reviews_count integer DEFAULT 0,
  helpful_votes_received integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Resource Reviews
CREATE TABLE IF NOT EXISTS resource_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id text NOT NULL,
  category_id text NOT NULL,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  review_text text,
  pros text[],
  cons text[],
  helpful_count integer DEFAULT 0,
  unhelpful_count integer DEFAULT 0,
  is_verified boolean DEFAULT false,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(resource_id, user_id)
);

-- Review Votes (helpful/unhelpful)
CREATE TABLE IF NOT EXISTS review_votes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES resource_reviews(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  is_helpful boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(review_id, user_id)
);

-- Resource Reports
CREATE TABLE IF NOT EXISTS resource_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id text NOT NULL,
  category_id text NOT NULL,
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  report_type text NOT NULL CHECK (report_type IN ('broken_link', 'outdated', 'inappropriate', 'spam', 'other')),
  description text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved', 'dismissed')),
  admin_notes text,
  created_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_reports ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can read all profiles"
  ON user_profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Resource Reviews Policies
CREATE POLICY "Anyone can read reviews"
  ON resource_reviews FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reviews"
  ON resource_reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON resource_reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON resource_reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Review Votes Policies
CREATE POLICY "Anyone can read review votes"
  ON review_votes FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can vote on reviews"
  ON review_votes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own votes"
  ON review_votes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own votes"
  ON review_votes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Resource Reports Policies
CREATE POLICY "Users can read own reports"
  ON resource_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can create reports"
  ON resource_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_resource_reviews_resource_id ON resource_reviews(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_reviews_user_id ON resource_reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_resource_reviews_rating ON resource_reviews(rating);
CREATE INDEX IF NOT EXISTS idx_resource_reviews_created_at ON resource_reviews(created_at);
CREATE INDEX IF NOT EXISTS idx_review_votes_review_id ON review_votes(review_id);
CREATE INDEX IF NOT EXISTS idx_resource_reports_resource_id ON resource_reports(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_reports_status ON resource_reports(status);

-- Functions to update counters
CREATE OR REPLACE FUNCTION update_review_vote_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    IF NEW.is_helpful THEN
      UPDATE resource_reviews SET helpful_count = helpful_count + 1 WHERE id = NEW.review_id;
    ELSE
      UPDATE resource_reviews SET unhelpful_count = unhelpful_count + 1 WHERE id = NEW.review_id;
    END IF;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_helpful != NEW.is_helpful THEN
      IF NEW.is_helpful THEN
        UPDATE resource_reviews SET helpful_count = helpful_count + 1, unhelpful_count = unhelpful_count - 1 WHERE id = NEW.review_id;
      ELSE
        UPDATE resource_reviews SET helpful_count = helpful_count - 1, unhelpful_count = unhelpful_count + 1 WHERE id = NEW.review_id;
      END IF;
    END IF;
  ELSIF TG_OP = 'DELETE' THEN
    IF OLD.is_helpful THEN
      UPDATE resource_reviews SET helpful_count = helpful_count - 1 WHERE id = OLD.review_id;
    ELSE
      UPDATE resource_reviews SET unhelpful_count = unhelpful_count - 1 WHERE id = OLD.review_id;
    END IF;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_review_vote_counts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON review_votes
  FOR EACH ROW EXECUTE FUNCTION update_review_vote_counts();