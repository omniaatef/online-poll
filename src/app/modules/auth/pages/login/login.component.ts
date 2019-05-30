import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Email: string;
  Password: string;

  constructor(private authservice: AuthService) {
  }

  ngOnInit() {}

  onSubmit(form: NgForm){
    this.Email = form.value.email;
    this.Password = form.value.password;
    console.log('login', this.Email);
    console.log('login', this.Password);

    this.authservice.loginUser(this.Email, this.Password);



  }



}
