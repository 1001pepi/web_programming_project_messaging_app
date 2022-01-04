import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';


@Injectable()
export class AuthService {

    constructor(private router: Router, private http: HttpClient){}

    isAdmin:boolean = false;
    isAuth:boolean = false; //boolean for authentication state

    /*This is the service where authentication functons are defined */
    signUpUser(username: string, phoneNumber:string, password: string){

        return new Promise( //asynchronous function
            (resolve, reject) => {
                //Place backend function here
                this.http
                .post(environment.signUp_API_URL, 
                    {
                        username: username, 
                        password: password, 
                        phoneNumber: phoneNumber
                    }
                ).subscribe(
                    (response) =>{
                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    }
                );
            }
        );
    }

    signInUser(username:string, password:string){
        return new Promise( //asynchronous function
            (resolve, reject) => {
                setTimeout(
                () => {
                    this.isAuth = true;
                    resolve(true);
                }, 2000
                );
            }
        );
    }
    backupPassword(email:string){
        return new Promise( //asynchronous function
            (resolve, reject) => {
                //Place backend function here
            }
        );
    }
    signOut() {
        
        this.isAuth = false;
        
    }
}