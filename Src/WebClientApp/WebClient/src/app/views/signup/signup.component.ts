import { Component } from '@angular/core';
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

	usernameError: boolean = false;
	emailError: boolean = false;

    constructor(private authService: AuthenticationService) {}

    step = 0;

    signup() {
        let user = new User(this.username, this.email, this.name, this.surname);

        let signupRequestDto: SignupRequestDto = new SignupRequestDto(
            user,
            this.password
        );
        console.log(signupRequestDto);
        // let loginRequestDto = new LoginRequestDto(user, this.password);
        // this.authenticationService.signup(loginRequestDto).subscribe(
        //   (response) => {
        //     console.log(response);
        //   },
        //   (error) => {
        //     console.log(error);
        //   }
        // );
    }

    next() {
        switch (this.step) {
            case 0:
                if (this.validateStep0()) {
                    this.step++;
                    this.passToStep1();
                } else {
                    alert('Invalid email or username');
                }
                break;
            case 1:
                if (this.validateStep1()) {
                    this.step++;
                    this.passToStep2();
                } else {
                    alert('Invalid name or surname');
                }
                break;
            case 2:
                if (this.validateStep2()) {
                    this.signup();
                } else {
                    alert(
                        'Invalid password. Must be at least 8 characters long'
                    );
                }
                break;
        }
    }

    back() {
        if (this.step > 0) {
            this.step--;
        }
    }

    validateStep0() {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const alphanumericRegex: RegExp = /^[a-zA-Z0-9]+$/;

        return (
            emailRegex.test(this.email) && alphanumericRegex.test(this.username)
        );
    }
    validateStep1() {
        const alphanumericRegex: RegExp = /^[a-zA-Z0-9]+$/;

        return (
            alphanumericRegex.test(this.name) &&
            alphanumericRegex.test(this.surname)
        );
    }
    validateStep2() {
        return this.password.length > 8;
    }

    passToStep1() {}

    passToStep2() {}

    checkUsername($event: any) {
		if(this.username.length == 0) {
			this.usernameError = false;
			return;
		}

        this.authService.isUsernameAvailable(this.username).subscribe({
            next: (response) => {
                console.log(response);
				this.usernameError = !response;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    checkEmail($event: any) {
		if(this.email.length == 0) {
			this.emailError = false;
			return;
		}

        this.authService.isEmailAvailable(this.email).subscribe({
            next: (response) => {
                console.log(response);
				this.emailError = !response;
            },
            error: (err) => {
                console.log(err);
            }
        });
    }
}
