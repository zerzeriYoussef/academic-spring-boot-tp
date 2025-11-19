import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../model/blog.model';
import { Comment } from '../model/comment.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  apiURL: string = environment.apiURL + '/blogs';
  apiURLComments: string = environment.apiURL + '/comments';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // ========== BLOG METHODS ==========

  getBlogs(): Observable<Blog[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Blog[]>(this.apiURL, { headers: httpHeaders });
  }

  getBlogsWithComments(): Observable<Blog[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Blog[]>(`${this.apiURL}/with-comments`, { headers: httpHeaders });
  }

  getBlogById(id: number): Observable<Blog> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Blog>(url, { headers: httpHeaders });
  }

  getBlogByIdWithComments(id: number): Observable<Blog> {
    const url = `${this.apiURL}/${id}/with-comments`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Blog>(url, { headers: httpHeaders });
  }

  createBlog(blog: Blog): Observable<Blog> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Blog>(this.apiURL, blog, { headers: httpHeaders });
  }

  updateBlog(blog: Blog): Observable<Blog> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.put<Blog>(`${this.apiURL}/${blog.id}`, blog, { headers: httpHeaders });
  }

  deleteBlog(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.delete<void>(url, { headers: httpHeaders });
  }

  // ========== COMMENT METHODS ==========

  getComments(): Observable<Comment[]> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Comment[]>(this.apiURLComments, { headers: httpHeaders });
  }

  getCommentById(id: number): Observable<Comment> {
    const url = `${this.apiURLComments}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Comment>(url, { headers: httpHeaders });
  }

  getCommentsByBlogId(blogId: number): Observable<Comment[]> {
    const url = `${this.apiURLComments}/blog/${blogId}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Comment[]>(url, { headers: httpHeaders });
  }

  getCommentsByBlogIdOrdered(blogId: number): Observable<Comment[]> {
    const url = `${this.apiURLComments}/blog/${blogId}/ordered`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Comment[]>(url, { headers: httpHeaders });
  }

  createComment(blogId: number, comment: Comment): Observable<Comment> {
    const url = `${this.apiURLComments}/blog/${blogId}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.post<Comment>(url, comment, { headers: httpHeaders });
  }

  updateComment(comment: Comment): Observable<Comment> {
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.put<Comment>(`${this.apiURLComments}/${comment.id}`, comment, { headers: httpHeaders });
  }

  deleteComment(id: number): Observable<void> {
    const url = `${this.apiURLComments}/${id}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.delete<void>(url, { headers: httpHeaders });
  }

  // ========== SEARCH METHODS ==========

  searchBlogsByAuthor(author: string): Observable<Blog[]> {
    const url = `${this.apiURL}/author/${author}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Blog[]>(url, { headers: httpHeaders });
  }

  searchBlogsByTitle(keyword: string): Observable<Blog[]> {
    const url = `${this.apiURL}/search?keyword=${keyword}`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<Blog[]>(url, { headers: httpHeaders });
  }

  countCommentsByBlogId(blogId: number): Observable<number> {
    const url = `${this.apiURLComments}/blog/${blogId}/count`;
    let jwt = this.authService.getToken();
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt });
    return this.http.get<number>(url, { headers: httpHeaders });
  }
}
