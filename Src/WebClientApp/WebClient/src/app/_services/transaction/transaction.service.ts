import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs';
import { TransactionModel } from 'src/app/_models/Transaction/transactionModel';
import { environment } from 'src/app/environments/environment';
import { CategoryService } from '../category/category.service';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    constructor(public httpClient: HttpClient,
		public categoryService: CategoryService) { }

	transactions: TransactionModel[] = [];
	selectedTransaction: TransactionModel = new TransactionModel();
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
					this.transactions = transactions;
				}),
				// map((transactions: TransactionModel[]) => {
				// 	transactions.forEach((transaction) => {
				// 		this.categoryService.getCategoriesByTransactionId(transaction.id!).subscribe((categories) => {
				// 			transaction.categories = categories;
				// 		});
				// 	});
				// 	return transactions;
				// }),
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
				}),
				// map((transactions: TransactionModel[]) => {
				// 	transactions.forEach((transaction) => {
				// 		this.categoryService.getCategoriesByTransactionId(transaction.id!).subscribe((categories) => {
				// 			transaction.categories = categories;
				// 		});
				// 	});
				// 	return transactions;
				// }),
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
}
