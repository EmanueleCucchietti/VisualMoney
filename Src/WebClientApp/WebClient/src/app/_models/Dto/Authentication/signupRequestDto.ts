import { User } from "../../user";

export class SignupRequestDto{
  public User : User;
  public password: string;

  constructor(User: User, password: string){
    this.User = User;
    this.password = password;
  }
}
