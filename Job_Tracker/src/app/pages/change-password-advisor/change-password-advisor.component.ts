import { Component, OnInit } from '@angular/core';
import { UserApiService } from "../../services/userapi";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-change-password-advisor',
  templateUrl: './change-password-advisor.component.html',
  styleUrls: ['./change-password-advisor.component.css']
})
export class ChangePasswordAdvisorComponent implements OnInit {

  constructor(private _userApiService: UserApiService, private router: Router) {}

  ngOnInit(): void {
  }

  updatePassword(){

    var password = <HTMLInputElement>document.getElementById("password");
    var newPassword = <HTMLInputElement>document.getElementById("newPassword");
    var confirmPassword = <HTMLInputElement>document.getElementById("confirmPassword");

    if(newPassword.value === confirmPassword.value){
      this._userApiService.updatePassword(password.value, newPassword.value).subscribe(
        (data:any) => {
          console.log(data);
          const msg = data.message;
          if(msg == "Password updated."){
            sessionStorage.clear();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Password changed successfully!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['logout']);
          }
          else{
            Swal.fire({
              position: 'center',
              icon: 'error',
              title: 'Password mismatch!',
              showConfirmButton: false,
              timer: 1500
            })
            this.router.navigate(['change-password']);
          }
        },
        (err) => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error in fetching the details!'
        })
      );
    }
    else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Password mismatch!',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
