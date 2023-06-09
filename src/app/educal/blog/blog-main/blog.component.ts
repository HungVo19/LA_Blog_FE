import {Component, OnInit, ViewChild} from '@angular/core';
import {Blog} from "../../../model/blog";
import {BlogService} from "../../../service/blog.service";
import {BlogAreaComponent} from "../blog-area/blog-area.component";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  @ViewChild(BlogAreaComponent) blogArea!:BlogAreaComponent

  constructor() { }

  ngOnInit(): void {
  }

  CallParentInit() {
    this.ngOnInit();
    this.blogArea.findALlByDeleteStatusIsFalse()
    this.blogArea.showResult = true;
    console.log('test call')
  }
}
