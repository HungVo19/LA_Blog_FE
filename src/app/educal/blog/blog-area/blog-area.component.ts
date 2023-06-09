import {Component, OnInit} from '@angular/core';
import {Blog} from "../../../model/blog";
import {BlogService} from "../../../service/blog.service";
import {NgxMasonryOptions} from "ngx-masonry";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-blog-area',
  templateUrl: './blog-area.component.html',
  styleUrls: ['./blog-area.component.scss']
})
export class BlogAreaComponent implements OnInit {


  blogItems: Blog[] = [];
  blogData: Blog[] = [];
  backToTop: boolean = false;
  searchLength: number = 0;
  recentBlog: Blog[] = []
  search!: FormGroup;
  showResult = true;
  keyword!: string;

  constructor(private blogService: BlogService) {
  }

  ngOnInit(): void {
    this.search = new FormGroup({
      keyword: new FormControl('')
    })

    this.findALlByDeleteStatusIsFalse();

    const button = document.getElementById("backToTop") as HTMLButtonElement;
    button.hidden = true;
  }

  public findALlByDeleteStatusIsFalse() {
    return this.blogService.findAllByDeleteStatusIsFalse().subscribe(data => {
      this.blogData = data;
      this.blogItems = this.blogData.splice(0, 3);
      this.recentBlog = data.slice(0, 4)
      console.log(this.recentBlog)
    })
  }

  searchBlog() {
    this.keyword = this.search.get('keyword')?.value;
    this.search.reset();
    return this.blogService.search(this.keyword).subscribe(data => {
      this.showResult = false;
      this.blogData = data;
      this.searchLength = this.blogData.length;
      this.blogItems = this.blogData.splice(0, 3);
    });
  }

  showMore() {
    if (this.blogData.length != 0) {
      this.blogItems = this.blogItems.concat(this.blogData.splice(0, 2));
    }
    if (this.blogData.length == 0) {
      const button1 = document.getElementById("showMore") as HTMLButtonElement;
      button1.hidden = true;
      this.backToTop = false;
    }
  }

  toTop() {
    window.scrollTo(0, 0);
  }


}
