import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import { ConversationService } from '../services/conversation.service';
import { ContactService} from '../services/contact.service';


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

  constructor(private router:Router, private conversationService: ConversationService, private contactService: ContactService){ }
  

  ngOnInit(): void {
  }

  writeMessage(){
    this.conversationService.createConversation(this.id)
    
    this.router.navigate(['/core/conversations/0']);
  }

  onDeleteContact():void{
    this.contactService.deleteContact(this.id);

  }

  onModifyContacts():void{

  }

}
