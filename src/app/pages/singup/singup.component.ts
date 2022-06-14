import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'; 



@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  constructor(private userService: UserService,private snack:MatSnackBar) {}

  public user = {
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
  };

  ngOnInit(): void {
  }
  formSubmit(){
    console.log(this.user)
    
      if(this.user.username== '' || this.user.username == null ) {
        this.snack.open('Username is required','',{
          duration:3000,
          //verticalPosition:'top',
          //horizontalPosition:'right' 
        });
        return; 
      }
    
    
  this.userService.addUser(this.user).subscribe( 
    (data:any) => {
      console.log(data);
       // alert('success');
        Swal.fire('Successfully done','user id is'+ data.id,'success');
    },
    (error) => {
      console.log(error);
      //alert('something went wrong');
      
      this.snack.open('something went wrong','',{
        duration:3000,
      });
      
    }
  );
  }
}
