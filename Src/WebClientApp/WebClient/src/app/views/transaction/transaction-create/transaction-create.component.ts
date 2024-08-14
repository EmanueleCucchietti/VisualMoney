import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WalletModel } from 'src/app/_models';
import { TransactionModel } from 'src/app/_models/Transaction/transactionModel';
import { WalletService } from 'src/app/_services';
import { TransactionService } from 'src/app/_services/transaction/transaction.service';

@Component({
    selector: 'app-transaction-create',
    host: { class: 'childRouteFlex' },
    templateUrl: './transaction-create.component.html',
    styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent {

    newWallet : WalletModel | undefined

    constructor(
        public transactionService: TransactionService,
        public walletService: WalletService,
		public router: Router
    ) {
        if (walletService.wallets.length == 0) {
            walletService.getWalletsFromServer().subscribe(() => {
				console.log(walletService.wallets);
            });
        }   

        if(transactionService.newTransaction.idWallet != undefined){
            let wallet = walletService.wallets.find(wallet => wallet.id == transactionService.newTransaction.idWallet)

            if(wallet != undefined)
                this.newWallet = wallet
        }
    }

    selectedWallet: WalletModel = new WalletModel();

    addTransaction() {
		this.transactionService.newTransaction.idWallet = this.selectedWallet.id ?? -1;
		if(this.transactionService.newTransaction.idWallet == -1 ||
			this.transactionService.newTransaction.name == "" ||
			this.transactionService.newTransaction.amount == 0
			// this.transactionService.newTransaction.currencyCode == ""
			)
		{
			alert("Please Insert all Fields");
			console.log(this.transactionService.newTransaction);
			return;
		}

        // we get the currency code based on the wallet one
        this.transactionService.newTransaction.currencyCode = this.selectedWallet.currencyCode;

		this.transactionService.addTransaction().subscribe((res) => {
			console.log(res);
			this.transactionService.newTransaction = new TransactionModel();
			this.selectedWallet = new WalletModel();
			this.router.navigate(['/transaction']);
		});
    }


    setTransactionType(type: boolean) {
        this.transactionService.newTransaction.isIncome = type;
    }

    setTransactionTypeByCheckbox($event: Event) {
        this.setTransactionType(!(<HTMLInputElement>$event.target).checked);
    }

	selectWallet($event: WalletModel) {
        this.selectedWallet = $event;
	}
}


