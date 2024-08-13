import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { TransactionModel } from 'src/app/_models/Transaction/transactionModel';
import { environment } from 'src/app/environments/environment';
import { CategoryService } from '../category/category.service';
import { WalletModel } from 'src/app/_models';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    constructor(public httpClient: HttpClient,
		public categoryService: CategoryService) { }

	loadingTransactions : boolean = false;
	transactions: TransactionModel[] = [];
	selectedTransaction: TransactionModel = new TransactionModel();
	selectedWallet: WalletModel = new WalletModel();
	newTransaction: TransactionModel = new TransactionModel();

	selectTransaction(id: number | undefined) {
		if(typeof id !== 'undefined')
			this.selectedTransaction = this.transactions.find((transaction) => transaction.id == id)!;
		else
			this.selectedTransaction = new TransactionModel();
	}

	getTransactionsFromServer(loadAllData : boolean = false) {
		return this.httpClient
			.get<TransactionModel[]>(`${environment.serverApiUrl}/Transaction?loadAllData=${loadAllData}`, {
				withCredentials: true
			})
			.pipe(
				tap((transactions: TransactionModel[]) => {
					this.transactions = transactions.sort((a, b) => (a.date > b.date ? -1 : 1));
					this.transactions.forEach((transaction) => {
						transaction.date = new Date(transaction.date);
					});

				}),
				catchError((error) => {
					console.log(error);
					return [];
				})
			);
	}

    getTransactionsByWalletId(idWallet: number, loadAllData : boolean = false) {
        return this.httpClient
            .get<TransactionModel[]>(
                `${environment.serverApiUrl}/Transaction/Wallet/${idWallet}?loadAllData=${loadAllData}`,
                {
                    withCredentials: true
                }
            )
            .pipe(
				tap((transactions: TransactionModel[]) => {
					this.transactions = transactions;
					this.transactions.forEach((transaction) => {
						transaction.date = new Date(transaction.date);
					});
				}),
                catchError((error) => {
                    console.log(error);
                    return [];
                })
            );
    }

	addTransaction() {
		return this.httpClient
			.post<TransactionModel>(
				`${environment.serverApiUrl}/Transaction`,
				this.newTransaction,
				{
					withCredentials: true
				}
			)
			.pipe(
				catchError((error) => {
					console.log(error);
					return [];
				})
			);
	}

	updateTransaction(transaction: TransactionModel) {
		return this.httpClient
			.put<TransactionModel>(
				`${environment.serverApiUrl}/Transaction/${transaction.id}`,
				transaction,
				{
					withCredentials: true
				}
			)
			.pipe(
				catchError((error) => {
					console.log(error);
					return [];
				})
			);
	}
}
