import { CategoryModel } from "../Category/CategoryModel";

export class TransactionModel {
    id: number | undefined;
    name: string;
    amount: number;
    currencyCode: string;
    date: Date;
    isIncome: boolean;
    idWallet: number;
	categories : CategoryModel[];

    constructor(
        name: string = '',
        amount: number = 0,
        currencyCode: string = '',
        date: Date = new Date(),
        isIncome: boolean = true,
        idWallet: number = 0,
		categories: CategoryModel[] = []
    ) {
        this.name = name;
        this.amount = amount;
        this.currencyCode = currencyCode;
        this.date = date;
        this.isIncome = isIncome;
        this.idWallet = idWallet;
		this.categories = categories;
    }
}
