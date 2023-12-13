import { Component, Input } from '@angular/core';
import { TransactionModel } from 'src/app/_models/Transaction/transactionModel';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {
	@Input() transactions: TransactionModel[] = [];
}
