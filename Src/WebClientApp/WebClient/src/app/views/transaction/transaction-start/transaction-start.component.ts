import { Component, ElementRef, ViewChild } from '@angular/core';
import { timeout } from 'rxjs';
import { TransactionService } from 'src/app/_services/transaction/transaction.service';
import { GraphicFunctions } from 'src/app/_helpers/graphic-functions';

@Component({
    selector: 'app-transaction-start',
    host: { class: 'childRouteFlex' },
    templateUrl: './transaction-start.component.html',
    styleUrls: ['./transaction-start.component.css']
})
export class TransactionStartComponent {

    showButtonChoseIsIncome = false;
    firstLoad = true;

    buttonCreate: any;
    buttonCreateBefore: any;

    constructor(private elRef: ElementRef,
		public transactionService: TransactionService) {}

    ngOnInit() {
        this.buttonCreate =
            this.elRef.nativeElement.querySelector('#buttonCreate');
        this.buttonCreateBefore = window.getComputedStyle(
            this.buttonCreate,
            ':before'
        );
        this.buttonCreate.addEventListener('mousemove', (e: any) => {
            const rect = this.buttonCreate.getBoundingClientRect(),
                mouseX = e.clientX - rect.left,
                mouseY = e.clientY - rect.top;

            // set width and height of the before element
            // based on the mouse position, the more the posizion is close to the center the more the element is small
            const width = Math.abs(rect.width / 2 - mouseX) / 2 + 25;
            // height change only of an amount of 20 %, the rest is based on the width
            const height = Math.abs(rect.height / 2 - mouseY) + width * 0.2;

            this.buttonCreate.style.setProperty('--width', width + 'px');
            this.buttonCreate.style.setProperty('--height', height + 'px');

            let x = mouseX - width / 2;
            let y = mouseY - height / 2;

            this.buttonCreate.style.setProperty('--mouse-x', x + 'px');
            this.buttonCreate.style.setProperty('--mouse-y', y + 'px');

            console.log(rect.width, mouseX - rect.left);
            let progress = (mouseX * 100) / rect.width;
            this.buttonCreate.style.setProperty('--background-color', GraphicFunctions.blendColors('#00bfa5', '#ff1744', progress),);
        });
    }

    CreateTransaction() {
        this.showButtonChoseIsIncome = !this.showButtonChoseIsIncome;
        this.firstLoad = false;
    }

	setTransactionType(type: boolean) {
		this.transactionService.newTransaction.isIncome = type;
		console.log(this.transactionService.newTransaction);
	}

}
