import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserApiService } from "../../services/userapi";
import { Router } from '@angular/router';
import { StudentList } from "./advisor-dashboard-entity";
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

@Component({
  selector: 'app-advisor-dashboard',
  templateUrl: './advisor-dashboard.component.html',
  styleUrls: ['./advisor-dashboard.component.scss']
})
export class AdvisorDashboardComponent {

  title = 'modal2';
  editProfileForm: FormGroup;

  imgUrl: string;
  
  imageToShow: any;
  imageToShow_1: any;
  isImageLoading: boolean;
  
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };


  public studentList: Array<{name: string}> = [] ;
  temp: StudentList;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private _userApiService: UserApiService, private router: Router) {
    
  }

  ngOnInit() {
    this.getAdvisortDashboard();
    this.getStudentList(); 
  }

  /*
    This function is used to get the total value of all the students applications applied, interviews calls,
    offers and rejects.
  */
  getAdvisortDashboard(){
    this._userApiService.getAdvisortDashboard().toPromise().then(
      (data:any) => {
        var applied = <HTMLInputElement>document.getElementById('applied');
        var interviews = <HTMLInputElement>document.getElementById('interviews');
        var rejects = <HTMLInputElement>document.getElementById('rejects');
        var offers = <HTMLInputElement>document.getElementById('offers');
        for(var i=0; i < data.data.length; i++){
          if(data.data[i]._id.jobStatus == "interview"){
            interviews.innerHTML = data.data[i].count;
          }
          else if(data.data[i]._id.jobStatus == "applied"){
            applied.innerHTML = data.data[i].count;
          }
          else if(data.data[i]._id.jobStatus == "offered"){
            offers.innerHTML = data.data[i].count;
          }
          else if(data.data[i]._id.jobStatus == "rejected"){
            rejects.innerHTML = data.data[i].count;
          }
        }
        if( interviews.innerHTML == "")
          interviews.innerHTML = "0";
        if( applied.innerHTML == "")
          applied.innerHTML = "0";
        if( offers.innerHTML == "")
          offers.innerHTML = "0";
        if( rejects.innerHTML == "")
          rejects.innerHTML = "0";
      },
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Unable to fetch data due to network error!'
      })
    );
  }
      
  /*
    This function is used to sent the selected image to the profile.
  */

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      
      console.log("This is image to show base64");
      this.imageToShow = reader.result;
      this.imageToShow_1 = reader.result;
      console.log(this.imageToShow);

    }, false);

    if (image) {
        reader.readAsDataURL(image);
    }
  }

  /*
    This function gets the list of students that are associated with a particular co-op advisor that is logged in.
    Also, it print the list in the table format.
    API: 'baseURL/trackers/advisor/students'
  */

  getStudentList(){
    this._userApiService.getStudentList().subscribe(
      (data:any[]) => {
        console.log("Hello Here"+ JSON.stringify(data[0].studentInfo));

        var y = <HTMLInputElement>document.getElementById("rowsList");
        var df = document.createDocumentFragment();

        console.log(data.length);
        for(let i=0; i < data.length; i++){

          console.log("This is list image from api");
          console.log(data[i].studentInfo.profileImage);
          this.imgUrl = data[i].studentInfo.profileImage;
          this.isImageLoading = true;
          const promise = this._userApiService.getImage(this.imgUrl).toPromise();
          promise.then((data) => {
            this.createImageFromBlob(data);
            setTimeout(() => {  console.log("World!"); }, 2000);
            this.isImageLoading = false;
          }).catch((error)=>{
            console.log("Error message " + JSON.stringify(error));
          });

          this.temp = {
            name: data[i].studentInfo.name,
            dateOfBirth: data[i].studentInfo.dateOfBirth,
            emailId: data[i].studentInfo.emailId,
            profileImage: this.imageToShow,
            phoneNumber: data[i].studentInfo.phoneNumber,
            city: data[i].studentInfo.city,
            state: data[i].studentInfo.state,
            country: data[i].studentInfo.country,
            address: data[i].studentInfo.address,
            age: data[i].studentInfo.age,
            gitHubUrl: data[i].studentInfo.githubUrl,
            linkedInUrl: data[i].studentInfo.linkedInUrl,
            zip: data[i].studentInfo.zipcode
          };
          var applied=0,interview=0,offered=0,rejected=0;
          for(var j=0; j< data[i].studentJobData.length; j++){
            if(data[i].studentJobData[j].count != null && data[i].studentJobData[j].count != undefined){
              if(data[i].studentJobData[j]._id.jobStatus == "applied"){
                applied = data[i].studentJobData[j].count;
              }
              else if(data[i].studentJobData[j]._id.jobStatus == "interview"){
                interview = data[i].studentJobData[j].count;
              }
              else if(data[i].studentJobData[j]._id.jobStatus == "offered"){
                offered = data[i].studentJobData[j].count;
              }
              else if(data[i].studentJobData[j]._id.jobStatus == "rejected"){
                rejected = data[i].studentJobData[j].count;
              }
            }
          }
          
          var tr = document.createElement('tr');
          // tr.setAttribute("*ngFor", "filter:searchText");
          df.appendChild(tr);

          var td1 = document.createElement('td');
          df.appendChild(td1);
          var img = document.createElement('img');
          df.appendChild(img);
          img.setAttribute("class","avatar rounded-circle mr-3");
          console.log("Setting image");
          console.log(this.imageToShow);
          img.setAttribute("src", data[i].studentInfo.profileImage);
          td1.appendChild(img);
          tr.appendChild(td1);
          
          var td2 = document.createElement('td');
          td2.innerHTML = data[i].studentInfo.name;
          df.appendChild(td2);
          tr.appendChild(td2);
          
          var td3 = document.createElement('td');
          td3.innerHTML = applied.toString();
          df.appendChild(td3);
          tr.appendChild(td3);
          
          var td4 = document.createElement('td');
          td4.innerHTML = interview.toString();
          df.appendChild(td4);
          tr.appendChild(td4);
          
          var td5 = document.createElement('td');
          td5.innerHTML = offered.toString();
          df.appendChild(td5);
          tr.appendChild(td5);
          
          var td6 = document.createElement('td');
          td6.innerHTML = rejected.toString();
          df.appendChild(td6);
          tr.appendChild(td6);
          
          var td7 = document.createElement('td');
          df.appendChild(td7);
          var button = document.createElement('button');
          button.setAttribute("type","button");
          button.setAttribute("class","btn btn-primary my-4");

          console.log("Before CLick");
          console.log(data[i].studentInfo.profileImage);
          console.log(this.temp.profileImage);

          button.setAttribute("onclick","myFun('"+this.temp.name+"','"+this.temp.emailId+"','"+this.temp.phoneNumber+"','"+this.temp.city+"','"+this.temp.state+"','"+this.temp.country+"','"+this.temp.address+"','"+data[i].studentInfo.profileImage+"','"+this.temp.age+"','"+this.temp.gitHubUrl+"','"+this.temp.linkedInUrl+"','"+this.temp.zip+"','"+this.temp.dateOfBirth+"')");
          button.innerHTML = 'View Profile';
          df.appendChild(button);
          td7.appendChild(button);
          tr.appendChild(td7);
          

          y.appendChild(tr);
          
          this.studentList.push(this.temp);
        }
        console.log(this.studentList);
      },
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error in fetching the values!'
      })      
    );
  }
}

