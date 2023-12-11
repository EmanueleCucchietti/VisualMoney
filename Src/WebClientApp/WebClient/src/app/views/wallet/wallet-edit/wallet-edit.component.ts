import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletModel } from 'src/app/_models';
import { WalletService } from 'src/app/_services';

@Component({
    selector: 'app-wallet-edit',
    templateUrl: './wallet-edit.component.html',
    styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent {

    constructor(
        public walletService: WalletService,
        private route: ActivatedRoute,
		private router: Router
    ) {
        if (walletService.wallets.length == 0) {
            walletService.getWalletsFromServer().subscribe(() => {
				walletService.selectWallet(this.currentWalletId ?? 0);
			});
        }

    }

	private currentWalletId: number | null = null;

    ngOnInit(): void {
        // Access the id parameter from the route snapshot
        this.currentWalletId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0');
	}

	editWallet() {
		// console.log(this.selectedWallet);
		// // router to /wallet/

		this.walletService
			.editWallet()
			.subscribe((wallet: WalletModel) => {
				console.log(wallet);
				this.router.navigate(['/wallet']);
			});
	}
}
