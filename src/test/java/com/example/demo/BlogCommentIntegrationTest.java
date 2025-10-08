package com.example.demo;

import com.example.demo.entity.Blog;
import com.example.demo.entity.Comment;
import com.example.demo.repository.BlogRepository;
import com.example.demo.repository.CommentRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class BlogCommentIntegrationTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Test
    public void testBlogCommentRelationship() {
        // Create a blog
        Blog blog = new Blog();
        blog.setTitle("Test Blog");
        blog.setContent("This is a test blog content");
        blog.setAuthor("Test Author");
        
        // Save blog
        Blog savedBlog = blogRepository.save(blog);
        entityManager.flush();
        entityManager.clear();

        // Create comments
        Comment comment1 = new Comment();
        comment1.setContent("Great blog post!");
        comment1.setAuthor("Reader 1");
        comment1.setEmail("reader1@example.com");
        comment1.setBlog(savedBlog);

        Comment comment2 = new Comment();
        comment2.setContent("Very informative!");
        comment2.setAuthor("Reader 2");
        comment2.setEmail("reader2@example.com");
        comment2.setBlog(savedBlog);

        // Save comments
        commentRepository.save(comment1);
        commentRepository.save(comment2);
        entityManager.flush();
        entityManager.clear();

        // Test the relationship
        Blog foundBlog = blogRepository.findById(savedBlog.getId()).orElse(null);
        assertThat(foundBlog).isNotNull();
        assertThat(foundBlog.getTitle()).isEqualTo("Test Blog");

        List<Comment> comments = commentRepository.findByBlogId(savedBlog.getId());
        assertThat(comments).hasSize(2);
        assertThat(comments.get(0).getContent()).isIn("Great blog post!", "Very informative!");
        assertThat(comments.get(1).getContent()).isIn("Great blog post!", "Very informative!");
    }

    @Test
    public void testBlogWithCommentsQuery() {
        // Create a blog
        Blog blog = new Blog();
        blog.setTitle("Query Test Blog");
        blog.setContent("Testing queries");
        blog.setAuthor("Query Author");
        
        Blog savedBlog = blogRepository.save(blog);
        entityManager.flush();

        // Create a comment
        Comment comment = new Comment();
        comment.setContent("Test comment");
        comment.setAuthor("Comment Author");
        comment.setBlog(savedBlog);
        
        commentRepository.save(comment);
        entityManager.flush();
        entityManager.clear();

        // Test the query
        Blog blogWithComments = blogRepository.findByIdWithComments(savedBlog.getId()).orElse(null);
        assertThat(blogWithComments).isNotNull();
        assertThat(blogWithComments.getComments()).hasSize(1);
        assertThat(blogWithComments.getComments().get(0).getContent()).isEqualTo("Test comment");
    }
}
