import { Comment } from "./comment.model";

export class Blog {
  id?: number;
  title?: string;
  content?: string;
  author?: string;
  createdAt?: Date;
  updatedAt?: Date;
  comments?: Comment[];
}
