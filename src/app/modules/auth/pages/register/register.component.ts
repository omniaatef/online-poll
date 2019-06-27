import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { analyzeAndValidateNgModules, getParseErrors } from '@angular/compiler';
import { AuthService } from 'src/app/core/services/auth.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string;
  lastName: string;
  Email: string;
  password: string;

  constructor(private authservice: AuthService) { }

  ngOnInit() {
  }
  get errorMessage(): string{
    return this.authservice.errorMessage;
  }


  onSubmit(form: NgForm){
    this.firstName = form.value.firstName;
    this.lastName = form.value.lastName;
    this.Email = form.value.emailAddress;
    this.password = form.value.password;

    console.log(this.firstName, this.lastName, this.Email, this.password);

    this.authservice.registerUser(this.Email, this.password);
    
  }


}
