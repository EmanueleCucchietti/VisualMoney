export class User{
  id : number | undefined;
  username : string;
  email : string;
  name : string;
  surname : string;
  role : string | undefined;

  constructor(
    username : string,
    email : string,
    name : string,
    surname : string,
  ){
    this.username = username;
    this.email = email;
    this.name = name;
    this.surname = surname;
  }
}
