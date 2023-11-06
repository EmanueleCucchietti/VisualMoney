export class User{
  id : number;
  username : string;
  email : string;
  name : string;
  surname : string;
  role : string;

  constructor(
    id : number,
    username : string,
    email : string,
    name : string,
    surname : string,
    role : string,
  ){
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.surname = surname;
    this.role = role;
  }
}
