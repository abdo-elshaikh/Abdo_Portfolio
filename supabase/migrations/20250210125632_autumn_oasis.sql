/*
  # Add demo data

  1. Demo Data for:
    - Personal Info
    - Projects
    - Skills
    - Stats
    - Experiences
    - Contacts
*/

-- Insert demo personal info
INSERT INTO personal_info (name, title, description, email, phone, location, avatar_url)
VALUES (
  'Abdulrahman Mohammed',
  'Senior Software Engineer',
  'Passionate software engineer with expertise in full-stack development, cloud architecture, and modern web technologies. Experienced in building scalable applications and leading development teams.',
  'abdo_mhmd1@hotmail.com',
  '+201067262026',
  'Cairo, Egypt',
  'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=300'
) ON CONFLICT DO NOTHING;

-- Insert demo projects
INSERT INTO projects (title, description, image_url, tags, link) VALUES
('E-commerce Platform', 'A modern e-commerce platform built with React and Node.js, featuring real-time inventory management and secure payment processing.', 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200', ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'https://example.com/ecommerce'),
('Task Management App', 'Collaborative task management application with real-time updates, team chat, and project analytics.', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200', ARRAY['React', 'TypeScript', 'Firebase', 'Tailwind'], 'https://example.com/taskapp'),
('AI Image Generator', 'An AI-powered image generation tool using state-of-the-art machine learning models.', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200', ARRAY['Python', 'TensorFlow', 'React', 'FastAPI'], 'https://example.com/ai-image')
ON CONFLICT DO NOTHING;

-- Insert demo skills
INSERT INTO skills (title, description, icon, technologies) VALUES
('Frontend Development', 'Building responsive and performant user interfaces with modern web technologies.', 'code', ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Next.js']),
('Backend Development', 'Designing and implementing scalable server-side applications and APIs.', 'database', ARRAY['Node.js', 'Python', 'PostgreSQL', 'Redis']),
('Cloud Architecture', 'Deploying and managing cloud infrastructure with best practices.', 'cloud', ARRAY['AWS', 'Docker', 'Kubernetes', 'Terraform'])
ON CONFLICT DO NOTHING;

-- Insert demo stats
INSERT INTO stats (title, value, suffix, icon) VALUES
('Projects Completed', 50, '+', 'check-circle'),
('Happy Clients', 30, '+', 'users'),
('Years Experience', 5, '+', 'calendar')
ON CONFLICT DO NOTHING;

-- Insert demo experiences
INSERT INTO experiences (role, company, period, description, technologies) VALUES
('Senior Software Engineer', 'Tech Innovators Inc.', '2021 - Present', 'Leading development of enterprise-scale applications and mentoring junior developers.', ARRAY['React', 'Node.js', 'AWS', 'Kubernetes']),
('Full Stack Developer', 'Digital Solutions Ltd.', '2019 - 2021', 'Developed and maintained multiple client projects using modern web technologies.', ARRAY['Vue.js', 'Python', 'Docker', 'PostgreSQL']),
('Frontend Developer', 'StartUp Hub', '2018 - 2019', 'Built responsive user interfaces and implemented new features for the main product.', ARRAY['React', 'JavaScript', 'SASS', 'Redux'])
ON CONFLICT DO NOTHING;

-- Insert demo contacts
INSERT INTO contacts (name, email, message) VALUES
('John Doe', 'john@example.com', 'Interested in discussing a potential project collaboration.'),
('Sarah Smith', 'sarah@example.com', 'Looking for a developer to build an e-commerce website.'),
('Mike Johnson', 'mike@example.com', 'Would love to connect regarding a full-stack position.')
ON CONFLICT DO NOTHING;