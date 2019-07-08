import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  Email: string;
  Password: string;
  loginErrorMsg;


  @ViewChild('emailRef')emailRefElement: ElementRef;

  ngAfterViewInit() {
    this.emailRefElement.nativeElement.focus();
  }



  constructor(private authservice: AuthService) {
  }

  ngOnInit() {}

  onSubmit(form: NgForm){
    this.Email = form.value.email;
    this.Password = form.value.password;

    this.authservice.loginUser(this.Email, this.Password).catch(
          error => {
              this.loginErrorMsg = error.message;
          }

      );


  }




}
