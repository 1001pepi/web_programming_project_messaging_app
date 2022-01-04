import { Component, OnInit } from '@angular/core';
import {  FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import  checkPassword  from '../validators/checkPassword';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm : FormGroup = this.fb.group({ });
  signupMessage: string = '';
  
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router:Router) { 
    
  }
  get phone(){
    return this.signupForm.get('phone');
  }
  get password(){
    return this.signupForm.get('password');
  }

  onSubmit(): void {
    var username = this.signupForm.get('username')!.value;
    var password = this.signupForm.get('password')!.value;
    var phone = this.signupForm.get('phone')!.value;

    this.authService.signUpUser(username, phone, password)
    .then(
      () => {this.router.navigate(['/auth/signin']);},
      
      (error) => {
        console.log(error)
        this.signupMessage = error.error['error'].split(",")[0].split(":")[2];
        this.router.navigate(['/auth/signup']);
       }
    )
  }
  initForm(){
    this.signupForm = this.fb.group({
      username: [],
      phone: ['', [Validators.required, Validators.pattern("^6[0-9]{8}")]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^.*[~!@#$%^&*|]+.*$")]],
      passwordConfirmation: ['', [Validators.required]]
    },
    {
      validators: [checkPassword]
    });
  }
  ngOnInit(): void {
    this.initForm();
  }
  

  
}
