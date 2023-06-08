import { Component, OnInit } from '@angular/core';
import {User} from "../../../model/user";
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-sign-in-area',
  templateUrl: './sign-in-area.component.html',
  styleUrls: ['./sign-in-area.component.scss']
})
export class SignInAreaComponent implements OnInit {
  user!:User;
  form!:FormGroup;
  inputType = 'password';


  constructor(private service:UserService,
              private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username:new FormControl('',Validators.required),
      password:new FormControl('',Validators.required)
    })
  }

  onSubmit() {
    this.user = this.form.value;
    this.service.checkLogin(this.user).subscribe(data=>{
      console.log(data)
      if(data.id != null) {
        sessionStorage.setItem("user",JSON.stringify(data));
        this.router.navigate(['home']).finally();
      } else {
        this.form.reset();
      }
    })

  }

  showPass(event: any) {
    if (event.target.checked) {
      this.inputType = 'text'
    } else {
      this.inputType = 'password';
    }
  }
}
