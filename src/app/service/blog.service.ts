import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Blog} from "../model/blog";

const url = "http://localhost:8080/blogs";

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  public findAllByDeleteStatusIsFalse() {
    return this.http.get<Blog[]>(url);
  }

  public findById(id:number) {
    return this.http.get<Blog>(url + "/" + id);
  }

  public postNewBlog(blog:Blog) {
    return this.http.post(url,blog);
  }

  public findByUser(userId:number) {
    return this.http.get<Blog[]>(url + "/users/" + userId);
  }

  public deleteBlogById(id:number) {
    return this.http.put<Blog>(url + "/delete/"+ id,id);
  }

  public updateBlog(blog:Blog) {
    return this.http.put<Blog>(url,blog);
  }

  public search(keyword:string) {
    return this.http.get<Blog[]>(url + "/search?q=" + keyword);
  }
}
