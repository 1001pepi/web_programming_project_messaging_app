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
  private contacts: Contact[] = [];

  emitContacts() {
    this.contactSubject.next(this.contacts.slice());
  }

  listContacts(){
    const token:any =localStorage.getItem('token')
   
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

    const pushPromise = new Promise( //asynchronous function
      (resolve, reject) => {
          //Place backend function here
          this.http
          .get(environment.contacts_API_URL,
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

        this.contacts = response.map(function(contact:any){
            return new Contact(contact.phoneNumber, contact.name, contact._id);
        })
        
        this.emitContacts();
      },
      (error:any) => {

      }
    )

  }


  addContact(contact: Contact) {
    const token:any =localStorage.getItem('token')
   
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    });

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
    ).then(
      (response:any) => {
        console.log(response)
        const createdContact:Contact = new Contact(response.name, response.phoneNumber, response._id)
        this.contacts.push(createdContact);
        this.emitContacts();
        this.listContacts();
      },
      (error:any) => {

      }
    )
  }


  deleteContact(contactId: string | null){
    ////
    const token:any = localStorage.getItem('token')
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token,
        'Content-Type':'application/json',
        
        }),
        
    };

    const env = environment.contacts_API_URL + contactId
    
    const pushPromise= new Promise( //asynchronous function
      (resolve, reject) => {
        
          //Place backend function here
          this.http
          .delete(env, 
              
              httpOptions
          ).subscribe(
            (response) => {
              console.log("contact supprimé")
              
              
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
        this.listContacts();
        this.emitContacts();
      },
      (error:any) => {

      }
    )
  }

  modifyContact(id: any, contact:Contact){
    const token:any = localStorage.getItem('token')
    const env = environment.contacts_API_URL + id
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': token,
        'Content-Type':'application/json',
        
        }),
        
    };

    const pushPromise= new Promise( //asynchronous function
      (resolve, reject) => {
        console.log("hello les gens")
          //Place backend function here
          this.http
          .put(env,
            {
              name: contact.name,
              phoneNumber: contact.number,
               
                //owner: contact.name Je vais changer lorsque ça va fonctionner
            }, 
              httpOptions
          ).subscribe(
            (response) => {
              console.log("contact changé")
              
              
                  resolve(response);
              },
              (error) => {
                  reject(error);
                  console.log("hello les gens2")
              }
          );
      }
  ).then(
      (response:any) => {
        console.log(response)
        this.emitContacts();
        this.listContacts();
      },
      (error:any) => {

      }
    )
    
    //////////
    this.emitContacts();
  }

}
