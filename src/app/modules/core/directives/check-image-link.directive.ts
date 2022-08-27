import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {Constants} from "../common/constants";

@Directive({
  selector: '[CheckImageLink]'
})
export class CheckImageLinkDirective {

  @Input() urlCustom = '';
  constants = Constants;
  constructor(private elementRef: ElementRef) { }

  @HostListener('error')
  imageForDefault(){
    const element = this.elementRef.nativeElement;
    element.src = this.urlCustom || this.constants.DEFAULT_IMAGE
    console.log(element)
  }

}
