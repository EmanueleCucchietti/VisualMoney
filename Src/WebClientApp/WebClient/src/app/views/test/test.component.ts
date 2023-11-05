import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import axios from 'axios';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

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

  async refreshToken(){

    await this.authenticationService.getAccessTokenFromRefreshToken();
    alert(this.authenticationService.accessToken);
  }
}
