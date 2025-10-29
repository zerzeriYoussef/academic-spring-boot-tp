import { Blog } from "./blog.model";

export class Comment {
  id?: number;
  content?: string;
  author?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  blog?: Blog;
}
