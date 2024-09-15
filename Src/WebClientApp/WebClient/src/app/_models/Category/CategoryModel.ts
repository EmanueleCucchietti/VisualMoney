import { TransactionModel } from "../Transaction/transactionModel";

export class CategoryModel {
	id?: number;
	name: string;
	hasIncome?: boolean;
	hasExpense?: boolean;
	transactions: TransactionModel[] = [];

	constructor(name = '') {
		this.name = name;
	}
}