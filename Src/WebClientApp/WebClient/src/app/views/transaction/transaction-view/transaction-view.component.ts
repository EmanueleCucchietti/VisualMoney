import { Component, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletModel } from 'src/app/_models';
import { TransactionService, WalletService } from 'src/app/_services';
import { DropdownWalletComponent } from 'src/app/components/shared/dropdown-wallet/dropdownWallet.component';
import { CategoryModel } from 'src/app/_models/Category/CategoryModel';
import { CategoryService } from 'src/app/_services/category/category.service';
import { forkJoin, lastValueFrom } from 'rxjs';
import { GenericFunctions } from 'src/app/_helpers';

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
    notPresentCategories: CategoryModel[] = [];
    oldCategories: CategoryModel[] = [];
    newCategoryName = "";

    constructor(
        public location: Location,
        public transactionService: TransactionService,
        public walletService: WalletService,
        public categoryService: CategoryService,
        public route: ActivatedRoute,
        private router: Router
    ) {
        this.prepareData();

        // if (walletService.wallets.length === 0 && categoryService.categories.length === 0) {
        //     forkJoin({
        //         wallets: walletService.getWalletsFromServer(),
        //         categories: categoryService.getCategories()
        //     }).subscribe(() => {
        //         this.getSelectedTransactionData();
        //     });
        // } else if (walletService.wallets.length === 0) {
        //     walletService.getWalletsFromServer().subscribe(() => {
        //         if (categoryService.categories.length !== 0) {
        //             this.getSelectedTransactionData();
        //         }
        //     });
        // } else if (categoryService.categories.length === 0) {
        //     categoryService.getCategories().subscribe(() => {
        //         this.getSelectedTransactionData();
        //     });
        // } else {
        //     this.getSelectedTransactionData();
        // }
    }

    async prepareData() {
        try {
            if (this.walletService.wallets.length === 0)
                await lastValueFrom(this.walletService.getWalletsFromServer());

            if (this.categoryService.categories.length === 0)
                await lastValueFrom(this.categoryService.getCategories())

            await this.getSelectedTransactionData();
        }
        catch (error) {
            console.log(error)
        }
    }

    selectedTransactionId: number | undefined;
    selectedWallet?: WalletModel;
    isReadOnly: boolean = true;

    showEditButtons = true;
    showDeleteButtons = true;

    @ViewChild(DropdownWalletComponent) dropDownWallet!: DropdownWalletComponent;

    ngAfterViewInit(): void {
        this.editTransaction();
    }

    async getSelectedTransactionData() {
        this.selectedTransactionId = parseInt(
            this.route.snapshot.paramMap.get('id') ?? '0'
        );

        if (this.transactionService.transactions.length == 0)
            await lastValueFrom(this.transactionService.getTransactionsFromServer(true))

        this.transactionService.selectTransaction(
            this.selectedTransactionId
        );

        console.log(this.transactionService.selectedTransaction)

        this.oldCategories = [...this.transactionService.selectedTransaction.categories];

        this.notPresentCategories = GenericFunctions.DifferenceCategoryLists(
            this.categoryService.categories,
            this.transactionService.selectedTransaction.categories
        )

        console.log(this.categoryService.categories)
        console.log(this.notPresentCategories)

        this.setWalletBySelectedTransaction();
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
        if ($event.id != undefined && $event.id != null) {
            this.transactionService.selectedTransaction.idWallet = $event.id;
            let wallet = this.walletService.wallets.find(w => w.id == $event.id);
            if (wallet) {
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
        if (this.walletService.wallets.length == 0) {
            this.walletService.getWalletsFromServer().subscribe(() => {
                this.setWalletBySelectedTransactionAssign();
            });
        }

        this.setWalletBySelectedTransactionAssign();
    }

    private setWalletBySelectedTransactionAssign() {
        this.selectedWallet = this.walletService.wallets.find(
            (wallet) =>
                wallet.id === this.transactionService.selectedTransaction.idWallet
        );

        if (this.selectedWallet)
            this.transactionService.selectedTransaction.currencyCode = this.selectedWallet.currencyCode;
    }

    changeDate($event: Date) {
        this.transactionService.selectedTransaction.date = $event;
    }

    editTransaction() {
        this.isReadOnly = false;
        this.firstLoad = false;

        this.showDeleteButtons = false;
    }

    confirmEditTransaction() {
        this.showDeleteButtons = true;
        this.dropDownWallet.closeDropdown();
        if (!this.selectedWallet) {
            alert("Inserire tutti i campi")
            return;
        }

        this.transactionService.selectedTransaction.idWallet = this.selectedWallet.id ?? -1;

        if (this.transactionService.selectedTransaction.idWallet == -1 ||
            this.transactionService.selectedTransaction.name == "" ||
            this.transactionService.selectedTransaction.amount == 0
            // this.transactionService.selectedTransaction.currencyCode == ""
        ) {
            alert("Please Insert all Fields");
            console.log(this.transactionService.selectedTransaction);
            return;
        }

        // we get the currency code based on the wallet one
        this.transactionService.selectedTransaction.currencyCode = this.selectedWallet.currencyCode;

        this.isReadOnly = true;

        forkJoin({
            transaction: this.transactionService
                .updateTransaction(this.transactionService.selectedTransaction),
            categories: this.transactionService.updateCategoriesOnTransaction(
                this.transactionService.selectedTransaction.id!,
                this.transactionService.selectedTransaction.categories.map(category => category.id!)
            )
        }).subscribe(_ => {
            this.walletService.getWalletsFromServer().subscribe();
        })

        // this.transactionService.updateCategoriesOnTransaction(
        //     this.transactionService.selectedTransaction.id!, 
        //     this.transactionService.selectedTransaction.categories
        // )

        // this.transactionService
        //     .updateTransaction(this.transactionService.selectedTransaction)
        //     .subscribe(() => {
        //         // reload wallets
        //         this.walletService.getWalletsFromServer().subscribe();
        //     });
    }

    cancelEditTransaction() {
        this.showDeleteButtons = true;
        this.dropDownWallet.closeDropdown();
        this.isReadOnly = true;
        forkJoin({
            transactions: this.transactionService.getTransactionsFromServer(true),
            categories: this.categoryService.getCategories()
        }).subscribe(() => {
            this.transactionService.selectTransaction(
                this.selectedTransactionId
            );
            this.setWalletBySelectedTransaction();
            this.notPresentCategories = GenericFunctions.DifferenceCategoryLists(this.categoryService.categories,
                this.transactionService.selectedTransaction.categories
            )
        })
        // this.transactionService
        //     .getTransactionsFromServer(true)
        //     .subscribe(() => {
        //         this.transactionService.selectTransaction(
        //             this.selectedTransactionId
        //         );
        //         this.setWalletBySelectedTransaction();
        //     });

        this.notPresentCategories = GenericFunctions.DifferenceCategoryLists(this.categoryService.categories,
            this.transactionService.selectedTransaction.categories
        )
    }


    createNewCategory() {

        if (this.isCreatingCategory)
            this.isCreatingCategory = false;
        else
            this.isCreatingCategory = true;

        // negated condition
        if (this.isCreatingCategory)
            return;

        // test if name already exists
        for (const element of this.categoryService.categories) {
            if (element.name == this.newCategoryName) {
                alert("Inserire un nome non esistente")
                return;
            }
        }

        // add to the server
        let category = new CategoryModel(this.newCategoryName);
        this.categoryService.addCategory(category).subscribe({
            next: (category) => {
                this.transactionService.selectedTransaction.categories.push(category)
            },
            error: (err) => {
                alert("errore nella creazione della categoria. riprovare");
                console.log(err);
            }
        })
    }

    addCategoryToTransaction(category: CategoryModel) {
        this.transactionService.selectedTransaction.categories.push(category)
        this.notPresentCategories.splice(this.notPresentCategories.findIndex(item => item == category), 1)
    }

    removeCategoryFromTransaction(category: CategoryModel) {
        this.transactionService.selectedTransaction.categories.splice(
            this.transactionService.selectedTransaction.categories.findIndex(item => item == category), 1);
        this.notPresentCategories.push(category);
    }

    cancelNewCategory() {
        this.isCreatingCategory = false;
    }

    tryDeleteEventHandler() {
        this.showEditButtons = false;
    }

    cancelEventHandler() {
        this.showEditButtons = true;
    }

    deleteTransaction() {
        this.showEditButtons = true;
        if (!this.selectedTransactionId) {
            alert("Errore nella cancellazione, riprovare.");
            window.location.reload();
            return;
        }
        this.transactionService.deleteTransaction(this.selectedTransactionId).subscribe({
            next: () => {
                this.router.navigate(["/transaction"]);
            }
            ,
            error: () => {
                alert("Errore nella cancellazione. Riprovare.");
                window.location.reload()
            }
        });
    }

}
