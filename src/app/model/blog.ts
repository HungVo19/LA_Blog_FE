import {User} from "./user";

export interface Blog {
  id?:number;
  title:string;
  description:string;
  content:string;
  image:string;
  createdDate:Date;
  user:User;
  deleteStatus:boolean;
}
