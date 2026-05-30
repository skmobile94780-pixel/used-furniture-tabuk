/*
  # Create site_settings table

  1. New Tables
    - `site_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique) - Setting name e.g. 'whatsapp_number', 'phone_number'
      - `value` (text) - The setting value
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `site_settings` table
    - Anyone can read settings (public website data)
    - Only authenticated users can modify settings

  3. Initial Data
    - whatsapp_number: 966531442546
    - phone_number: 0531442546
    - phone_intl: +966531442546
    - whatsapp_message: Default greeting message
*/

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read site settings"
  ON site_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete site settings"
  ON site_settings
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO site_settings (key, value) VALUES
  ('whatsapp_number', '966531442546'),
  ('phone_number', '0531442546'),
  ('phone_intl', '+966531442546'),
  ('whatsapp_message', 'السلام عليكم، أرغب ببيع أثاث مستعمل بتبوك، هل يمكنكم المعاينة؟')
ON CONFLICT (key) DO NOTHING;
