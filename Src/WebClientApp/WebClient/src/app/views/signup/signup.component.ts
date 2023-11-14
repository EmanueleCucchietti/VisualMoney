import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, lastValueFrom } from 'rxjs';
import { SignupRequestDto } from 'src/app/_models/';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent {
    email: string = '';
    username: string = '';
    name: string = '';
    surname: string = '';
    password: string = '';

    isLevel1error: boolean = false;
    level1errorMessage: string = '';
    isLevel0error: boolean = false;
    level0errorMessage: string = '';

    constructor(
        private authService: AuthenticationService,
        private router: Router
    ) {}

    step = 0;

    signup() {
        let user = new User(this.username, this.email, this.name, this.surname);

        let signupRequestDto: SignupRequestDto = new SignupRequestDto(
            user,
            this.password
        );
        console.log(signupRequestDto);

        this.authService
            .signup(signupRequestDto)
            .subscribe({
                next: (response) => {
                    console.log(response);
					alert('Successfully signed up');
                    this.router.navigate(['/login']);
                },
                error: (err) => {
                    console.log(err);
                    alert('Error while signing up: ' + err);
                }
            });
    }

    next() {
        if (!this.validateStep()) {
            alert('Please fill in all the fields correctly');
            return;
        }

        if (this.step == 2) {
            this.signup();
            return;
        }

        this.step++;
    }

    back() {
        if (this.step > 0) {
            this.step--;
        }
    }

    validateStep() {
        return !this.isLevel0error && !this.isLevel1error;
    }

    checkUsername($event: any) {
        const alphanumericRegex: RegExp = /^[a-zA-Z0-9]+$/;
        if (!alphanumericRegex.test(this.username)) {
            this.isLevel1error = true;
            this.level1errorMessage = 'Invalid username';
            return;
        }

        this.isLevel1error = false;

        this.authService.isUsernameAvailable(this.username).subscribe({
            next: (response) => {
                console.log(response);
                if (!response) {
                    this.isLevel1error = true;
                    this.level1errorMessage = 'Username already in use';
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    checkEmail($event: any) {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.email)) {
            this.isLevel0error = true;
            this.level0errorMessage = 'Invalid email';
            return;
        }

        this.isLevel0error = false;

        this.authService.isEmailAvailable(this.email).subscribe({
            next: (response) => {
                console.log(response);
                if (!response) {
                    this.isLevel0error = true;
                    this.level0errorMessage = 'Email already in use';
                }
            },
            error: (err) => {
                console.log(err);
                this.isLevel0error = true;
                this.level0errorMessage = 'Error checking email';
            }
        });
    }

    checkName($event: any) {
        const alphanumericRegex: RegExp = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(this.name)) {
            this.isLevel0error = true;
            this.level0errorMessage = 'Invalid name';
            return;
        }

        this.isLevel0error = false;
    }

    checkSurname($event: any) {
        const alphanumericRegex: RegExp = /^[a-zA-Z0-9]+$/;

        if (!alphanumericRegex.test(this.surname)) {
            this.isLevel1error = true;
            this.level1errorMessage = 'Invalid surname';
            return;
        }

        this.isLevel1error = false;
    }

    checkPassword($event: any) {
        if (this.password.length < 4) {
            this.isLevel1error = true;
            this.level1errorMessage =
                'Password must be at least 8 characters long';
            return;
        }

        this.isLevel1error = false;
    }
}
