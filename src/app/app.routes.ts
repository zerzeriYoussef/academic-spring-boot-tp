import { Routes } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { UpdateBlogComponent } from './update-blog/update-blog.component';
import { BlogCommentsComponent } from './blog-comments/blog-comments.component';
import { SearchBlogsComponent } from './search-blogs/search-blogs.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { livreGuard } from './livre.guard';
export const routes: Routes = [
  { path: "blogs", component: BlogsComponent },
  { path: "add-blog", component: AddBlogComponent, canActivate: [livreGuard] },
  { path: "update-blog/:id", component: UpdateBlogComponent, canActivate: [livreGuard] },
  { path: "blog-comments/:id", component: BlogCommentsComponent },
  { path: "search-by-title", component: SearchBlogsComponent },
  { path: "search-by-author", component: SearchBlogsComponent },
  { path: "login", component: LoginComponent },
  { path: "app-forbidden", component: ForbiddenComponent },
  { path: "", redirectTo: "blogs", pathMatch: "full" }
];
