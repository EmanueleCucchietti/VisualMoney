import { Component } from '@angular/core';
import axios from 'axios';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component {


  constructor(private authenticationService : AuthenticationService) {
  }

  xhrRequest(){
    axios.get('https://localhost:7232/test/authtest', {
      headers: {
        'Authorization': 'Bearer ' + this.authenticationService.accessToken
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }
}
