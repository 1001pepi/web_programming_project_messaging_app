import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conversation } from 'src/app/models/conversation.model';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ConversationService } from '../services/conversation.service';
import { ContactService } from '../services/contact.service';
import { NgForm } from '@angular/forms';
import { Contact } from 'src/app/models/contact.model';



@Component({
  selector: 'app-contacts-list-item',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.scss']
})
export class ContactsListItemComponent implements OnInit {
  @Input() id:string | null = '';
  @Input() name:string = "John Doe";
  @Input() number:string = "6700000876"; 
  @Input() photo:string = '';

  constructor(private router:Router, private conversationService: ConversationService, private http:HttpClient, private contactService:ContactService){ }

  ngOnInit(): void {

  }

  writeMessage(){

    const token:any =localStorage.getItem('token')
   
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const pushPromise = new Promise( //asynchronous function
      (resolve, reject) => {
          //Place backend function here
          this.http
          .get(environment.discussions_API_URL + this.id,
            {
              headers: reqHeader 
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
    ).then(
      (response:any) => {
        console.log("hi")
        if(response.status === 404){

        }else{
          this.router.navigate(['/core/conversations/' + response._id]);
        }
      },
      (error:any) => {
        this.conversationService.createConversation(this.id);
        this.conversationService.listDiscussions();
        this.writeMessage();
      }
    )
  }

  onDeleteContact():void{
    this.contactService.deleteContact(this.id);
  }

  onSubmit(form: NgForm) {
    const name = form.value['name'];
    const number = form.value['number'];
    const photo = form.value['photo'];
    const contact = new Contact (number, name, photo)
    this.contactService.modifyContact(this.id, contact);
    form.resetForm();
  }

}
