import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';

import { Contact} from '../../models/contact.model';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient){}

  contactSubject = new Subject<Contact[]>();
  private contacts: Contact[] = [new Contact('654454354','John DOE')];

  emitContacts() {
    this.contactSubject.next(this.contacts.slice());
  }


  addContact(contact: Contact) {
    console.log(contact)

    const token:any =localStorage.getItem('token')
   

    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    
    console.log(localStorage.getItem('token'))
    console.log(reqHeader)

    const pushPromise = new Promise( //asynchronous function
      (resolve, reject) => {
          //Place backend function here
          this.http
          .post(environment.contacts_API_URL,
            {
              phoneNumber: contact.number,
              name: contact.name
            },{
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
    );

    this.contacts.push(contact);
    this.emitContacts();
  }


  deleteContact(contact: Contact){
    ////
    this.emitContacts();
  }
  modifyContact(contact: Contact, name:string, number:string, photo:string){
    //////////
    this.emitContacts();
  }

}
