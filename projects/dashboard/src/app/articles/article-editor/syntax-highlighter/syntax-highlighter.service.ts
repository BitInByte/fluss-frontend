import { ElementRef, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import Prism from 'prismjs';
// import 'clipboard';
import 'prismjs';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-css';
import 'prismjs/plugins/toolbar/prism-toolbar';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/plugins/show-language/prism-show-language';
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard';
import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace';
import 'prismjs/plugins/line-highlight/prism-line-highlight';

// declare var Prism: any;

@Injectable({
  providedIn: 'root',
})
export class SyntaxHighlighterService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  highlightAll(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Highligtinhhhhhh');
      Prism.highlightAll();
    }
  }

  // highlightElement(element: ElementRef<HTMLElement>): void {
  highlightElement(element: HTMLElement): void {
    if (isPlatformBrowser(this.platformId)) {
      Prism.highlightElement(element);
    }
  }
}
