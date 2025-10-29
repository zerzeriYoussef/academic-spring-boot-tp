import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../services/blog.service';
import { Blog } from '../model/blog.model';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  newBlog: Blog = new Blog();
  
  constructor(
    private blogService: BlogService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
  }
  
  addBlog(): void {
    this.blogService.createBlog(this.newBlog).subscribe({
      next: (data) => {
        alert('Blog added successfully!');
        this.router.navigate(['/blogs']);
      },
      error: (err) => {
        console.log(err);
        alert('Error adding blog. Please try again.');
      }
    });
  }
}
