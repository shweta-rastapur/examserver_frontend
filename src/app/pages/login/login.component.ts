import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //it will take the data of username and password from login page and gives to generate the token
  LoginData = {
    username:'',
    password:'',
  };

  constructor(private snack: MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  formSubmit(){
    console.log("login button working");
    if(this.LoginData.username.trim()=='' || this.LoginData.username.trim()=='null')
    {
      this.snack.open("username is required",'',{
        duration:3000,
      }
      );
      return ;

    }
  
    if(this.LoginData.password.trim()=='' || this.LoginData.password.trim()=='null')
    {
      this.snack.open("password is required",'',{
        duration:3000,
      }
      );
      return ; 
    }
      //if username pass is crct then req to generate token
      this.login.generateToken(this.LoginData).subscribe(
        (data:any)=>{
          console.log("Success");
          console.log(data); //if success data has token 

          ///login..
          this.login.loginUser(data.token);
          
          //will get the user from currentuser and set it to the localstorage
          this.login.getCurrentUser().subscribe(
            (user:any) =>
            {
              this.login.setuser(user);
              console.log(user);
              //redirect ..if admin to admin dash
              //redirecr ..if  normal to normal dash
              if(this.login.getUserRole()=='ADMIN')
              {
                 //go to admin 
                 this.router.navigate(['/admin']);
                 this.login.loginStatusSubject.next(true);
              }
              else if(this.login.getUserRole()=='NORMAL')
              {
                //normal user dashboard
                this.router.navigate(['/user-dashboard/0']);
                this.login.loginStatusSubject.next(true);
              }
              else{
                this.login.logout(); 
                
              }
            }
          );
        },
        (error)=>{
          console.log("error");
          console.log(error);
          this.snack.open("Invalid Details",'',{
            duration:3000,
          });
        }
      );
  }
}

