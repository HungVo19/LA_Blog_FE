import {User} from "./user";
import {Blog} from "./blog";

export interface Comment {
  id?:number;
  content:string;
  date:Date;
  user:User;
  blog:Blog;
}
