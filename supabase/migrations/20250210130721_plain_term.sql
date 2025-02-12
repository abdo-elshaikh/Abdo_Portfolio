/*
  # Add is_featured flag to projects table

  1. Changes:
    - Add is_featured boolean column to projects table
    - Update existing projects to set featured flag
*/

-- Add is_featured column
ALTER TABLE projects ADD COLUMN IF NOT EXISTS is_featured boolean DEFAULT false;

-- Update demo projects to be featured
UPDATE projects 
SET is_featured = true 
WHERE title IN (
  'E-commerce Platform',
  'Task Management App',
  'AI Image Generator'
);