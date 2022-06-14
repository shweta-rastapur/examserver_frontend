import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //details of current user who logged in
  public getCurrentUser()
  {
    return this.http.get(`${baseUrl}/current-user`);
  }
 
  //generate token for login details sending req to server to backend
  public generateToken(LoginData:any)
  {
     return this.http.post(`${baseUrl}/generate-token`,LoginData);
  }
  //login user: set token in local storage 
  public loginUser(token:any) {
    localStorage.setItem('token',token);
    this.loginStatusSubject.next(true);
    return true; 
  }

  //is login: user is logged in or not
  public isLoggedIn()
  {
    let tokenStr=localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr=='null')
    {
      return false; //tells it nulll undefined
    }
    else
    {
      return true; //return  user loggedin
    }
  }
  //logout:remove token from local storage
  public logout()
  {
    localStorage.removeItem("token");
    return true; //logout is done
  }

  //get token
  public getToken()
  {
    return localStorage.getItem('token');
  }

  //set userDEtails in localstorage
  public setuser(user:any)
  {
    //strigify converts to string
    localStorage.setItem("user",JSON.stringify(user));
  }

  //get userdetials from localstorage
  public getUser()
  {
    let userStr=localStorage.getItem("user");
    if(userStr!=null)
    {
      return JSON.parse(userStr);
    }
    //if user is logged in and not stored data in local storage then logout
    else{
      this.logout();
      return null;

    }

  }
  //get user role
  public getUserRole()
  {
    let user:any =this.getUser()
    return user.authorities[0].authority;
  }
}
