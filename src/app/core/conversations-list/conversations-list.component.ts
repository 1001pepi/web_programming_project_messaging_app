import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Contact } from 'src/app/models/contact.model';
import { Conversation } from 'src/app/models/conversation.model';
import { environment } from 'src/environments/environment';
import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {

  constructor(private router: Router, private conversationService:ConversationService, private http:HttpClient) { }
  conversations:Conversation[] = this.conversationService.conversations

  ngOnInit(): void {
    this.conversationService.listDiscussions();
    this.listDiscussions()
  }


  listDiscussions(){
    const token:any =localStorage.getItem('token')
   
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const pushPromise = new Promise( //asynchronous function
      (resolve, reject) => {
          //Place backend function here
          this.http
          .get(environment.discussions_API_URL,
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
        console.log(response)

        this.conversations = response.map(function(conversation:any){
          return new Conversation(new Contact(conversation.receiver.phoneNumber, conversation.receiver.name, conversation.receiver._id), conversation.messages, conversation._id);
        })
      },
      (error:any) => {

      }
    )
  }

  onViewConv(id:string | null){
    this.router.navigate(['core', 'conversations',id]);
  }

}
