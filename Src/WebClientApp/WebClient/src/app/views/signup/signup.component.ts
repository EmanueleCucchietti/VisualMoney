import { Component } from '@angular/core';
import { SignupRequestDto } from 'src/app/_models/';
import { User } from 'src/app/_models/user';

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

    constructor() {}

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
}
