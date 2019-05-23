import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AuthService } from 'src/app/core/services/auth.service';

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

  onSubmit(form: NgForm){
    this.firstName = form.value.firstName;
    this.lastName = form.value.lastName;
    this.Email = form.value.emailAddress;
    this.password = form.value.password;

    console.log(this.firstName, this.lastName, this.Email, this.password);

    this.authservice.registerUser(this.Email, this.password);
  }


}
