export class Job {
    id: Number;
    companyName: String;
    jobTitle: String;
    jobDescription: String;
    jobStatus: String;
    interviewDate1:  Date;
    interviewDate2:  Date;
    appliedDate:  Date;
    offerDate:  Date;
    jobResume:  String;
    jobCoverLetter:  String;
    salary:  Number;
    location:  String;
    fileArray: File[];
  

    constructor(jobTitle: String,companyName: String,jobStatus: String){
      
        this.companyName = companyName;
        this.jobTitle = jobTitle;
        this.jobStatus = jobStatus;

    }
}


