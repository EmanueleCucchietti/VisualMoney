import { Component } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  constructor(
    private authenticationService : AuthenticationService,
    private httpClient : HttpClient) {
  }

  xhrRequest(){
    this.httpClient.get(`${environment.serverApiUrl}/test/authtest`)
    .subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.log(error);
      }
    });
  }

  async refreshToken(){

    await this.authenticationService.getAccessTokenFromRefreshToken()
    alert(this.authenticationService.accessToken);
  }

  logout () {
    this.authenticationService.setEmptyAccessToken();
    }
}
