import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { TransactionService } from 'src/app/_services/transaction/transaction.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.css']
})
export class TransactionViewComponent {
	  constructor(public location: Location,
			public transactionService : TransactionService,
			public route : ActivatedRoute) {}

	selectedTransactionId: number | undefined;


	ngOnInit(): void {
		this.selectedTransactionId = parseInt(
            this.route.snapshot.paramMap.get('id') ?? '0'
        );


		if(this.transactionService.transactions.length == 0) {
			this.transactionService.getTransactionsFromServer(true).subscribe((transactions) => {
				this.transactionService.selectTransaction(this.selectedTransactionId);
			});

		}
		else {
			this.transactionService.selectTransaction(this.selectedTransactionId);
		}
	}

}
