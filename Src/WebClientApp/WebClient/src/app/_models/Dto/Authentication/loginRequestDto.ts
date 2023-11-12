export class LoginRequestDto {
    public emailOrUsername: string;
    public password: string;

    constructor(emailOrUsername: string, password: string) {
        this.emailOrUsername = emailOrUsername;
        this.password = password;
    }
}
