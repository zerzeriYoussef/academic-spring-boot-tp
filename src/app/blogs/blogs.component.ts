import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../model/blog.model';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: Blog[] = [];
  
  constructor(
    private blogService: BlogService,
    private router: Router,
    public authService: AuthService

  ) {}
  
  ngOnInit(): void {
    this.loadBlogs();
  }
  
  loadBlogs(): void {
    this.blogService.getBlogs().subscribe(data => {
      this.blogs = data;
    });
  }
  
  deleteBlog(id: number | undefined): void {
    if (!id) return;
    if(confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.blogs = this.blogs.filter(b => b.id !== id);
      });
    }
  }
  
  updateBlog(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/update-blog', id]);
  }
  
  viewComments(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/blog-comments', id]);
  }
}
