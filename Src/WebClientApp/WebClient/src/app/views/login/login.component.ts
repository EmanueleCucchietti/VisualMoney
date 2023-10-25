import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username : string = '';
  password : string = '';

  constructor() {
    console.log('LoginComponent constructor');
  }

  login(){
    alert(
      'Username: ' + this.username + '\n' +
      'Password: ' + this.password
    );
  }
}
