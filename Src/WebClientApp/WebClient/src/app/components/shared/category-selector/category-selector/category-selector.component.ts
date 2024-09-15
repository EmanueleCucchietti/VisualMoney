import { Component, Input, SimpleChanges } from '@angular/core';
import { CategoryModel } from 'src/app/_models/Category/CategoryModel';
import { TransactionService } from 'src/app/_services';
import { CategoryService } from 'src/app/_services/category/category.service';

@Component({
	selector: 'app-category-selector',
	templateUrl: './category-selector.component.html',
	styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent {
	constructor(
		public transactionService: TransactionService,
		public categoryService: CategoryService
	) { }

	@Input() isReadOnly: boolean = true;
	isCreatingCategory: boolean = false;
	newCategoryName: string = '';

	@Input() notPresentCategories:  CategoryModel[] = [];
	@Input() oldCategories: CategoryModel[] = [];

	notPresentCategoriesPositive: CategoryModel[] = [];
	notPresentCategoriesNegative: CategoryModel[] = [];

	notPresentCategoriesFiltered: CategoryModel[] = [];

	ngOnChanges(changes: SimpleChanges){
		if (changes['notPresentCategories']){
			this.handleChangeNotPresentCategories();
		}
	}

	handleChangeNotPresentCategories(){
		this.notPresentCategoriesPositive = this.notPresentCategories.filter(c => c.hasIncome)
		this.notPresentCategoriesNegative = this.notPresentCategories.filter(c => c.hasExpense)
		this.notPresentCategoriesFiltered = this.notPresentCategories;
	}

	cancelNewCategory() {
		this.isCreatingCategory = false;
	}

	removeCategoryFromTransaction(category: CategoryModel) {
		this.transactionService.selectedTransaction.categories.splice(
			this.transactionService.selectedTransaction.categories.findIndex(item => item == category), 1);
		this.notPresentCategories.push(category);
		this.handleChangeNotPresentCategories();
	}

	addCategoryToTransaction(category: CategoryModel) {
		this.transactionService.selectedTransaction.categories.push(category)
		this.notPresentCategories.splice(this.notPresentCategories.findIndex(item => item == category), 1)
		this.handleChangeNotPresentCategories();
		this.newCategoryName = ""
	}

	createNewCategory() {
		if (this.isCreatingCategory)
			this.isCreatingCategory = false;
		else
			this.isCreatingCategory = true;

		// negated condition
		if (this.isCreatingCategory)
			return;

		// test if name already exists
		for (const element of this.categoryService.categories) {
			if (element.name == this.newCategoryName) {
				alert("Inserire un nome non esistente")
				return;
			}
		}

		// add to the server
		if(this.newCategoryName.trim() == "")
			return;
		let category = new CategoryModel(this.newCategoryName);
		this.categoryService.addCategory(category).subscribe({
			next: (category) => {
				this.transactionService.selectedTransaction.categories.push(category)
				this.newCategoryName = ""
			},
			error: (err) => {
				alert("errore nella creazione della categoria. riprovare");
				console.log(err);
			}
		})
	}

	filterMixed() {
		
	}
	filterNegative() {
		
	}
	filterPositive() {
		
	}
}
