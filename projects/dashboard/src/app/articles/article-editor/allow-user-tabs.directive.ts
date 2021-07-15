import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAllowUserTabs]',
})
export class AllowUserTabsDirective {
  // @Input('appAllowUserTabs') value: string;
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    console.log('Directive Event: ', event);
    console.log('Element: ', this.elemRef.nativeElement.selectionStart);
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = this.elemRef.nativeElement.selectionStart;
      const end = this.elemRef.nativeElement.selectionEnd;
      // let before_tab = this.dartCode.slice();
      // this.value =
      // this.value.substring(0, start) + '\t' + this.value.substring(end);
      this.elemRef.nativeElement.value =
        this.elemRef.nativeElement.value.substring(0, start) +
        '\t' +
        this.elemRef.nativeElement.value.substring(end);
      this.elemRef.nativeElement.selectionStart =
        this.elemRef.nativeElement.selectionEnd = start + 1;
    }
  }

  constructor(private elemRef: ElementRef<HTMLInputElement>) {}
}
