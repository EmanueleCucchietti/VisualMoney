import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appGoPageBack]'
})
export class GoPageBackDirective {

  constructor() { }

  @HostListener('click') onClick() {
    window.history.back();
  }
}
