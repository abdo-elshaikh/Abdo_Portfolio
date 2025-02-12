/*
  # Add projects table

  1. New Tables
    - `projects` - Store project information
      - id (uuid, primary key)
      - user_id (uuid, foreign key to auth.users)
      - title (text)
      - description (text)
      - image_url (text)
      - tags (text array)
      - link (text, optional)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for viewing and managing projects
*/

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  tags text[] DEFAULT '{}',
  link text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users can view all projects'
  ) THEN
    CREATE POLICY "Users can view all projects" 
      ON projects FOR SELECT 
      TO authenticated 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'projects' AND policyname = 'Users can manage their own projects'
  ) THEN
    CREATE POLICY "Users can manage their own projects" 
      ON projects FOR ALL 
      TO authenticated 
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;