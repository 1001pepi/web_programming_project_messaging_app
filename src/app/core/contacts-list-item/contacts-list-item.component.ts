import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts-list-item',
  templateUrl: './contacts-list-item.component.html',
  styleUrls: ['./contacts-list-item.component.scss']
})
export class ContactsListItemComponent implements OnInit {
  @Input() id:number=0;
  @Input() name:string = "John Doe";
  @Input() number:string = "6700000876";
  @Input() photo:string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
