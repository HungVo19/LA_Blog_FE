import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Blog} from "../../../model/blog";
import {BlogService} from "../../../service/blog.service";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";


@Component({
  selector: 'app-blog-area',
  templateUrl: './blog-area.component.html',
  styleUrls: ['./blog-area.component.scss']
})
export class BlogAreaComponent implements OnInit {

  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent | undefined;


  blogItems: Blog[] = [];
  blogData: Blog[] = [];
  backToTop: boolean = false;

  public masonryOptions: NgxMasonryOptions = {
    // @ts-ignore
    transitionDuration: '1.2s',
    gutter: 10,
    resize: true,
    initLayout: true,
    fitWidth: true,
    horizontalOrder: true,
    itemSelector: '.masonryItem',
    percentPosition: true,
  };

  constructor(private blogService: BlogService,
              private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.findALlByDeleteStatusIsFalse();
    const button = document.getElementById("backToTop") as HTMLButtonElement;
    button.hidden = true;
  }

  public findALlByDeleteStatusIsFalse() {
    return this.blogService.findAllByDeleteStatusIsFalse().subscribe(data => {
      this.blogData = data;
      this.blogItems = this.blogData.splice(0, 3);
    })
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
