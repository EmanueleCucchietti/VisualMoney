import { Component, Input } from '@angular/core';
import { TransactionModel } from 'src/app/_models/Transaction/transactionModel';

@Component({
  selector: 'app-transaction-list',
  host: { 'class': 'childRouteFlex' },
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
	@Input() transactions: TransactionModel[] = [];

	loading : boolean = true;

	ngOnInit() {
		if (this.transactions.length == 0) {
			this.loading = false;
		}
	}

}
