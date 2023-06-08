import { Component, OnInit } from '@angular/core';
import {Blog} from "../../../model/blog";
import {BlogService} from "../../../service/blog.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-blog-details-title',
  templateUrl: './blog-details-title.component.html',
  styleUrls: ['./blog-details-title.component.scss']
})
export class BlogDetailsTitleComponent implements OnInit {

  blog!:Blog;
  blogId!:number;
  content: any;

  constructor(private service:BlogService,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.blogId = param['id'];
      this.findById(this.blogId);
    })
  }

  findById(id:number) {
    return this.service.findById(id).subscribe(data=> {
      this.blog = data;
    })
  }

}
