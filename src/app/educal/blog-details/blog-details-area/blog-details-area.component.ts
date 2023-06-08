import {Component, OnInit} from '@angular/core';
import {BlogService} from "../../../service/blog.service";
import {Blog} from "../../../model/blog";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {FormGroup} from "@angular/forms";
import {Comment} from "../../../model/comment";
import {CommentService} from "../../../service/comment.service";

@Component({
  selector: 'app-blog-details-area',
  templateUrl: './blog-details-area.component.html',
  styleUrls: ['./blog-details-area.component.scss']
})
export class BlogDetailsAreaComponent implements OnInit {
  blog!: Blog;
  blogId!: number;
  content: any;
  formCmt!: any;
  user!: any
  comment: string = "";
  listComments: Comment[] = [];

  constructor(private blogService: BlogService,
              private activatedRoute: ActivatedRoute,
              private sanitized: DomSanitizer,
              private cmtService: CommentService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.blogId = param['id'];
      this.findBlogById(this.blogId);
    })

    this.formCmt = new FormGroup({})

    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user"));
    this.getListComments(this.blogId);
  }

  findBlogById(id: number) {
    return this.blogService.findById(id).subscribe(data => {
      this.blog = data;
      this.content = this.sanitized.bypassSecurityTrustHtml(data.content);
    })
  }

  postCmt() {
    console.log(this.comment)
    const cmt: Comment = {
      content: this.comment,
      date: new Date(),
      // @ts-ignore
      user: {
        id: this.user.id
      },
      // @ts-ignore
      blog: {
        id: this.blogId,
      }
    }
    this.cmtService.postAComment(cmt).subscribe(data => {
      this.getListComments(this.blogId);
      this.comment = '';
    })


  }

  getListComments(blogId: number) {
    this.cmtService.findListCommentByBlogId(blogId).subscribe(data => {
      this.listComments = data;
    })
  }

}
