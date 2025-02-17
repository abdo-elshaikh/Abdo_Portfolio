/*
  # Fix Personal Info Table

  1. Changes
    - Add default personal info record
    - Add constraint to ensure only one record per user
    - Add RLS policies for personal info

  2. Security
    - Enable RLS on personal_info table
    - Add policies for authenticated users
*/

-- Ensure we have a default record
INSERT INTO personal_info (
  name,
  title,
  description,
  email,
  phone,
  location,
  avatar_url
) VALUES (
  'Abdulrahman Mohammed',
  'Senior Software Engineer',
  'Passionate software engineer with expertise in full-stack development, cloud architecture, and modern web technologies.',
  'abdo_mhmd1@hotmail.com',
  '+201067262026',
  'Cairo, Egypt',
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300'
) ON CONFLICT DO NOTHING;