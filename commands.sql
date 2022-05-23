-- Create blogs table
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author TEXT,
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);
-- Insert two example blogs to blogs table
INSERT INTO blogs(author, url, title)
VALUES ('Jon1VK', 'example.com/blogs/1', 'Blog 1'),
  ('Jon1VK', 'example.com/blogs/2', 'Blog 2');