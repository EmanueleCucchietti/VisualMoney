import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, of, tap } from 'rxjs';
import { WalletModel } from 'src/app/_models';
import { environment } from 'src/app/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WalletService {
    constructor(private httpClient: HttpClient, private router: Router) {}

    wallets: WalletModel[] = [];
    selectedWallet: WalletModel = new WalletModel();
    newWallet: WalletModel = new WalletModel();

    getWallets(): WalletModel[] {
        return this.wallets;
    }

    getWalletsFromServer() {
        return this.httpClient
            .get<WalletModel[]>(`${environment.serverApiUrl}/Wallet`, {
                withCredentials: true
            })
            .pipe(
                tap((wallets: WalletModel[]) => {
                    this.wallets = wallets;
                }),
                catchError((error) => {
                    console.log(error);
                    return of([]);
                })
            );
    }

    listWallet() {
        console.log(this.wallets);
    }

    addWallet() {
        // console.log(this.newWallet);
        // this.wallets.push(this.newWallet);

        // // router to /wallet/
        // this.router.navigate(['/wallet']);

        return this.httpClient
            .post<WalletModel>(
                `${environment.serverApiUrl}/Wallet`,
                this.newWallet,
                {
                    withCredentials: true
                }
            )
            .pipe(
                tap((wallet: WalletModel) => {
                    this.wallets.push(wallet);
                }),
                catchError((error) => {
                    console.log(error);
                    return of(new WalletModel());
                })
            );
    }

    editWallet() {
        return this.httpClient
            .put<WalletModel>(
                `${environment.serverApiUrl}/Wallet/${this.selectedWallet.id}`,
                this.selectedWallet,
                {
                    withCredentials: true
                }
            )
            .pipe(
                tap((wallet: WalletModel) => {
                    this.selectedWallet = wallet;
                }),
                catchError((error) => {
                    console.log(error);
                    return of(new WalletModel());
                })
            );
    }

    selectWallet(idWallet: number | undefined) {
        if (typeof idWallet != 'undefined') {
            this.selectedWallet =
                this.wallets.find((wallet) => wallet.id == idWallet) ??
                new WalletModel();
        } else {
            this.selectedWallet = new WalletModel();
        }
    }

}
