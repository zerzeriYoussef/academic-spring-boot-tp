package com.example.demo.repository;

import com.example.demo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    // Find comments by blog ID
    List<Comment> findByBlogId(Long blogId);
    
    // Find comments by author
    List<Comment> findByAuthor(String author);
    
    // Find comments by email
    List<Comment> findByEmail(String email);
    
    // Find comments by blog ID ordered by creation date
    @Query("SELECT c FROM Comment c WHERE c.blog.id = :blogId ORDER BY c.createdAt DESC")
    List<Comment> findByBlogIdOrderByCreatedAtDesc(@Param("blogId") Long blogId);
    
    // Count comments by blog ID
    long countByBlogId(Long blogId);
}
