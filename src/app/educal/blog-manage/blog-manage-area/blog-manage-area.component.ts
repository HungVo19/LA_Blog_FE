import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../service/blog.service";
import {Blog} from "../../../model/blog";
import {User} from "../../../model/user";

@Component({
  selector: 'app-blog-manage-area',
  templateUrl: './blog-manage-area.component.html',
  styleUrls: ['./blog-manage-area.component.scss']
})
export class BlogManageAreaComponent implements OnInit {
  blogs:Blog[] = [];
  userId!:any;
  user!:User;
  page:number = 1;

  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.userId = this.user.id;

    this.blogService.findByUser(this.userId).subscribe(data=>{
      console.log(data)
      this.blogs = data;
    })
  }

  deleteBlog(id: any) {
    this.blogService.deleteBlogById(id).subscribe(data => {
      this.findAllBlogByUserId(this.userId);
    })
  }

  findAllBlogByUserId(id:number) {
    this.blogService.findByUser(id).subscribe(data=>{
      this.blogs = data;
    })
  }
}
