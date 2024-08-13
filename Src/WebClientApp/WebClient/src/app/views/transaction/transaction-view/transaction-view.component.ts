import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WalletModel } from 'src/app/_models';
import { TransactionService, WalletService } from 'src/app/_services';

@Component({
    selector: 'app-transaction-view',
    host: { class: 'childRouteFlex' },
    templateUrl: './transaction-view.component.html',
    styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent {
    isEditingTransaction: any;
    firstLoad: any;
    isCreatingCategory: boolean = false;

    constructor(
        public location: Location,
        public transactionService: TransactionService,
        public walletService: WalletService,
        public route: ActivatedRoute
    ) {
        if (walletService.wallets.length == 0)
            walletService.getWalletsFromServer().subscribe();
    }

    selectedTransactionId: number | undefined;
    selectedWallet?: WalletModel;
    isReadOnly: boolean = true;

    ngOnInit(): void {
        this.selectedTransactionId = parseInt(
            this.route.snapshot.paramMap.get('id') ?? '0'
        );

        if (this.transactionService.transactions.length == 0) {
            this.transactionService
                .getTransactionsFromServer(true)
                .subscribe(() => {
                    this.transactionService.selectTransaction(
                        this.selectedTransactionId
                    );
                    this.setWalletBySelectedTransaction();
                });
        } else {
            this.transactionService.selectTransaction(
                this.selectedTransactionId
            );
            this.setWalletBySelectedTransaction();
        }
    }

    setSelectedTransactionDate(event: any) {
        if (
            event.target.value != undefined &&
            event.target.value != null &&
            event.target.value != ''
        ) {
            console.log(this.transactionService.selectedTransaction.date);
            this.transactionService.selectedTransaction.date = new Date(
                event.target.value
            );
        }
    }

    selectWallet($event: WalletModel) {
        if ($event.id != undefined && $event.id != null)
            this.transactionService.selectedTransaction.idWallet = $event.id;
    }

    setTransactionType(type: boolean) {
        this.transactionService.selectedTransaction.isIncome = type;
    }

    setTransactionTypeByCheckbox($event: Event) {
        this.setTransactionType(!(<HTMLInputElement>$event.target).checked);
    }

    setWalletBySelectedTransaction() {
        this.selectedWallet = this.walletService.wallets.find(
            (wallet) =>
                wallet.id ==
                this.transactionService.selectedTransaction.idWallet
        );
    }

    changeDate($event: Date) {
        this.transactionService.selectedTransaction.date = $event;
    }

    editTransaction() {
        this.isReadOnly = false;
        this.firstLoad = false;
    }

    confirmEditTransaction() {
        this.isReadOnly = true;
        this.transactionService
            .updateTransaction(this.transactionService.selectedTransaction)
            .subscribe();
    }
    cancelEditTransaction() {
        this.isReadOnly = true;
        this.transactionService
            .getTransactionsFromServer(true)
            .subscribe(() => {
                this.transactionService.selectTransaction(
                    this.selectedTransactionId
                );
                this.setWalletBySelectedTransaction();
            });
    }


    createNewCategory() {
		if(this.isCreatingCategory)
	        this.isCreatingCategory = false;
		else
			this.isCreatingCategory = true;
    }
    cancelNewCategory() {
        this.isCreatingCategory = false;
    }
}
