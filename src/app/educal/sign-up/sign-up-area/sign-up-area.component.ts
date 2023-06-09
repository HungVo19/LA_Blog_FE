import {Component, OnInit} from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up-area',
  templateUrl: './sign-up-area.component.html',
  styleUrls: ['./sign-up-area.component.scss']
})
export class SignUpAreaComponent implements OnInit {
  pathName: any;
  path!: any;
  imageFile!: any;
  signUpForm!: FormGroup;
  repassword: string = '';
  inputType: string = 'password';
  checkUserNameExist!:any;
  showUsernameNotAvail = false;
  user!:User;

  constructor(private storage: AngularFireStorage,
              private userService: UserService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl(null, Validators.required),
      repassword: new FormControl(null, Validators.required)
    },{validators:this.checkConfirmPass},)
  }

  previewAvatar(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.imageFile = event.target.files[0];
      if (this.pathName !== this.imageFile.name) {
        this.pathName = this.imageFile.name;
        const path = `image/${this.imageFile.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(path);
        this.storage.upload(path, this.imageFile).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.path = url;
            })
          })
        ).subscribe()
      }
    }
  }

  submit() {
    const username = this.signUpForm.get('username')?.value;
    const password = this.signUpForm.get('password')?.value;
    this.userService.checkUserExists(username).subscribe(data => {
      this.checkUserNameExist = data;
      console.log(this.checkUserNameExist);
    })
    if(this.checkUserNameExist) {
      this.signUpForm.reset();
      this.showUsernameNotAvail = true;
      return;
    }
    if(this.path != null) {
     this.user = {
       username:username,
       password:password,
       avatar:this.path
     }
    } else {
      this.user = {
        username:username,
        password:password,
      }
    }
    this.userService.createNewUser(this.user).subscribe(data=> {
      // sessionStorage.setItem("user",JSON.stringify(data));
      this.router.navigate(['sign-in']).finally();
    })
  }

  showPass(event: any) {
    if (event.target.checked) {
      this.inputType = 'text'
    } else {
      this.inputType = 'password';
    }
  }

  checkConfirmPass(c:AbstractControl) : {notSame:boolean} | null {
    return c.value.password === c.value.repassword ? null : {notSame:true};
  }

}
