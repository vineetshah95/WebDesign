import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApiService } from "../../services/userapi";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(private _userApiService: UserApiService, private router: Router) {}

  ngOnInit() {
  }
  
  ngOnDestroy() {
  }
  
  userSignIn(){

    var emailId = <HTMLInputElement>document.getElementById('emailId'); 
    var password = <HTMLInputElement>document.getElementById('password'); 
    
    console.log(emailId, password);
    if( emailId != null && emailId.value != undefined &&  password.value != undefined && password != null ){
      let obj = {
        emailId: emailId.value,
        password: password.value
      }
      this._userApiService.postLogin(obj).subscribe(
        (data:any) => {
          console.log(data);
          var user_id = data.data;
          const msg = data.message;
          if(msg == "Dashboard data retrieved successfully."){
            this.router.navigate(['dashboard']);
          }
          else{
            this.router.navigate(['advisor']);
          }
        },
        (err) => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please provide valid login credentials!'
        })          
      );
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please provide valid login credentials!'
      })          
    }
  }

  registrationPage(){
    console.log("Inside registration function");
    this.router.navigate(['register']);
  }

  forgotPasswordPage(){
    console.log("Inside forgot password function");
    this.router.navigate(['forgot-password']);
  }

}
