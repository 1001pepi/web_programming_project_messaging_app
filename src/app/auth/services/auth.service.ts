import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

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
                this.http
                .post(environment.signIn_API_URL, 
                    {
                        username: username, 
                        password: password,
                    }
                ).subscribe(
                    (response: any): void => {
                        if(response.status !== 401){
                            this.isAuth = true;
                            localStorage.setItem('isAuth', 'true')
                            localStorage.setItem('token', response.token)
                        }

                        resolve(response);
                    },
                    (error) => {
                        reject(error);
                    }
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

        localStorage.removeItem('isAuth')
        localStorage.removeItem('token')
    }
}