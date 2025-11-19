package com.example.demo.service;

import com.example.demo.entity.Blog;
import com.example.demo.entity.Comment;
import com.example.demo.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {
    
    private final CommentRepository commentRepository;
    private final BlogService blogService;
    
    // Create a new comment
    public Comment createComment(Long blogId, Comment comment) {
        // Create a minimal blog object with just the ID
        Blog blog = new Blog();
        blog.setId(blogId);
        comment.setBlog(blog);
        
        return commentRepository.save(comment);
    }
    
    // Get all comments
    @Transactional(readOnly = true)
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }
    
    // Get comment by ID
    @Transactional(readOnly = true)
    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }
    
    // Get comments by blog ID
    @Transactional(readOnly = true)
    public List<Comment> getCommentsByBlogId(Long blogId) {
        return commentRepository.findByBlogId(blogId);
    }
    
    // Get comments by blog ID ordered by creation date
    @Transactional(readOnly = true)
    public List<Comment> getCommentsByBlogIdOrderByCreatedAt(Long blogId) {
        return commentRepository.findByBlogIdOrderByCreatedAtDesc(blogId);
    }
    
    // Update comment
    public Comment updateComment(Long id, Comment commentDetails) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
        
        comment.setContent(commentDetails.getContent());
        comment.setAuthor(commentDetails.getAuthor());
        comment.setEmail(commentDetails.getEmail());
        comment.setBlog(commentDetails.getBlog());
        return commentRepository.save(comment);
    }
    
    // Delete comment
    public void deleteComment(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + id));
        commentRepository.delete(comment);
    }
    
    // Find comments by author
    @Transactional(readOnly = true)
    public List<Comment> getCommentsByAuthor(String author) {
        return commentRepository.findByAuthor(author);
    }
    
    // Find comments by email
    @Transactional(readOnly = true)
    public List<Comment> getCommentsByEmail(String email) {
        return commentRepository.findByEmail(email);
    }
    
    // Count comments by blog ID
    @Transactional(readOnly = true)
    public long countCommentsByBlogId(Long blogId) {
        return commentRepository.countByBlogId(blogId);
    }
    
    // Check if comment exists
    @Transactional(readOnly = true)
    public boolean commentExists(Long id) {
        return commentRepository.existsById(id);
    }
}
