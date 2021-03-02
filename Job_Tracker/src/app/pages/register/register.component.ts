import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from "../../services/userapi";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  title = 'fileUpload';
  images;
  url;

  constructor(private _userApiService: UserApiService, private router: Router, private http: HttpClient) {

  }

  getToday(): string {
    return new Date().toISOString().split('T')[0]
  }

  ngOnInit() {
  }

  selectImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.images = file;
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  createAccount(){

    var name = <HTMLInputElement>document.getElementById("name");
    var emailId = <HTMLInputElement>document.getElementById("emailId");
    var password = <HTMLInputElement>document.getElementById("password");
    var cpassword = <HTMLInputElement>document.getElementById("cpassword");
    var linkedInURL = <HTMLInputElement>document.getElementById("linkedInURL");
    var gitHubURL = <HTMLInputElement>document.getElementById("gitHubURL");

    var user_type = <HTMLInputElement>document.getElementById("user_type");
    var co_op_advisor = <HTMLInputElement>document.getElementById("co_op_advisor");
    var age = <HTMLInputElement>document.getElementById("age");
    var dob = <HTMLInputElement>document.getElementById("dob");
    var gender = <HTMLInputElement>document.getElementById("gender");
    var zip = <HTMLInputElement>document.getElementById("zip");
    var city = <HTMLInputElement>document.getElementById("city");
    var state = <HTMLInputElement>document.getElementById("state");
    var country = <HTMLInputElement>document.getElementById("country");
    var phoneNumber = <HTMLInputElement>document.getElementById("phoneNumber");
    var address = <HTMLInputElement>document.getElementById("search_input");
    var customCheckRegister = <HTMLInputElement>document.getElementById("customCheckRegister");
    

    if( name != null && emailId != null && password != null && cpassword != null && user_type != null && dob != null && gender != null && zip != null && phoneNumber != null && address != null && customCheckRegister.checked == true){
      if(password.value.length >=6){
        if(password.value === cpassword.value){
          let body = new FormData();
          body.append("name", name.value);
          body.append("userType", user_type.value);
          body.append("country", country.value);
          body.append("state", state.value);
          body.append("city", city.value);
          body.append("password", password.value);
          body.append("dateOfBirth", dob.value);
          body.append("emailId", emailId.value);
          body.append("phoneNumber", phoneNumber.value);
          body.append("address", address.value);
          body.append("gender", gender.value);
          body.append("profileImage", this.images);
          body.append("linkedInUrl", linkedInURL.value);
          body.append("githubUrl", gitHubURL.value);
          body.append("zipcode", zip.value);
          body.append("age", age.value);
          if(user_type.value == "student")
            body.append("advisorId", co_op_advisor.value);


          this._userApiService.postRegister(body).subscribe(
            () => {
              this.router.navigate(['login']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Registered Successfully!',
                showConfirmButton: false,
                timer: 1500
              })
            },
            (err) => Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error in registring!'
            })
          );
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error in registering!'
          })
        }
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password minimum characters should be more than 6'
        })
      }
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please provide all the required fields!'
      })
    }
  }


  getAdvisorList(value){
    let advisorList;
    console.log("Inside");
    console.log(value);
    var x = <HTMLInputElement>document.getElementById("user_type");
    var y = <HTMLInputElement>document.getElementById("co_op_advisor");
    console.log(x.value);
    if(x.value != "student"){
      y.style.display = "none";
    }
    else{
      y.style.display = "block";
      this._userApiService.getAdvisorList().subscribe(
        (data:any) => {
          console.log(data.message);
          const msg = data.message;
          if(msg == "SUCCESS."){
            while (y.hasChildNodes()) {
              y.removeChild(y.firstChild);
            }
            console.log(data.data);
            advisorList = data.data;
            console.log(advisorList);
            var df = document.createDocumentFragment();

            for(let i=0; i<advisorList.length; i++)
            {
              var option = document.createElement('option');
              console.log("Advisor Id");
              console.log(advisorList[i].id);
              option.setAttribute("id", advisorList[i].id);
              option.value = advisorList[i].id;
              option.appendChild(document.createTextNode(advisorList[i].name));
              df.appendChild(option);
              y.appendChild(option);
            }
          }
          else{
            this.router.navigate(['advisor']);
          }
        },
        (err) => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Unable to fetch the update!'
        })
      );
    }
  }
}
