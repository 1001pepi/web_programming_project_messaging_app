import { Injectable } from '@angular/core';
import { Conversation } from '../../models/conversation.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Contact } from 'src/app/models/contact.model';


@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http: HttpClient) { }

  conversationSubject = new Subject<Conversation[]>();
  public conversations: Conversation[] = [];

  emitConversations() {
    this.conversationSubject.next(this.conversations.slice());
  }


  createConversation(receiver:string | null){
    const token:any =localStorage.getItem('token')
   
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const pushPromise = new Promise( //asynchronous function
      (resolve, reject) => {
          //Place backend function here
          this.http
          .post(environment.discussions_API_URL,
            {
              receiver:receiver
            },
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
      },
      (error:any) => {

      }
    )
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
        
        this.emitConversations();
      },
      (error:any) => {

      }
    )
  }


  addConversation(conversation: Conversation) {
    this.conversations.push(conversation);
    this.emitConversations();
  }


  deleteContact(conversation: Conversation){
    ////
    this.emitConversations();
  }


  modifyContact(conversation: Conversation){
    //////////
    this.emitConversations();
  }
}
