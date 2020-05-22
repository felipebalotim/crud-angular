import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRed]'
})
export class RedDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#ff3333';
    el.nativeElement.style.textShadow = '0px 0px 5px #000';
  }

}
