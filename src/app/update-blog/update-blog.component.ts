import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../model/blog.model';

@Component({
  selector: 'app-update-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.css']
})
export class UpdateBlogComponent implements OnInit {
  currentBlog: Blog = new Blog();
  blogId: number = 0;
  
  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.blogId = +params['id'];
      this.loadBlog();
    });
  }
  
  loadBlog(): void {
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (data) => {
        this.currentBlog = data;
      },
      error: (err) => {
        console.log(err);
        alert('Error loading blog');
      }
    });
  }
  
  updateBlog(): void {
    this.blogService.updateBlog(this.currentBlog).subscribe({
      next: (data) => {
        alert('Blog updated successfully!');
        this.router.navigate(['/blogs']);
      },
      error: (err) => {
        console.log(err);
        alert('Error updating blog. Please try again.');
      }
    });
  }
}
