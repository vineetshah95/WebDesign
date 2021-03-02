import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

/*
    All API's calls  related for student and advisor profile 
*/

const baseURL = "http://localhost:3000/"

@Injectable({ providedIn: 'root' })
export class UserApiService {

    constructor(private httpclient: HttpClient){}
    
    /*
        Sending the httprequest params in JSON format with authentication as true.  
    */
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        withCredentials: true 
    };

    /*
        Sending the httprequest params in Form format with authentication as true.  
    */
    private httpOptionsform = {
        headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
        withCredentials: true 
    };

    /*
        Sending the httprequest only the authentication as true.  
    */
    private httpOptionsformUpdate = {
        withCredentials: true 
    };

    /*
        @param: Object{emailId, password}
        POST request call to 'trackers/login'
    */

    postLogin(obj): Observable<any>{
        
        let loginMsg = this.httpclient.post(
            baseURL+"trackers/login?emailId="+obj.emailId+"&password="+obj.password,
            null,
            this.httpOptions);
        return loginMsg;
    }

    /*
        GET request call to 'trackers/user/advisor/list'
        @return: List of advisor
    */

    getAdvisorList(): Observable<any>{
              
        return this.httpclient.get(baseURL+"trackers/user/advisor/list", this.httpOptions).
            pipe(
            map((data) => {
                return data;
            }), catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        )
    }

    /*
        Getting the profile image of the student.
        @params: imageUrl: String
        @returm: responseType Blob type

    */

    getImage(imageUrl: string): Observable<Blob> {
        return this.httpclient.get(imageUrl, { responseType: 'blob' });
    }

     /*
        Getting the profile information of the student.
    */

    getUserInfo(): Observable<any>{

        return this.httpclient.get(baseURL+"trackers/user", this.httpOptions).
            pipe(
            map((data:any) => {
                return data;
            }), catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        )
    }

    /*
        Getting the student dashboard data.
    */

    getStudentDashboard(): Observable<any>{

        return this.httpclient.get(baseURL+"trackers/student", this.httpOptions).
            pipe(
            map((data:any) => {
                return data;
            }), catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        )
    }

    /*
        Getting the advisor dashboard data.
    */

    getAdvisortDashboard(): Observable<any>{

        return this.httpclient.get(baseURL+"trackers/advisor", this.httpOptions).
            pipe(
            map((data:any) => {
                return data;
            }), catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        )
    }

    /*
        Getting the student list data associated with the particular advisor who is requesting it.
    */

    getStudentList(): Observable<any[]>{

        return this.httpclient.get(baseURL+"trackers/advisor/students", this.httpOptions).
            pipe(
            map((data:any[]) => {
                return data;
            }), catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        )
    }

    /*
        Logout API call.
    */

    doLogout(): Observable<any>{
              
        return this.httpclient.get(baseURL+"trackers/logout", this.httpOptions).
            pipe(
            map((data) => {
                console.log(data);
                return data;
            }), catchError( error => {
                return throwError( 'Something went wrong!' );
            })
        )
    }

    /*
        API return a random string that is stored in the backend and same value is further sent to the user 
        which is used for reseting the password.
        @param: email: String
        @return: resetcode: String
    */

    forgotPassword(email): Observable<any>{
        
        const obj = {
            emailId: email
        };

        let resetcode = this.httpclient.post(
            baseURL+"trackers/user/forgetpassword",
            obj,
            this.httpOptions);
        console.log(resetcode);
        return resetcode;
    }

    /*
        API return a message providing information regarding the password update status.
        @param: email: String, reset: string, password: string
        @return: respForgotPass: String
    */

    forgotPasswordConfirm(email, reset, password): Observable<any>{

        const obj = {
            emailId: email,
            forgetCode: reset,
            password: password
        };

        let respForgotPass = this.httpclient.put(
            baseURL+"trackers/user/forgetpassword",
            obj,
            this.httpOptions);
        console.log(respForgotPass);
        return respForgotPass;
    }

    /*
        API return a message providing information regarding the registration status.
        @param: body: Object
        @return: registerMsg: String
    */

    postRegister(body): Observable<any>{
        
        let registerMsg = this.httpclient.post(
            baseURL+"trackers/user",
            body);
        return registerMsg;
    }
    
    /*
        API sends the PUT request where the user data is updated.
        @param: url: string, img: File
        @return: registerMsg: String
    */

    updateProfile(url, img){
                
        let updateMsg = this.httpclient.put(
            decodeURI(url),
            img, this.httpOptionsformUpdate).
            pipe(
                map((data) => {
                    console.log(data);
                    return data;
                }), catchError( error => {
                    return throwError( 'Something went wrong!' );
                })
            )
        console.log(updateMsg);
        return updateMsg;
    }

    /*
        API take Object as a paramter return a message providing information regarding the password update status.
        @param: password: string, newPassword: string
        @return: registerMsg: String
    */

    updatePassword(password, newPassword){

        const pass = {
            password: password,
            newPassword: newPassword
        };
        
                
        let updateMsg = this.httpclient.post(
            baseURL+"trackers/password/reset",
            pass, this.httpOptions).
            pipe(
                map((data) => {
                    console.log(data);
                    return data;
                }), catchError( error => {
                    return throwError( 'Something went wrong!' );
                })
            )
        console.log(updateMsg);
        return updateMsg;
    }
}
