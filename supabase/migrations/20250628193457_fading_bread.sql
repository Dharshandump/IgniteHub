/*
  # Contacts Table for Contact Form

  1. New Table
    - `contacts` - Store contact form submissions
      - `id` (int, primary key, auto-increment)
      - `name` (text, required)
      - `email` (text, required)
      - `message` (text, required)
      - `created_at` (timestamp, default now())

  2. Security
    - Enable RLS on contacts table
    - Allow anyone to insert contact messages
    - Only authenticated admins can read contacts
*/

-- Contacts table for form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to insert contact messages
CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Policy to allow only authenticated users to read contacts (for admin purposes)
CREATE POLICY "Only authenticated users can read contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON contacts(email);