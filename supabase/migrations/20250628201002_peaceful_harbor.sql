/*
  # Community Features and Achievements

  1. New Tables
    - `user_achievements` - Achievement system
    - `user_collections` - Custom resource collections
    - `collection_items` - Items in collections
    - `user_notifications` - Notification system

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- User Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  achievement_data jsonb DEFAULT '{}',
  earned_at timestamptz DEFAULT now(),
  UNIQUE(user_id, achievement_type)
);

-- User Collections
CREATE TABLE IF NOT EXISTS user_collections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  is_public boolean DEFAULT false,
  color text DEFAULT '#8B5CF6',
  icon text DEFAULT '📚',
  items_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Collection Items
CREATE TABLE IF NOT EXISTS collection_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  collection_id uuid REFERENCES user_collections(id) ON DELETE CASCADE NOT NULL,
  resource_id text NOT NULL,
  category_id text NOT NULL,
  notes text,
  added_at timestamptz DEFAULT now(),
  UNIQUE(collection_id, resource_id)
);

-- User Notifications
CREATE TABLE IF NOT EXISTS user_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  data jsonb DEFAULT '{}',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE collection_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_notifications ENABLE ROW LEVEL SECURITY;

-- User Achievements Policies
CREATE POLICY "Users can read own achievements"
  ON user_achievements FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert achievements"
  ON user_achievements FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- User Collections Policies
CREATE POLICY "Users can read own collections"
  ON user_collections FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can read public collections"
  ON user_collections FOR SELECT
  TO anon, authenticated
  USING (is_public = true);

CREATE POLICY "Users can manage own collections"
  ON user_collections FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Collection Items Policies
CREATE POLICY "Users can read items from own collections"
  ON collection_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_collections 
      WHERE id = collection_items.collection_id 
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can read items from public collections"
  ON collection_items FOR SELECT
  TO anon, authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_collections 
      WHERE id = collection_items.collection_id 
      AND is_public = true
    )
  );

CREATE POLICY "Users can manage items in own collections"
  ON collection_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_collections 
      WHERE id = collection_items.collection_id 
      AND user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_collections 
      WHERE id = collection_items.collection_id 
      AND user_id = auth.uid()
    )
  );

-- User Notifications Policies
CREATE POLICY "Users can read own notifications"
  ON user_notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON user_notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications"
  ON user_notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_type ON user_achievements(achievement_type);
CREATE INDEX IF NOT EXISTS idx_user_collections_user_id ON user_collections(user_id);
CREATE INDEX IF NOT EXISTS idx_user_collections_public ON user_collections(is_public);
CREATE INDEX IF NOT EXISTS idx_collection_items_collection_id ON collection_items(collection_id);
CREATE INDEX IF NOT EXISTS idx_collection_items_resource_id ON collection_items(resource_id);
CREATE INDEX IF NOT EXISTS idx_user_notifications_user_id ON user_notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_notifications_read ON user_notifications(is_read);

-- Function to update collection item counts
CREATE OR REPLACE FUNCTION update_collection_item_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE user_collections SET items_count = items_count + 1 WHERE id = NEW.collection_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE user_collections SET items_count = items_count - 1 WHERE id = OLD.collection_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Trigger for collection item counts
CREATE TRIGGER update_collection_item_count_trigger
  AFTER INSERT OR DELETE ON collection_items
  FOR EACH ROW EXECUTE FUNCTION update_collection_item_count();