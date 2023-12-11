import { Component } from '@angular/core';
import { WalletService } from 'src/app/_services';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

  constructor(public walletService : WalletService) { }

}
