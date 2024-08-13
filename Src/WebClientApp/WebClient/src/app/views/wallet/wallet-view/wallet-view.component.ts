import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GraphicFunctions } from 'src/app/_helpers/graphic-functions';
import { WalletModel } from 'src/app/_models';
import { TransactionModel } from 'src/app/_models/Transaction/transactionModel';
import { WalletService } from 'src/app/_services';
import { TransactionService } from 'src/app/_services/transaction/transaction.service';

@Component({
    selector: 'app-wallet-view',
    host: { 'class': 'childRouteFlex' },
    templateUrl: './wallet-view.component.html',
    styleUrls: ['./wallet-view.component.css']
})
export class WalletViewComponent {
    constructor(
        public walletService: WalletService,
        private transactionService: TransactionService,
        private route: ActivatedRoute,
        private router: Router,
        private elRef: ElementRef
    ) {

    }

    transactions: TransactionModel[] = [];
    loadingTransactions: boolean = true;
    private currentWalletId: number | null = null;

    ngAfterViewInit(): void {
        this.transactions = [];
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
            .getTransactionsByWalletId(this.currentWalletId ?? 0, true)
            .subscribe((transactions: TransactionModel[]) => {
                this.transactions = transactions;
                this.transactions.sort((a, b) => (a.date > b.date ? -1 : 1));
                this.loadingTransactions = false;
            });



        /* Logic for CREATE TRANSACTION */
        this.buttonCreate =
            this.elRef.nativeElement.querySelector('#buttonCreate');
        this.buttonCreateBefore = window.getComputedStyle(
            this.buttonCreate,
            ':before'
        );
        this.buttonCreate.addEventListener('mousemove', (e: any) => {
            const rect = this.buttonCreate.getBoundingClientRect(),
                mouseX = e.clientX - rect.left,
                mouseY = e.clientY - rect.top;

            // set width and height of the before element
            // based on the mouse position, the more the posizion is close to the center the more the element is small
            const width = Math.abs(rect.width / 2 - mouseX) / 2 + 25;
            // height change only of an amount of 20 %, the rest is based on the width
            const height = Math.abs(rect.height / 2 - mouseY) + width * 0.2;

            this.buttonCreate.style.setProperty('--width', width + 'px');
            this.buttonCreate.style.setProperty('--height', height + 'px');

            let x = mouseX - width / 2;
            let y = mouseY - height / 2;

            this.buttonCreate.style.setProperty('--mouse-x', x + 'px');
            this.buttonCreate.style.setProperty('--mouse-y', y + 'px');

            console.log(rect.width, mouseX - rect.left);
            let progress = (mouseX * 100) / rect.width;
            this.buttonCreate.style.setProperty('--background-color', GraphicFunctions.blendColors('#00bfa5', '#ff1744', progress),);
        });


        /* END Logic for CREATE TRANSACTION */
    }

    editWallet() {
        this.router.navigate(['/wallet/edit/' + this.currentWalletId]);
    }


    /* Logic for CREATE TRANSACTION */

    showButtonChoseIsIncome = false;
    firstLoad = true;

    buttonCreate: any;
    buttonCreateBefore: any;

    createTransaction() {
        this.showButtonChoseIsIncome = !this.showButtonChoseIsIncome;
        this.firstLoad = false;
    }

    setTransactionType(type: boolean) {
        this.transactionService.newTransaction.isIncome = type;
        this.transactionService.newTransaction.idWallet = this.walletService.selectedWallet.id!;
        console.log(this.transactionService.newTransaction);
    }
}
