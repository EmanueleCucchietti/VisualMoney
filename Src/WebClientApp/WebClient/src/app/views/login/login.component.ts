import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/_services';
import { LoginRequestDto } from 'src/app/_models';
import { first } from 'rxjs';
import { Router } from '@angular/router';

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
        this.authService
            .login(this.loginRequestData)
            .pipe(first())
            .subscribe({
                next: (res) => {
                    console.log(res);
					alert('Successfully logged in');
					this.router.navigate(['/']);
                },
                error: (err) => {
                    console.log(err);
					alert('Error while logging in: ' + err);
                }
            });
    }

    constructor(private authService: AuthenticationService,
		private router: Router) {}
}
