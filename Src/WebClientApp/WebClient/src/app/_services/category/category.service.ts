import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { CategoryModel } from 'src/app/_models/Category/CategoryModel';
import { environment } from 'src/app/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CategoryService {

	constructor(public httpClient: HttpClient) { }

	categories: CategoryModel[] = [];

	getCategoriesByTransactionId(idTransaction: number) {
		return this.httpClient
			.get<CategoryModel[]>(
				`${environment.serverApiUrl}/Category/Transaction/${idTransaction}`,
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

	getCategories() {
		return this.httpClient
			.get<CategoryModel[]>(
				`${environment.serverApiUrl}/Category?loadAllData=true`,
				{
					withCredentials: true
				}
			)
			.pipe(
				tap((categories: CategoryModel[]) => {
					this.categories = categories.sort((a, b) => a.name > b.name ? -1 : 1);
					this.categories.forEach(c => {
						c.hasIncome = c.transactions.some(t => t.isIncome);
						c.hasExpense = c.transactions.some(t => !t.isIncome);
					});

				})
			);
	}

	addCategory(category: CategoryModel) {
		return this.httpClient
			.post<CategoryModel>(
				`${environment.serverApiUrl}/Category`,
				category,
				{
					withCredentials: true
				}
			)
			.pipe(
				tap((category) => {
					this.categories.push(category)
				})
			);
	}
}
