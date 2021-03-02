import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { UserApiService } from "../../services/userapi";
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public barChart = [0];
  public lineChart = [0];
  public labels = ['Jan','Feb','Mar','Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  constructor(private _userApiService: UserApiService, private router: Router) {}

  ngOnInit() {
    this.getStudentDashboard();
    console.log("Inside the nginit")
    console.log(this.barChart)
    console.log(this.lineChart)
    console.log("Done nginit");    
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

        if( interviews.innerHTML == "")
          interviews.innerHTML = "0";
        if( applied.innerHTML == "")
          applied.innerHTML = "0";
        if( offers.innerHTML == "")
          offers.innerHTML = "0";
        if( rejects.innerHTML == "")
          rejects.innerHTML = "0";
        
        console.log("Interview");
        var myInterviewMap = new Map;
        var inteviewGraph = data.data.inteviewGraph;

        var myApplicationMap = new Map;
        var applicationGraph = data.data.applicationGraph;

        console.log(inteviewGraph)
        console.log("Interview graph");
        for(var i=0; i< inteviewGraph.length; i++){
          console.log(inteviewGraph[i]._id.month,"=========>",inteviewGraph[i].total);
          console.log(inteviewGraph[i]._id.month);
          if(inteviewGraph[i]._id.month === 1){
            console.log("Jan");
            myInterviewMap.set("Jan", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
            this.barChart.push(inteviewGraph[i].total);
          }
          else if(inteviewGraph[i]._id.month === 2){
            console.log("Feb")
            myInterviewMap.set("Feb", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month === 3){
            myInterviewMap.set("Mar", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month === 4){
            console.log("Apr")
            myInterviewMap.set("Apr", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month === 5){
            myInterviewMap.set("May", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month === 6){
            myInterviewMap.set("Jun", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month == 7){
            myInterviewMap.set("Jul", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month == 8){
            myInterviewMap.set("Aug", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month == 9){
            myInterviewMap.set("Sep", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month == 10){
            myInterviewMap.set("Oct", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month == 11){
            myInterviewMap.set("Nov", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else if(inteviewGraph[i]._id.month == 12){
            myInterviewMap.set("Dec", inteviewGraph[i].total);
            this.barChart[i] = inteviewGraph[i].total;
          }
          else{
            this.barChart[i] = 0;
          }
        }

      console.log(myInterviewMap);
      console.log(this.barChart);

      console.log("Applications");

      for(var i=0; i< applicationGraph.length; i++){
        console.log(applicationGraph[i]._id.month,"=========>",applicationGraph[i].total);
        if(applicationGraph[i]._id.month === 1){
          console.log("Jan");
          myApplicationMap.set("Jan", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 2){
          myApplicationMap.set("Feb", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 3){
          console.log("Mar")
          myApplicationMap.set("Mar", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 4){
          console.log("Apr")
          myApplicationMap.set("Apr", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 5){
          myApplicationMap.set("May", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 6){
          myApplicationMap.set("Jun", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 7){
          myApplicationMap.set("Jul", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 8){
          myApplicationMap.set("Aug", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 9){
          myApplicationMap.set("Sep", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month == 10){
          myApplicationMap.set("Oct", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 11){
          myApplicationMap.set("Nov", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else if(applicationGraph[i]._id.month === 12){
          myApplicationMap.set("Dec", applicationGraph[i].total);
          this.lineChart[i] = applicationGraph[i].total;
        }
        else{
          this.lineChart[i] = 0;
        }
      }

      console.log("Final");
      console.log(this.barChart);
      console.log(this.lineChart);

      var chartOrders = document.getElementById('chart-orders');

      parseOptions(Chart, chartOptions());

      chartOrders = new Chart(chartOrders, {
        type: 'bar',
        options: chartExample2.options,
        data: {
          labels: ['Jan','Feb','Mar','Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Interview',
              data: this.barChart
            }]
        }
      });

      var chartSales = document.getElementById('chart-sales');
      chartSales = new Chart(chartSales, {
        type: 'line',
        options: chartExample1.options,
        data: {
          labels: ['Jan','Feb','Mar','Apr','May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
              label: 'Application',
              data: this.lineChart
            }]
        }
      });

      },
      (err) => Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Unable to fetch data due to network error!'
      })
    );
  }

  getMonth(nmonth){
    switch(nmonth){
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "Jul";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
    }
  }
}
