import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { CategoryModel } from 'src/app/_models/Category/CategoryModel';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

    constructor(public httpClient: HttpClient) {}

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
}
