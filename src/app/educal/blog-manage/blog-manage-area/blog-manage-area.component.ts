import { Component, OnInit } from '@angular/core';
import {BlogService} from "../../../service/blog.service";
import {Blog} from "../../../model/blog";
import {User} from "../../../model/user";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarModule,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";


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

  constructor(private blogService:BlogService,
              private snackBar: MatSnackBar,
              private dialog:MatDialog) { }

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
    this.openDeleteDialog(id);
  }

  findAllBlogByUserId(id:number) {
    this.blogService.findByUser(id).subscribe(data=>{
      this.blogs = data;
    })
  }

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar() {
    this.snackBar.open('Delete Successfully!!', '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration:5000
    });
  }

  openDeleteDialog(id:any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.blogService.deleteBlogById(id).subscribe(data => {
          this.findAllBlogByUserId(this.userId);
          this.openSnackBar();
        })
      }
    });
  }
}
