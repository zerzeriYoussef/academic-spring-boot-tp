import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../model/blog.model';
import { Comment } from '../model/comment.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  apiURL: string = environment.apiURL + '/blogs';
  apiURLComments: string = environment.apiURL + '/comments';

  constructor(private http: HttpClient) { }

  // ========== BLOG METHODS ==========

  getBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiURL, httpOptions);
  }

  getBlogsWithComments(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiURL}/with-comments`, httpOptions);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiURL}/${id}`, httpOptions);
  }

  getBlogByIdWithComments(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiURL}/${id}/with-comments`, httpOptions);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.apiURL, blog, httpOptions);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiURL}/${blog.id}`, blog, httpOptions);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`, httpOptions);
  }

  // ========== COMMENT METHODS ==========

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.apiURLComments, httpOptions);
  }

  getCommentById(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiURLComments}/${id}`, httpOptions);
  }

  getCommentsByBlogId(blogId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiURLComments}/blog/${blogId}`, httpOptions);
  }

  getCommentsByBlogIdOrdered(blogId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiURLComments}/blog/${blogId}/ordered`, httpOptions);
  }

  createComment(blogId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiURLComments}/blog/${blogId}`, comment, httpOptions);
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiURLComments}/${comment.id}`, comment, httpOptions);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURLComments}/${id}`, httpOptions);
  }

  // ========== SEARCH METHODS ==========

  searchBlogsByAuthor(author: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiURL}/author/${author}`, httpOptions);
  }

  searchBlogsByTitle(keyword: string): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiURL}/search?keyword=${keyword}`, httpOptions);
  }

  countCommentsByBlogId(blogId: number): Observable<number> {
    return this.http.get<number>(`${this.apiURLComments}/blog/${blogId}/count`, httpOptions);
  }
}
