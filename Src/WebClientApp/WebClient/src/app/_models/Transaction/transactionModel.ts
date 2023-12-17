export class TransactionModel {
	id: number | undefined;
	name: string;
	amount: number;
	currencyCode: string;
	date: Date;
	isIncome: boolean;
	idWallet: number;

	constructor(name: string = '', amount: number = 0, currencyCode: string = '', date : Date = new Date(),isIncome: boolean = true, idWallet: number = 0) {
		this.name = name;
		this.amount = amount;
		this.currencyCode = currencyCode;
		this.date = date;
		this.isIncome = isIncome;
		this.idWallet = idWallet;
	}
}
