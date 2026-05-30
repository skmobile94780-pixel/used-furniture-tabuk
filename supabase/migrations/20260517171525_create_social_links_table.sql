/*
  # Create social_links table

  1. New Tables
    - `social_links`
      - `id` (uuid, primary key)
      - `platform` (text, unique) - Platform name e.g. 'instagram', 'snapchat', 'tiktok', 'whatsapp'
      - `url` (text) - The full URL to the social media profile
      - `display_order` (integer, default 0) - Controls the order links appear in the UI
      - `is_active` (boolean, default true) - Toggle visibility without deleting
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `social_links` table
    - Add SELECT policy for anonymous users (public data)
    - INSERT/UPDATE/DELETE restricted to authenticated users

  3. Notes
    - Social links are public-facing data, so anonymous SELECT is appropriate
    - Only authenticated admin users can modify the links
*/

CREATE TABLE IF NOT EXISTS social_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  platform text UNIQUE NOT NULL,
  url text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active social links"
  ON social_links
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can insert social links"
  ON social_links
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update social links"
  ON social_links
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete social links"
  ON social_links
  FOR DELETE
  TO authenticated
  USING (true);

-- Seed initial social media links
INSERT INTO social_links (platform, url, display_order, is_active) VALUES
  ('instagram', 'https://instagram.com', 1, true),
  ('snapchat', 'https://snapchat.com', 2, true),
  ('tiktok', 'https://tiktok.com', 3, true),
  ('whatsapp', '', 4, true)
ON CONFLICT (platform) DO NOTHING;
