import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
	SimpleChanges
} from '@angular/core';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent {
    @Input() dateValue: Date = new Date();
    dateValueString: string = this.formatDateToDDMMYYYY(this.dateValue);

    @Input() isReadOnly: boolean = false;
    @Input() labelString: string = 'Date';
    @Input() showLabel: boolean = true;
    @Input() showOuterDiv: boolean = false;

    @Output() dateChange = new EventEmitter<Date>();

    showDatePicker: boolean = false;
    hasSelectedDate: boolean = false;
    auxiliaryDate: Date = new Date(this.dateValue);

    monthsNames: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    weekDaysNames: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    calendar: SingleDay[][] = [];
    currentMonth: number = this.dateValue.getMonth();
    currentYear: number = this.dateValue.getFullYear();

    datepickerSubContainer: HTMLElement | null = null;
	datepickerWrapper: HTMLElement | null = null;

    constructor(private elRef: ElementRef) {}

    ngOnInit() {
        this.datepickerSubContainer = this.elRef.nativeElement.querySelector(
            '#datepickerContainer'
        );
		this.datepickerWrapper = this.elRef.nativeElement.querySelector(
			'#datepickerWrapper'
		);
    }

	ngOnChanges(changes: SimpleChanges): void {
		if(changes["dateValue"])
			this.dateValueString = this.formatDateToDDMMYYYY(this.dateValue);
	}


    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.auxiliaryDate = new Date(this.currentYear, this.currentMonth, 1);
        this.populateCalendar();
    }

    prevMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.auxiliaryDate = new Date(this.currentYear, this.currentMonth, 1);
        this.populateCalendar();
    }

    @HostListener('document:click', ['$event'])
    handleClick(event: Event): void {
        const datepickerElement = document.getElementsByClassName(
            'datepicker-wrapper'
        )[0] as HTMLElement;
        const targetElement = event.target as HTMLElement;

        // Check if the clicked element is not the datepicker or a descendant of the datepicker
        if (!datepickerElement.contains(targetElement)) {
            // The click was outside the datepicker, so hide it
            // datepickerElement.style.display = 'none';
            this.showDatePicker = false;
        }
    }

    dayClick(day: SingleDay) {
        if (day.month == this.currentMonth - 1) {
            this.prevMonth();
        }
        if (day.month == this.currentMonth + 1) {
            this.nextMonth();
        }

        this.dateValue = new Date(
            this.auxiliaryDate.getFullYear(),
            this.auxiliaryDate.getMonth(),
            day.value
        );
        this.dateValueString = this.formatDateToDDMMYYYY(this.dateValue);
        this.showDatePicker = false;
        this.auxiliaryDate = this.dateValue;

        this.dateChange.emit(this.dateValue);
    }

    populateCalendar() {
        const firstDayOfMonth = this.getFirstDayOfMonth(this.auxiliaryDate);
        const daysInMonth = new Date(
            this.auxiliaryDate.getFullYear(),
            this.auxiliaryDate.getMonth() + 1,
            0
        ).getDate();
        const daysInPrevMonth = new Date(
            this.auxiliaryDate.getFullYear(),
            this.auxiliaryDate.getMonth(),
            0
        ).getDate();

        let day = 1;
        for (let i = 0; i < 5; i++) {
            this.calendar[i] = [];
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < firstDayOfMonth) {
                    this.calendar[i][j] = new SingleDay(
                        daysInPrevMonth - firstDayOfMonth + j + 1,
                        this.currentMonth - 1,
                        this.currentYear
                    );
                } else if (day > daysInMonth) {
                    this.calendar[i][j] = new SingleDay(
                        day++ - daysInMonth,
                        this.currentMonth + 1,
                        this.currentYear
                    );
                } else {
                    this.calendar[i][j] = new SingleDay(
                        day++,
                        this.currentMonth,
                        this.currentYear
                    );
                }
            }
        }

    }

    openDatePicker() {
        if (this.isReadOnly) return;

        if (!this.showDatePicker) {
            if (
                this.datepickerSubContainer!.clientHeight +
                    this.datepickerWrapper!.getBoundingClientRect().top +
					this.datepickerWrapper!.clientHeight + 10>
                window.innerHeight
            ) {
				this.datepickerSubContainer!.style.setProperty(
					'--height',
					this.datepickerSubContainer!.clientHeight + 'px'
				);

				this.datepickerSubContainer!.style.setProperty(
					'--top',
					'calc(0px - var(--height) - 20px)'
				);
            }
			else{
				this.datepickerSubContainer!.style.setProperty(
					'--top',
					'calc(100% + 10px)'
				);
			}
        }

        this.auxiliaryDate = this.dateValue;
        this.currentMonth = this.dateValue.getMonth();
        this.currentYear = this.dateValue.getFullYear();
        this.populateCalendar();
        this.showDatePicker = !this.showDatePicker;
    }

    formatDateToDDMMYYYY(date: Date) {
        // Get day, month, and year components
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const year = date.getFullYear();

        // Ensure two-digit format for day and month
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        // Combine components in "dd/mm/yyyy" format
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

        return formattedDate;
    }

    getFirstDayOfMonth(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay() - 1;
    }
}

class SingleDay {
    constructor(
        public value: number,
        public month: number,
        public year: number
    ) {}
}
