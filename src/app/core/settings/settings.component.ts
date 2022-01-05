import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currentUser: User = new User('675454554','jesuisaw');
  isShow: boolean= false;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {

    const token:any =localStorage.getItem('token')
   
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const pushPromise = new Promise( //asynchronous function
      (resolve, reject) => {
          //Place backend function here
          this.http
          .get(environment.users_API_URL + localStorage.getItem('userId'),
            {
              headers: reqHeader 
            }
          ).subscribe(
              (response:any) =>{
                  this.currentUser = new User(response.phoneNumber, response.username)
                  resolve(response);
              },
              (error) => {
                  reject(error);
              }
          );
      }
    ).then(
      (response:any) => {
        console.log(response)
      },
      (error:any) => {

      }
    )

  }

  onSubmit(form:NgForm){

  }

  onModify(){
    if(this.isShow){
      this.isShow = false;
    } else{
      this.isShow = true;
    }
    
  }
}
