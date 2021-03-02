import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UserApiService } from "../../services/userapi";
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-advisor-navbar',
  templateUrl: './advisor-navbar.component.html',
  styleUrls: ['./advisor-navbar.component.css']
})
export class AdvisorNavbarComponent implements OnInit {
  
  public focus;
  public listTitles: any[];
  public location: Location;
  imgUrl: string;
  url;
  imageToShow: any;
  isImageLoading: boolean;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true // to allow cookies to go from "https://localhost:4567" to "http://localhost:5678"
  };

  constructor(location: Location,  private element: ElementRef, private router: Router, private _userApiService: UserApiService, private http: HttpClient) {
    this.location = location;
  } 

  ngOnInit() {
    this.getUserInfo();
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }

  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  /*
  * 
  * Users is logged out on success call from the API.
  * Session storage is also destroyed if the user logs out and tries to go back using Browser.
  * API: 'baseURL/trackers/user'
  * 
  */

  userLogout(){
    this._userApiService.doLogout().subscribe(
      (data:any) => {
        const msg = data.message;
        if(msg == "User logged out successfully."){
          sessionStorage.clear();
          this.router.navigate(['logout']);
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logged out successfully',
            showConfirmButton: false,
            timer: 1500
          }) 
        }
      },
      (err) => { 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Logout Unsuccessful!'
        })
      } 
    );
  }

  /*
  * 
  * Users is logged out on success call from the API.
  * Session storage is also destroyed if the user logs out and tries to go back using Browser.
  * API: 'baseURL/trackers/user'
  * 
  */

  getUserInfo(){
    this._userApiService.getUserInfo().subscribe(
      (data:any) => {
        console.log(data);
        var name = <HTMLInputElement>document.getElementById("userName");
        this.imgUrl = data.data.data.profileImage;
        console.log("Image");
        console.log(this.imgUrl);
        this.isImageLoading = true;
        this._userApiService.getImage(this.imgUrl).subscribe(data => {
          this.createImageFromBlob(data);
          this.isImageLoading = false;
        }, error => {
          this.isImageLoading = false;
          console.log(error);
        });

        name.innerHTML = data.data.data.name;
      },
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error in fetching the details!'
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
  
}
