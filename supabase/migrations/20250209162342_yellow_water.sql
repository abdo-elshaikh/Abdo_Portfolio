/*
  # Add portfolio tables

  1. New Tables
    - `personal_info`
    - `contacts`
    - `skills`
    - `stats`
    - `experiences`

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Personal Info Table
CREATE TABLE IF NOT EXISTS personal_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'personal_info' AND policyname = 'Users can view all personal info'
  ) THEN
    CREATE POLICY "Users can view all personal info" 
      ON personal_info FOR SELECT 
      TO authenticated 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'personal_info' AND policyname = 'Users can manage their own personal info'
  ) THEN
    CREATE POLICY "Users can manage their own personal info" 
      ON personal_info FOR ALL 
      TO authenticated 
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Contacts Table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contacts' AND policyname = 'Users can view their received contacts'
  ) THEN
    CREATE POLICY "Users can view their received contacts" 
      ON contacts FOR SELECT 
      TO authenticated 
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'contacts' AND policyname = 'Anyone can create contacts'
  ) THEN
    CREATE POLICY "Anyone can create contacts" 
      ON contacts FOR INSERT 
      TO authenticated 
      WITH CHECK (true);
  END IF;
END $$;

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  icon text NOT NULL,
  technologies text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'skills' AND policyname = 'Users can view all skills'
  ) THEN
    CREATE POLICY "Users can view all skills" 
      ON skills FOR SELECT 
      TO authenticated 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'skills' AND policyname = 'Users can manage their own skills'
  ) THEN
    CREATE POLICY "Users can manage their own skills" 
      ON skills FOR ALL 
      TO authenticated 
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Stats Table
CREATE TABLE IF NOT EXISTS stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  value integer NOT NULL,
  suffix text,
  icon text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'stats' AND policyname = 'Users can view all stats'
  ) THEN
    CREATE POLICY "Users can view all stats" 
      ON stats FOR SELECT 
      TO authenticated 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'stats' AND policyname = 'Users can manage their own stats'
  ) THEN
    CREATE POLICY "Users can manage their own stats" 
      ON stats FOR ALL 
      TO authenticated 
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Experiences Table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL,
  company text NOT NULL,
  period text NOT NULL,
  description text NOT NULL,
  technologies text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'experiences' AND policyname = 'Users can view all experiences'
  ) THEN
    CREATE POLICY "Users can view all experiences" 
      ON experiences FOR SELECT 
      TO authenticated 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'experiences' AND policyname = 'Users can manage their own experiences'
  ) THEN
    CREATE POLICY "Users can manage their own experiences" 
      ON experiences FOR ALL 
      TO authenticated 
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;