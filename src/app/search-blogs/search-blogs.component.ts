import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Blog } from '../model/blog.model';

@Component({
  selector: 'app-search-blogs',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './search-blogs.component.html',
  styleUrls: ['./search-blogs.component.css']
})
export class SearchBlogsComponent implements OnInit {
  blogs: Blog[] = [];
  searchTerm: string = '';
  searchMode: string = 'title'; // 'title' or 'author'

  constructor(
    private blogService: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.url.subscribe(url => {
      // Determine search mode based on route
      if (url[0]?.path === 'search-by-author') {
        this.searchMode = 'author';
      } else {
        this.searchMode = 'title';
      }
    });
  }

  onSearch(): void {
    if (this.searchTerm.trim() === '') {
      return;
    }

    if (this.searchMode === 'title') {
      this.searchByTitle();
    } else if (this.searchMode === 'author') {
      this.searchByAuthor();
    }
  }

  searchByTitle(): void {
    this.blogService.searchBlogsByTitle(this.searchTerm).subscribe({
      next: (data) => {
        this.blogs = data;
      },
      error: (err) => {
        console.log(err);
        alert('Error searching blogs');
      }
    });
  }

  searchByAuthor(): void {
    this.blogService.searchBlogsByAuthor(this.searchTerm).subscribe({
      next: (data) => {
        this.blogs = data;
      },
      error: (err) => {
        console.log(err);
        alert('Error searching blogs');
      }
    });
  }

  viewComments(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/blog-comments', id]);
  }

  updateBlog(id: number | undefined): void {
    if (!id) return;
    this.router.navigate(['/update-blog', id]);
  }

  deleteBlog(id: number | undefined): void {
    if (!id) return;
    if(confirm('Are you sure you want to delete this blog?')) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.blogs = this.blogs.filter(b => b.id !== id);
      });
    }
  }
}
