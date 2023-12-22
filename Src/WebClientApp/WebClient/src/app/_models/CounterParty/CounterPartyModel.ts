export class CounterPartyModel{
	id?: number;
	name: string;
	isHidden: boolean;

	constructor(name: string = '', isHidden: boolean = false) {
		this.name = name;
		this.isHidden = isHidden;
	}
}