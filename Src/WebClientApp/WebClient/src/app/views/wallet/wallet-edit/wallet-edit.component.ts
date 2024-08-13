import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletModel } from 'src/app/_models';
import { WalletService } from 'src/app/_services';

@Component({
  selector: 'app-wallet-edit',
  host: { 'class': 'childRouteFlex' },
  templateUrl: './wallet-edit.component.html',
  styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent {
	constructor(
        public walletService: WalletService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    private currentWalletId: number | null = null;

    ngOnInit(): void {
        // Access the id parameter from the route snapshot
        this.currentWalletId = parseInt(
            this.route.snapshot.paramMap.get('id') ?? '0'
        );

		if (this.walletService.wallets.length == 0) {
            this.walletService.getWalletsFromServer().subscribe(() => {
                this.walletService.selectWallet(this.currentWalletId ?? 0);
            });
        }
	}

	editWallet() {
		this.walletService.editWallet().subscribe({
            next: (wallet: WalletModel) => {
                console.log(wallet);
                this.router.navigate(['/wallet', this.currentWalletId]);
            },
            error: (err) => {
                alert("errore nel salvataggio delle modifiche riprovare")
            }
        });
	}
}
