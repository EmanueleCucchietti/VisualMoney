import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-income-slider',
    templateUrl: './income-slider.component.html',
    styleUrls: ['./income-slider.component.css']
})
export class IncomeSliderComponent {
    @Input() isIncome: boolean = true;
	@Input() readonly: boolean = false;
	@Output() setTransactionTypeEmitter = new EventEmitter<boolean>();

    setTransactionType(type: boolean) {
		if(this.readonly)
			return;

        this.isIncome = type;
		this.setTransactionTypeEmitter.emit(type);
    }

    setTransactionTypeByCheckbox($event: Event) {
		if(this.readonly)
			return false;

        this.setTransactionType(!(<HTMLInputElement>$event.target).checked);
		return this.isIncome;
    }
}
