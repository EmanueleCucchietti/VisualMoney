import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletModel } from 'src/app/_models';
import { TransactionModel } from 'src/app/_models/Transaction/transactionModel';
import { WalletService } from 'src/app/_services';
import { TransactionService } from 'src/app/_services/transaction/transaction.service';

@Component({
    selector: 'app-wallet-edit',
	host: { 'class': 'childRouteFlex' },
    templateUrl: './wallet-edit.component.html',
    styleUrls: ['./wallet-edit.component.css']
})
export class WalletEditComponent {
    constructor(
        public walletService: WalletService,
        private transactionService: TransactionService,
        private route: ActivatedRoute,
        private router: Router
    ) {

    }

    transactions: TransactionModel[] = [];
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

        this.transactionService
            .getTransactionsByWalletId(this.currentWalletId ?? 0)
            .subscribe((transactions: TransactionModel[]) => {
                this.transactions = transactions;
            });
    }

    editWallet() {
        // console.log(this.selectedWallet);
        // // router to /wallet/

        // this.walletService.editWallet().subscribe((wallet: WalletModel) => {
        //     console.log(wallet);
        //     this.router.navigate(['/wallet']);
        // });

		this.transactions.push(...this.transactions);
    }
}
