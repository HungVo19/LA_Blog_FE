import {Component, EventEmitter, OnInit, Output, ViewChild,} from '@angular/core';
import {BlogService} from "../../../service/blog.service";
import {Blog} from "../../../model/blog";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-blog-sidebar',
  templateUrl: './blog-sidebar.component.html',
  styleUrls: ['./blog-sidebar.component.scss']
})
export class BlogSidebarComponent implements OnInit {
  recentBlog:Blog[] = []
  search!:FormGroup;

  constructor(private blogService:BlogService,
              private activatedRoute:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.blogService.findAllByDeleteStatusIsFalse().subscribe(data=> {
      this.recentBlog = data.splice(0,3)
    })
    this.search = new FormGroup({
      search:new FormControl('')
    })
  }

  searchBlog() {
    const keyword = this.search.get('search')?.value;
    sessionStorage.setItem("keyword",keyword);
    this.router.navigateByUrl('');
  }
}
