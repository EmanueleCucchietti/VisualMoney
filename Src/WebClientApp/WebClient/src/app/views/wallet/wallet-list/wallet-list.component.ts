import { Component } from '@angular/core';
import { WalletService } from 'src/app/_services';

@Component({
  selector: 'app-wallet-list',
  templateUrl: './wallet-list.component.html',
  styleUrls: ['./wallet-list.component.css']
})
export class WalletListComponent {

  constructor(public walletService : WalletService) {
	if(walletService.wallets.length == 0)
		walletService.getWalletsFromServer().subscribe();
  }

}
