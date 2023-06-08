import { Component, OnInit } from '@angular/core';
import {Blog} from "../../../model/blog";
import {BlogService} from "../../../service/blog.service";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogItems:Blog[] = [];

  constructor(private blogService:BlogService) { }

  ngOnInit(): void {
    this.findALlByDeleteStatusIsFalse();
  }

  public findALlByDeleteStatusIsFalse() {
    return this.blogService.findAllByDeleteStatusIsFalse().subscribe(data => {
      this.blogItems = data;
    })
  }

}
