import { User } from "../../user";

export class SignupRequestDto {
	public email: string;
	public username: string;
	public name: string;
	public surname: string;
    public password: string;

	constructor(
		user: User,
		password: string
	) {
		this.email = user.email;
		this.username = user.username;
		this.name = user.name;
		this.surname = user.surname;
		this.password = password;
	}


}
