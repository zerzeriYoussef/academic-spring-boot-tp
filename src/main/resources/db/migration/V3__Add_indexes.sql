-- Add indexes for better performance
CREATE INDEX idx_blogs_author ON blogs(author);
CREATE INDEX idx_blogs_created_at ON blogs(created_at);
CREATE INDEX idx_comments_blog_id ON comments(blog_id);
CREATE INDEX idx_comments_author ON comments(author);
CREATE INDEX idx_comments_created_at ON comments(created_at);
