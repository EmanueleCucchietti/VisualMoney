import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { LoginRequestDto } from 'src/app/_models';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailOrUsername: string = '';
  password: string = '';

  loginRequestData: LoginRequestDto = new LoginRequestDto('', '');

  login() {
    // this.authService.login(this.loginRequestData)
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    this.authService.login(this.loginRequestData)
      .pipe(first())
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });

  }

  constructor(private authService: AuthenticationService) { }
}
