export class CategoryModel {
	id?: number;
	name: string;
	constructor(name = '') {
		this.name = name;
	}
}