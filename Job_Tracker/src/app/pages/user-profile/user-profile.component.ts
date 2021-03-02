import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from "../../services/userapi";
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  title = 'fileUpload';
  images; profilePic: File = null;

  imgUrl: string;
  url;
  imageToShow: any;
  isImageLoading: boolean;
  userName: string;
  userName1: string;
  aboutMe2: string;
  location: string;

  constructor(private http: HttpClient, private _userApiService: UserApiService, private router: Router) { 
    this.getUserInfo();
    this.getStudentDashboard();
  }

  

  selectImage(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      const file = event.target.files[0];
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.images = file;
      this.profilePic = <File>event.target.files[0];
      console.log("Images")
      console.log(this.images);
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.imageToShow = event.target.result;
      }
    } 
  }
    
  private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      withCredentials: true // to allow cookies to go from "https://localhost:4567" to "http://localhost:5678"
  };


  ngOnInit() {
      
  }

  getUserInfo(){
    this._userApiService.getUserInfo().subscribe(
      (data:any) => {
        console.log(data);
        var name = <HTMLInputElement>document.getElementById("name");
        var emailId = <HTMLInputElement>document.getElementById("emailId");
        var dob = <HTMLInputElement>document.getElementById("dob");
        var age = <HTMLInputElement>document.getElementById("age");
        var gender = <HTMLInputElement>document.getElementById("gender");
        var address = <HTMLInputElement>document.getElementById("search_input");
        var zip = <HTMLInputElement>document.getElementById("zip");
        var city = <HTMLInputElement>document.getElementById("city");
        var state = <HTMLInputElement>document.getElementById("state");
        var country = <HTMLInputElement>document.getElementById("country");
        var phoneNumber = <HTMLInputElement>document.getElementById("phoneNumber");
        var linkedInURL = <HTMLInputElement>document.getElementById("linkedInURL");
        var gitHubURL = <HTMLInputElement>document.getElementById("gitHubURL");
        var profilePic = <HTMLInputElement>document.getElementById("profilePic");
        var aboutMe = <HTMLInputElement>document.getElementById("aboutme");

        this.imgUrl = data.data.data.profileImage;
        this.isImageLoading = true;
        this._userApiService.getImage(this.imgUrl).subscribe(data => {
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error in fetching the profile image!'
          })
    
        });

        console.log(data.data.data.linkedInUrl+" == "+data.data.data.githubUrl);
        console.log(data.data.data.profileImage);
        let test = this.http.get(JSON.stringify(data.data.data.profileImage), this.httpOptions).pipe(map((data)=>{return data;}));
        console.log("2");
        console.log(test);
        this.userName = data.data.data.name+", 26";
        this.userName1 = "Hello "+data.data.data.name+",";
        this.aboutMe2 = data.data.data.aboutMe;
        name.value = data.data.data.name;
        emailId.value = data.data.data.emailId;
        dob.value = data.data.data.dateOfBirth;
        gender.value = data.data.data.gender;
        phoneNumber.value = data.data.data.phoneNumber;

        address.value = data.data.data.address;
        city.value = data.data.data.city;
        state.value = data.data.data.state;
        country.value = data.data.data.country;
        this.location = data.data.data.city+", "+data.data.data.state;

        
        if((typeof(data.data.data.linkedInURL) == 'undefined') || data.data.data.linkedInURL == ""){
          linkedInURL.value = "Not Available";
        }
        else
          linkedInURL.value = data.data.data.linkedInUrl;


        if((typeof(data.data.data.gitHubURL) == 'undefined') || data.data.data.gitHubURL == ""){
          gitHubURL.value = "Not Available";
        }
        else
          gitHubURL.value = data.data.data.gitHubUrl;

        if((typeof(data.data.data.aboutMe) == 'undefined') || data.data.data.aboutMe == ""){
          aboutMe.value = "Tell me about yourself!";
          this.aboutMe2 = "Tell me about yourself!";
        }
        else{
          aboutMe.value = data.data.data.aboutMe;
          this.aboutMe2 = data.data.data.aboutMe;
        }

        
        // linkedInURL.value = data.data.data.linkedInUrl;
        // gitHubURL.value = data.data.data.githubUrl;

        // aboutMe.value = data.data.data.aboutMe;

        // if(data.data.data.linkedInURL == undefined || data.data.data.linkedInURL == ""){
        //   linkedInURL.value = "Not Available";
        // }

        // if(data.data.data.gitHubURL == undefined || data.data.data.gitHubURL == ""){
        //   gitHubURL.value = "Not Available";
        // }

        // if(data.data.data.aboutMe == undefined || data.data.data.aboutMe == "" || data.data.data.aboutMe == null){
        //   aboutMe.value = "Tell me about yourself!";
        //   this.aboutMe2 = "Tell me about yourself!";
        // }
        // else
        //   aboutMe.value = data.data.data.aboutMe


        age.value = data.data.data.age;
        zip.value = data.data.data.zipcode;

      },
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error in fetching the profile!'
      })
         
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }
  
  updateUserInfo(){
    
    var name = <HTMLInputElement>document.getElementById("name");
    var emailId = <HTMLInputElement>document.getElementById("emailId");
    var dob = <HTMLInputElement>document.getElementById("dob");
    var age = <HTMLInputElement>document.getElementById("age");
    var gender = <HTMLInputElement>document.getElementById("gender");
    var address = <HTMLInputElement>document.getElementById("search_input");
    var zip = <HTMLInputElement>document.getElementById("zip");
    var city = <HTMLInputElement>document.getElementById("city");
    var state = <HTMLInputElement>document.getElementById("state");
    var country = <HTMLInputElement>document.getElementById("country");
    var phoneNumber = <HTMLInputElement>document.getElementById("phoneNumber");
    var linkedInURL = <HTMLInputElement>document.getElementById("linkedInURL");
    var gitHubURL = <HTMLInputElement>document.getElementById("gitHubURL");
    var profilePict = <HTMLInputElement>document.getElementById("file");
    var aboutMe = <HTMLInputElement>document.getElementById("aboutme");

    
    let body = new FormData();
    body.append("name", name.value);
    
    body.append("dateOfBirth", dob.value);        
    body.append("phoneNumber", phoneNumber.value);
    body.append("emailId", emailId.value);
    body.append("gender", gender.value);

    body.append("address", address.value);
    body.append("country", country.value);
    body.append("state", state.value);
    body.append("city", city.value);

    body.append("linkedInUrl", linkedInURL.value);
    body.append("githubUrl", gitHubURL.value);

    
    body.append("zipcode", zip.value);
    body.append("age", age.value);
    body.append("aboutMe", aboutMe.value);
    

    let bodyImg = new FormData();

    if(this.profilePic != null)
      bodyImg.append('profileImage', this.profilePic);
    
    const objT = {};
    objT["name"] = name.value;
    objT["dateOfBirth"] = dob.value;
    objT["phoneNumber"] = phoneNumber.value;
    objT["emailId"] = emailId.value;
    objT["gender"] = gender.value;
    objT["address"] = address.value;
    objT["country"] = country.value;
    objT["state"] = state.value;
    objT["city"] = city.value;
    objT["linkedInUrl"] = linkedInURL.value;
    objT["githubUrl"] = gitHubURL.value;
    objT["zipcode"] = zip.value;
    objT["age"] = age.value;
    objT["aboutMe"] = aboutMe.value;
    
    var url = new URL('http://localhost:3000/trackers/user');
    
    Object.keys(objT).forEach(key => url.searchParams.append(key, objT[key]));

    if(this.profilePic != null){
      this._userApiService.updateProfile(url, bodyImg).subscribe(
        (data:any) => {
          this._userApiService.updateProfile(url, body).subscribe(
            (data:any) => {
              this.router.navigate(['user-profile']);
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Profile updated successfully!',
                showConfirmButton: false,
                timer: 1500
              })
            },
            (err) => Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Error in updating the profile!'
            })           
          );  
        },             
      );
    }
    else{
      this._userApiService.updateProfile(url, body).subscribe(
        (data:any) => {
          this.router.navigate(['user-profile']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Profile updated successfully!',
            showConfirmButton: false,
            timer: 1500
          })
        },
        (err) => Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error in updating the profile!'
        })          
      );
    }
  }
  getStudentDashboard(){
    this._userApiService.getStudentDashboard().toPromise().then(
      (data:any) => {
        console.log(data.data.applicationGraph);
        console.log(data.data.inteviewGraph);
        console.log(data.data.dashboardDetails);


        var wishList = <HTMLInputElement>document.getElementById('wishList');
        var applied = <HTMLInputElement>document.getElementById('applied');
        var interviews = <HTMLInputElement>document.getElementById('interviews');
        var rejects = <HTMLInputElement>document.getElementById('rejects');
        var offers = <HTMLInputElement>document.getElementById('offers');

        wishList.innerHTML = "0";
        applied.innerHTML = "0";
        interviews.innerHTML = "0";
        rejects.innerHTML = "0";
        offers.innerHTML = "0";

        for(let i=0; i<data.data.dashboardDetails.length; i++)
        {
          let status = data.data.dashboardDetails[i]._id.jobStatus; 
          let value = data.data.dashboardDetails[i].count;
          console.log(status," => ",value);
          if(status === "wishlist"){
            wishList.innerHTML = value;
          }
          else if(status === "applied"){
            applied.innerHTML = value;
          }
          else if(status === "interview"){
            interviews.innerHTML = value;
          }
          else if(status === "offered"){
            offers.innerHTML = value;
          }
          else if(status === "rejected"){
            rejects.innerHTML = value;
          }
        }
      },
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Unable to fetch data due to network error!'
      })
    );
  }
}