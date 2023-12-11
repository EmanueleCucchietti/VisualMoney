export class WalletModel {
	id: number | undefined;
	name: string;
	amount: number;
	currencyCode: string;

	constructor(name = '', amount = 0, currencyCode = '') {
		this.name = name;
		this.amount = amount;
		this.currencyCode = currencyCode;
	}
}
