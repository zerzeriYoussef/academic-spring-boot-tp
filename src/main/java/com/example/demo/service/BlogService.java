package com.example.demo.service;

import com.example.demo.entity.Blog;
import com.example.demo.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class BlogService {
    
    private final BlogRepository blogRepository;
    
    // Create a new blog
    public Blog createBlog(Blog blog) {
        return blogRepository.save(blog);
    }
    
    // Get all blogs
    @Transactional(readOnly = true)
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }
    
    // Get all blogs with comments
    @Transactional(readOnly = true)
    public List<Blog> getAllBlogsWithComments() {
        return blogRepository.findAllWithComments();
    }
    
    // Get blog by ID
    @Transactional(readOnly = true)
    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }
    
    // Get blog by ID with comments
    @Transactional(readOnly = true)
    public Optional<Blog> getBlogByIdWithComments(Long id) {
        return blogRepository.findByIdWithComments(id);
    }
    
    // Update blog
    public Blog updateBlog(Long id, Blog blogDetails) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));
        
        blog.setTitle(blogDetails.getTitle());
        blog.setContent(blogDetails.getContent());
        blog.setAuthor(blogDetails.getAuthor());
        
        return blogRepository.save(blog);
    }
    
    // Delete blog
    public void deleteBlog(Long id) {
        Blog blog = blogRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Blog not found with id: " + id));
        blogRepository.delete(blog);
    }
    
    // Find blogs by author
    @Transactional(readOnly = true)
    public List<Blog> getBlogsByAuthor(String author) {
        return blogRepository.findByAuthor(author);
    }
    
    // Search blogs by title
    @Transactional(readOnly = true)
    public List<Blog> searchBlogsByTitle(String keyword) {
        return blogRepository.findByTitleContainingIgnoreCase(keyword);
    }
    
    // Check if blog exists
    @Transactional(readOnly = true)
    public boolean blogExists(Long id) {
        return blogRepository.existsById(id);
    }
}
