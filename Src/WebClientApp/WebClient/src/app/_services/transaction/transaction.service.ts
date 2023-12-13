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
}
