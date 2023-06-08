import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Blog} from "../model/blog";
import {Comment} from "../model/comment";

const url = "http://localhost:8080/comments";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  public postAComment(comment:Comment) {
    return this.http.post(url,comment);
  }

  public findListCommentByBlogId(blogId:number) {
    return this.http.get<Comment[]>(url+"/"+blogId);
  }
}
