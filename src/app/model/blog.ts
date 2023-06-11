import {User} from "./user";
import {Comment} from "./comment";

export interface Blog {
  id?:number;
  title:string;
  description:string;
  content:string;
  image:string;
  createdDate:Date;
  user:User;
  deleteStatus:boolean;
  comments?:Comment[];
}
