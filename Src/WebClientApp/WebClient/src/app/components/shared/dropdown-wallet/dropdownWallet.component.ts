import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WalletModel } from 'src/app/_models';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdownWallet.component.html',
  styleUrls: ['./dropdownWallet.component.css']
})
export class DropdownWalletComponent {
	@Input() wallets : WalletModel[] = [];
	selectedWallet : WalletModel = new WalletModel();

	@Output() selectWalletEmitter = new EventEmitter<WalletModel>();

	showDropdown = false;
	dropdownNone = true;

	selectWallet(wallet : WalletModel) {
		this.showDropdown = false;
		this.selectedWallet = wallet;
		this.selectWalletEmitter.emit(wallet);
		if(!this.showDropdown)
		{
			setTimeout(() => {
				this.dropdownNone = true;
			}, 300);
		}
	}

	selectShowDropdown() {
		this.dropdownNone = false;
		this.showDropdown = !this.showDropdown;
		if(!this.showDropdown)
		{
			setTimeout(() => {
				this.dropdownNone = true;
			}, 300);
		}
	}
}
