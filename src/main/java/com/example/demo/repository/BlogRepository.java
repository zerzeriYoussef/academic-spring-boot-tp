package com.example.demo.repository;

import com.example.demo.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    
    // Find blogs by author
    List<Blog> findByAuthor(String author);
    
    // Find blogs by title containing keyword
    List<Blog> findByTitleContainingIgnoreCase(String keyword);
    
    // Find blogs with comments count
    @Query("SELECT b FROM Blog b LEFT JOIN FETCH b.comments WHERE b.id = :id")
    Optional<Blog> findByIdWithComments(@Param("id") Long id);
    
    // Find all blogs with their comments
    @Query("SELECT DISTINCT b FROM Blog b LEFT JOIN FETCH b.comments")
    List<Blog> findAllWithComments();
}
