import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { ConversationService } from '../services/conversation.service';
import { Conversation } from 'src/app/models/conversation.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-single-conversation',
  templateUrl: './single-conversation.component.html',
  styleUrls: ['./single-conversation.component.scss']
})
export class SingleConversationComponent implements OnInit {
  conversation:Conversation | undefined;
  id:string='';
  nomContact:string='John DOE';
  messages:any[] = []
  constructor(private route: ActivatedRoute, private conversationService:ConversationService, private http:HttpClient) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    const tmpId:string = this.id;
    this.conversation = this.conversationService.conversations.filter(function(conversation:Conversation){
      return conversation.id === tmpId;
    })[0]
    this.nomContact = this.conversation.receiver.name
    this.messages = this.conversation.messages.map(function(message:any){
      return message.text;
    })
  }


  onSubmit(form: NgForm) {
    const message = form.value['message'];

    const token:any =localStorage.getItem('token')
   
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    console.log(this.conversation?.receiver)

    const pushPromise = new Promise( //asynchronous function
      (resolve, reject) => {
          //Place backend function here
          this.http
          .post(environment.messages_API_URL,
            {
              receiver:this.conversation?.receiver.id,
              receiverPhoneNumber: this.conversation?.receiver.number,
              text: message
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
        this.messages.push(response.text)
      },
      (error:any) => {

      }
    )

    console.log(message);
    form.resetForm();
  }

}
