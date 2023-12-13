import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletModel } from 'src/app/_models';
import { WalletService } from 'src/app/_services';

@Component({
    selector: 'app-wallet-create',
	host: { 'class': 'childRouteFlex' },
    templateUrl: './wallet-create.component.html',
    styleUrls: ['./wallet-create.component.css']
})
export class WalletCreateComponent {
    constructor(public walletService: WalletService, private router: Router) {}

    addWallet() {
        this.walletService.addWallet().subscribe((wallet: WalletModel) => {
            console.log(wallet);
            this.router.navigate(['/wallet']);
        });
    }
}
