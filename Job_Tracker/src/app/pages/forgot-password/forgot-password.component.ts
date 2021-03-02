import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserApiService } from "../../services/userapi";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _userApiService: UserApiService, private router: Router) {}

  ngOnInit(): void {
  }

  sendEmail(){
    var emailId = <HTMLInputElement>document.getElementById('email');
    var emailIdValue = <HTMLInputElement>document.getElementById('eadd');
    console.log(emailId.value);

    this._userApiService.forgotPassword(emailIdValue.value).subscribe(
      (data:any) => {
        console.log(data);
        emailId.style.display="none";

        var resetButton = <HTMLInputElement>document.getElementById('resetButton');
        resetButton.style.display="none";

        var resetCode = <HTMLInputElement>document.getElementById('resetCode');
        resetCode.style.display="block";

        var newPassword = <HTMLInputElement>document.getElementById('newPassword');
        newPassword.style.display="block";

        var cnewPassword = <HTMLInputElement>document.getElementById('cnewPassword');
        cnewPassword.style.display="block";


        var submitPassword = <HTMLInputElement>document.getElementById('submitPassword');
        submitPassword.style.display = "block";
        submitPassword.style.marginLeft = "50px";

        var rcode = <HTMLInputElement>document.getElementById('rcode');
        var npass = <HTMLInputElement>document.getElementById('npass');

      },
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email Address not registered!'
      })
    );
  }

  forgotPassword(){

    var email = <HTMLInputElement>document.getElementById("eadd");
    var resetCode = <HTMLInputElement>document.getElementById("rcode");
    var newPassword = <HTMLInputElement>document.getElementById("npass");
    var cnewPassword = <HTMLInputElement>document.getElementById("cnpass");
    
    console.log(resetCode+"----");

    if(newPassword.value === cnewPassword.value){
      this._userApiService.forgotPasswordConfirm(email.value, resetCode.value, newPassword.value).subscribe(
        (data:any) => {
          console.log(data);
          this.router.navigate(['login']);
        },
        (err) => Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Reset code mismatch!'
                })
      );
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Password mismatch!'
      })
    }
  }


}
