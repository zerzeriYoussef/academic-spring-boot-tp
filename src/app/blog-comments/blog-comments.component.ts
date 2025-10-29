import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../model/blog.model';
import { Comment } from '../model/comment.model';

@Component({
  selector: 'app-blog-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './blog-comments.component.html',
  styleUrls: ['./blog-comments.component.css']
})
export class BlogCommentsComponent implements OnInit {
  blog: Blog = new Blog();
  comments: Comment[] = [];
  newComment: Comment = new Comment();
  blogId: number = 0;
  successMessage: string = '';
  showSuccess: boolean = false;
  newCommentId: number | undefined = undefined;
  
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = +params['id'];
      this.loadBlog();
      this.loadComments();
    });
  }
  
  loadBlog(): void {
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (data) => {
        this.blog = data;
      },
      error: (err) => {
        console.log(err);
        alert('Error loading blog');
      }
    });
  }
  
  loadComments(): void {
    this.blogService.getCommentsByBlogId(this.blogId).subscribe({
      next: (data) => {
        this.comments = data;
      },
      error: (err) => {
        console.log(err);
        alert('Error loading comments');
      }
    });
  }
  
  addComment(): void {
    if (!this.newComment.content) {
      alert('Comment content is required');
      return;
    }
    
    this.blogService.createComment(this.blogId, this.newComment).subscribe({
      next: (data) => {
        // Add to the beginning of the array to show the new comment at the top
        this.comments.unshift(data);
        this.newComment = new Comment();
        
        // Store new comment ID for highlighting
        this.newCommentId = data.id;
        
        // Show success message
        this.successMessage = 'Comment added successfully!';
        this.showSuccess = true;
        
        // Auto-hide the message and highlight after 5 seconds
        setTimeout(() => {
          this.showSuccess = false;
          this.newCommentId = undefined;
        }, 5000);
      },
      error: (err) => {
        console.log(err);
        alert('Error adding comment');
      }
    });
  }
  
  deleteComment(id: number | undefined): void {
    if (!id) return;
    if(confirm('Are you sure you want to delete this comment?')) {
      this.blogService.deleteComment(id).subscribe({
        next: () => {
          this.comments = this.comments.filter(c => c.id !== id);
        },
        error: (err) => {
          console.log(err);
          alert('Error deleting comment');
        }
      });
    }
  }
}
