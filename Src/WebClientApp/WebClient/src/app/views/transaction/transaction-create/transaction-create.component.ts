import { Component } from '@angular/core';
import { WalletModel } from 'src/app/_models';
import { WalletService } from 'src/app/_services';
import { TransactionService } from 'src/app/_services/transaction/transaction.service';

@Component({
    selector: 'app-transaction-create',
    host: { class: 'childRouteFlex' },
    templateUrl: './transaction-create.component.html',
    styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent {

    showButtonChoseIsIncome = false;

    addTransaction() {
		this.transactionService.newTransaction.idWallet = this.selectedWallet.id ?? -1;
		if(this.transactionService.newTransaction.idWallet == -1 ||
			this.transactionService.newTransaction.name == "" ||
			this.transactionService.newTransaction.amount == 0 ||
			this.transactionService.newTransaction.currencyCode == ""
			)
		{
			alert("Please select wallet");
			console.log(this.transactionService.newTransaction);
			return;
		}
		this.transactionService.addTransaction().subscribe((res) => {
			console.log(res);
		});
    }

    constructor(
        public transactionService: TransactionService,
        public walletService: WalletService
    ) {
        if (walletService.wallets.length == 0) {
            walletService.getWalletsFromServer().subscribe(() => {
				console.log(walletService.wallets);
            });
        }
    }

    selectedWallet: WalletModel = new WalletModel();

    CreateTransaction() {
        this.showButtonChoseIsIncome = !this.showButtonChoseIsIncome;
    }

    setTransactionType(type: boolean) {
        this.transactionService.newTransaction.isIncome = type;
    }

    setTransactionTypeByCheckbox($event: Event) {
        this.setTransactionType(!(<HTMLInputElement>$event.target).checked);
    }

    showDropdown = false;

	test($event: WalletModel) {
        this.selectedWallet = $event;
	}
}


