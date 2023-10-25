import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-common-button',
  templateUrl: './common-button.component.html',
  styleUrls: ['./common-button.component.css']
})
export class CommonButtonComponent {
  @Input() text: string = 'Button';

  constructor() { }

  ngOnInit(): void {
  }
}
