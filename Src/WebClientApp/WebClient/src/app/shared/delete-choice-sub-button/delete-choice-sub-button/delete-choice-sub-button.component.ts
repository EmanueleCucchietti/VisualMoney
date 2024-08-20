import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-delete-choice-sub-button',
	templateUrl: './delete-choice-sub-button.component.html',
	styleUrls: ['./delete-choice-sub-button.component.css']
})
export class DeleteChoiceSubButtonComponent {
	isReadOnly = true;
	firstLoad = false;

	@Output() cancelEventHandler = new EventEmitter<boolean>;
	@Output() deleteEventHandler = new EventEmitter<boolean>;
	@Output() tryDeleteEventHandler = new EventEmitter<boolean>;

	constructor(private router: Router) { }

	confirm() {
		this.isReadOnly = true;

		this.deleteEventHandler.emit(true);
	}
	cancel() {
		this.isReadOnly = true;

		this.cancelEventHandler.emit(true);
	}
	tryDelete() {
        this.isReadOnly = false;
        this.firstLoad = false;

		this.tryDeleteEventHandler.emit(true);
	}

}
