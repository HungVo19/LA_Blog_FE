import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Blog} from "../../../../model/blog";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {User} from "../../../../model/user";
import {BlogService} from "../../../../service/blog.service";
import {ActivatedRoute, Route, Router, Routes} from "@angular/router";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  blogForm!: FormGroup;
  blog!: Blog;
  public Editor = ClassicEditor as unknown as {
    create: any
  };
  user!: User;
  text: string = "New Post";
  blogId!: number;

  constructor(private blogService: BlogService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.blogForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
    });
    // @ts-ignore
    this.user = JSON.parse(sessionStorage.getItem("user"));

    this.activatedRoute.params.subscribe(params => {
      this.blogId = params['id'];
    })

    if (this.blogId != -1) {
      this.blogService.findById(this.blogId).subscribe(data => {
        this.blogForm.patchValue(data);
      });
      this.text = "Update Post";
    }
  }

  submit() {
    if (this.blogId == -1) {
      this.blog = this.blogForm.value;
      this.blog.user = this.user;
      this.blog.createdDate = new Date();
      this.blog.deleteStatus = false;
      this.blogService.postNewBlog(this.blog).subscribe(data => {
        this.router.navigate(['']).finally();
      })
    } else {
      this.blog = this.blogForm.value;
      this.blog.user = this.user;
      this.blogService.updateBlog(this.blog).subscribe(data =>{
        this.router.navigate(['']).finally();
      })
    }
  }
}
