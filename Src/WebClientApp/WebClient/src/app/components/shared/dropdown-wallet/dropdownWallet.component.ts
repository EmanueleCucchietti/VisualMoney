import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import { WalletModel } from 'src/app/_models';

@Component({
    selector: 'app-dropdown-wallet',
    templateUrl: './dropdownWallet.component.html',
    styleUrls: ['./dropdownWallet.component.css']
})
export class DropdownWalletComponent {
    @Input() wallets: WalletModel[] = [];
    @Input() selectedWallet?: WalletModel;
    @Input() readonly: boolean = false;
    @Input() labelString: string = 'Wallet';
    @Input() showLabel: boolean = true;

    @Output() selectWalletEmitter = new EventEmitter<WalletModel>();

    showDropdown = false;
    dropdownNone = true;
    firstLoad = true;
    lastWasTop = false;

    dropDownElement: HTMLElement | null = null;
    buttonDropdownWallet: HTMLElement | null = null;

    constructor(private elRef: ElementRef) {}

    ngOnInit() {
        this.dropDownElement =
            this.elRef.nativeElement.querySelector('#dropdownWallet');
        this.buttonDropdownWallet = this.elRef.nativeElement.querySelector(
            '#buttonDropdownWallet'
        );
    }

    selectWallet(wallet: WalletModel) {
        this.showDropdown = false;
        this.selectedWallet = wallet;
        this.selectWalletEmitter.emit(wallet);
        if (!this.showDropdown) {
            setTimeout(() => {
                this.dropdownNone = true;
            }, 300);
        }
    }

    selectShowDropdown() {
        if (this.readonly || !this.dropDownElement) return;

        if (this.firstLoad || this.showDropdown)
            this.dropDownElement!.style.setProperty(
                'transition',
                'opacity 0.2s ease-in-out'
            );
        else
            this.dropDownElement!.style.setProperty(
                'transition',
                'opacity 0.2s ease-in-out, top 0.2s ease-in-out'
            );

        this.firstLoad = false;
        this.dropDownElement!.style.setProperty('visibility', 'hidden');
        this.dropdownNone = false;

        requestAnimationFrame(() => {
            this.dropDownElement?.style.setProperty(
                '--height',
                this.dropDownElement?.clientHeight + 'px'
            );

            if (
                this.dropDownElement!.clientHeight +
                    this.buttonDropdownWallet!.getBoundingClientRect().top >
                window.innerHeight
            ) {
                if (!this.lastWasTop)
                    this.dropDownElement!.style.setProperty(
                        'transition',
                        'opacity 0.2s ease-in-out'
                    );
                this.dropDownElement?.style.setProperty(
                    '--top',
                    'calc(0px - var(--height) - 20px)'
                );
                this.lastWasTop = true;
            } else {
                if (this.lastWasTop)
                    this.dropDownElement!.style.setProperty(
                        'transition',
                        'opacity 0.2s ease-in-out'
                    );
                this.dropDownElement?.style.setProperty(
                    '--top',
                    'calc(100% + 10px)'
                );
                this.lastWasTop = false;
            }

            this.dropDownElement?.style.setProperty('visibility', 'visible');
        });

        this.showDropdown = !this.showDropdown;
        if (!this.showDropdown) {
            setTimeout(() => {
                this.dropdownNone = true;
            }, 300);
        }
    }
}
