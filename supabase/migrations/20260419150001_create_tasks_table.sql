/*
  # Create tasks table

  1. New Tables
    - `tasks`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `description` (text)
      - `priority` (text: low, medium, high)
      - `completed` (boolean)
      - `due_date` (timestamptz, nullable)
      - `created_at` (timestamptz)
  2. Security
    - Enable RLS on `tasks` table
    - Public read/write policies for demo (anon access)
*/

CREATE TABLE IF NOT EXISTS tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  priority text NOT NULL DEFAULT 'medium',
  completed boolean NOT NULL DEFAULT false,
  due_date timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view tasks"
  ON tasks FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert tasks"
  ON tasks FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can update tasks"
  ON tasks FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete tasks"
  ON tasks FOR DELETE
  TO anon, authenticated
  USING (true);
