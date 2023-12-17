import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { TransactionModel } from 'src/app/_models/Transaction/transactionModel';
import { environment } from 'src/app/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    constructor(public httpClient: HttpClient) {}

	transactions: TransactionModel[] = [];
	selectedTransaction: TransactionModel = new TransactionModel();
	newTransaction: TransactionModel = new TransactionModel();


	getTransactionsFromServer() {
		return this.httpClient
			.get<TransactionModel[]>(`${environment.serverApiUrl}/Transaction`, {
				withCredentials: true
			})
			.pipe(
				catchError((error) => {
					console.log(error);
					return [];
				})
			);
	}

    getTransactionsByWalletId(idWallet: number) {
        return this.httpClient
            .get<TransactionModel[]>(
                `${environment.serverApiUrl}/Transaction/Wallet/${idWallet}`,
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
