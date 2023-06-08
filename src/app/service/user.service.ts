import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Blog} from "../model/blog";
import {User} from "../model/user";

const url = "http://localhost:8080/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public checkLogin(user:User) {
    return this.http.post<User>(url + "/auth",user);
  }

  public checkUserExists(username:string) {
    return this.http.get(url+ "/" +username + "/exists")
  }

  public createNewUser(user:User) {
    return this.http.post(url,user);
  }
}
