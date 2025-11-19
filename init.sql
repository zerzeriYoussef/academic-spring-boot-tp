-- Initialize database
USE demo;

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    author VARCHAR(100),
    email VARCHAR(100),
    blog_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_blogs_author ON blogs(author);
CREATE INDEX IF NOT EXISTS idx_blogs_created_at ON blogs(created_at);
CREATE INDEX IF NOT EXISTS idx_comments_blog_id ON comments(blog_id);
CREATE INDEX IF NOT EXISTS idx_comments_author ON comments(author);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);

-- Insert sample data
INSERT INTO blogs (title, content, author) VALUES 
('Welcome to My Blog', 'This is my first blog post. I will be sharing my thoughts on technology and programming here.', 'John Doe'),
('Spring Boot Tutorial', 'In this post, I will show you how to create a REST API using Spring Boot.', 'Jane Smith');

INSERT INTO comments (content, author, email, blog_id) VALUES 
('Great first post! Looking forward to more content.', 'Alice Johnson', 'alice@example.com', 1),
('Very informative tutorial. Thank you for sharing!', 'Bob Wilson', 'bob@example.com', 2);
