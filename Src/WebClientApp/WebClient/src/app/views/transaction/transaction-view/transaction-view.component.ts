import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { WalletModel } from 'src/app/_models';
import { TransactionService, WalletService } from 'src/app/_services';
import { DropdownWalletComponent } from 'src/app/components/shared/dropdown-wallet/dropdownWallet.component';

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

    @ViewChild(DropdownWalletComponent) dropDownWallet! : DropdownWalletComponent;

    ngAfterViewInit(): void {
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
        {
            this.transactionService.selectedTransaction.idWallet = $event.id;
            let wallet = this.walletService.wallets.find(w => w.id == $event.id);
            if(wallet){
                this.selectedWallet = wallet
                this.transactionService.selectedTransaction.currencyCode = wallet.currencyCode;
            }
        }
    }

    setTransactionType(type: boolean) {
        this.transactionService.selectedTransaction.isIncome = type;
    }

    setTransactionTypeByCheckbox($event: Event) {
        this.setTransactionType(!(<HTMLInputElement>$event.target).checked);
    }

    setWalletBySelectedTransaction() {
        if(this.walletService.wallets.length == 0){
            this.walletService.getWalletsFromServer().subscribe(() => {
                this.setWalletBySelectedTransactionAssign();
            });
        }

        this.setWalletBySelectedTransactionAssign();
    }

    private setWalletBySelectedTransactionAssign(){
        this.selectedWallet = this.walletService.wallets.find(
            (wallet) =>
                wallet.id === this.transactionService.selectedTransaction.idWallet
        );

        if(this.selectedWallet)
            this.transactionService.selectedTransaction.currencyCode = this.selectedWallet.currencyCode;
    }

    changeDate($event: Date) {
        this.transactionService.selectedTransaction.date = $event;
    }

    editTransaction() {
        this.isReadOnly = false;
        this.firstLoad = false;
    }

    confirmEditTransaction() {
        this.dropDownWallet.closeDropdown();
        if(!this.selectedWallet)
        {
            alert("Inserire tutti i campi")
            return;
        }

        this.transactionService.selectedTransaction.idWallet = this.selectedWallet.id ?? -1;

        if(this.transactionService.selectedTransaction.idWallet == -1 ||
			this.transactionService.selectedTransaction.name == "" ||
			this.transactionService.selectedTransaction.amount == 0
			// this.transactionService.selectedTransaction.currencyCode == ""
			)
		{
			alert("Please Insert all Fields");
			console.log(this.transactionService.selectedTransaction);
			return;
		}

        // we get the currency code based on the wallet one
        this.transactionService.selectedTransaction.currencyCode = this.selectedWallet.currencyCode;

        this.isReadOnly = true;
        this.transactionService
            .updateTransaction(this.transactionService.selectedTransaction)
            .subscribe();
    }
    cancelEditTransaction() {
        this.dropDownWallet.closeDropdown();
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
