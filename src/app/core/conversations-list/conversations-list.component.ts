import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ConversationService } from '../services/conversation.service';

@Component({
  selector: 'app-conversations-list',
  templateUrl: './conversations-list.component.html',
  styleUrls: ['./conversations-list.component.scss']
})
export class ConversationsListComponent implements OnInit {

  constructor(private router: Router, private conversationService:ConversationService) { }
  conversations:any[]=[
    {nom: 'JFK', message:'Hey you fella !'},
    {nom: 'John Doe', message:'Hope u ok'},
    {nom: 'Lara Scott', message:'ETA: 5min'},
    ];

  ngOnInit(): void {
  }

  onViewConv(id:number){
    this.router.navigate(['core', 'conversations',id]);
  }

}
