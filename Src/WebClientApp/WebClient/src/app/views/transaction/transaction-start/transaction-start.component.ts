import { Component, ElementRef, ViewChild } from '@angular/core';
import { timeout } from 'rxjs';
import { TransactionService } from 'src/app/_services/transaction/transaction.service';

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
            // console.log(this.blendColors('#00bfa5', '#ff1744', progress));
            console.log(
                this.mixColors('#00bfa5', '#ff1744', progress),
            );
            this.buttonCreate.style.setProperty('--background-color', this.mixColors('#00bfa5', '#ff1744', progress),);
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

	mixColors(color1 : string, color2 : string, percentage : number) {
		if (percentage < 0 || percentage > 100) {
			throw new Error("Percentage should be between 0 and 100");
		}

		// Convert hex to RGB
		const hexToRgb = (hex:any) => ({
			r: parseInt(hex.slice(1, 3), 16),
			g: parseInt(hex.slice(3, 5), 16),
			b: parseInt(hex.slice(5, 7), 16),
		});

		const rgb1 = hexToRgb(color1);
		const rgb2 = hexToRgb(color2);

		// Calculate mixed color
		const mixedColor = {
			r: Math.round(rgb1.r + (rgb2.r - rgb1.r) * (percentage / 100)),
			g: Math.round(rgb1.g + (rgb2.g - rgb1.g) * (percentage / 100)),
			b: Math.round(rgb1.b + (rgb2.b - rgb1.b) * (percentage / 100)),
		};

		// Convert RGB to hex
		const componentToHex = (c:any) => {
			const hex = c.toString(16);
			return hex.length === 1 ? "0" + hex : hex;
		};

		const mixedHexColor = `#${componentToHex(mixedColor.r)}${componentToHex(
			mixedColor.g
		)}${componentToHex(mixedColor.b)}`;

		return mixedHexColor;
	}

}
