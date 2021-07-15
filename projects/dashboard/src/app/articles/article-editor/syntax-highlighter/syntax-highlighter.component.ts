import {
  AfterViewChecked,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { SyntaxHighlighterService } from './syntax-highlighter.service';

@Component({
  selector: 'app-syntax-highlighter',
  templateUrl: './syntax-highlighter.component.html',
  // styleUrls: ['./syntax-highlighter.component.scss'],
})
export class SyntaxHighlighterComponent
  implements OnInit, AfterViewChecked, OnChanges
{
  @Input() language: string;
  @Input() content: string;
  @ViewChild('higlightContent', { static: false })
  private highlightContentRef: ElementRef<HTMLElement>;
  private isInitialized = false;
  constructor(private syntaxHighlighterService: SyntaxHighlighterService) {}

  ngOnInit(): void {
    // this.syntaxHighlighterService.highlightAll();
    console.log('Content: ', this.content);
  }

  get languageSelected(): string {
    return `language-${this.language}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
    // console.log(changes);
    // if (changes.content.previousValue !== changes.content.currentValue) {
    // console.log('Different');
    // console.log(this.higlightContentElement.nativeElement);
    // this.syntaxHighlighterService.highlightAll();
    // }
    // this.syntaxHighlighterService.highlightElement(
    // this.higlightContentRef.nativeElement
    // );

    // const code = document.querySelector('code');
    // code.innerText = changes.content.currentValue;
    // this.syntaxHighlighterService.highlightElement(code);
    if (this.highlightContentRef) {
      console.log(changes.content.currentValue);
      this.highlightContentRef.nativeElement.innerHTML =
        changes.content.currentValue;
      this.syntaxHighlighterService.highlightAll();
    }
  }

  ngAfterViewChecked(): void {
    if (!this.isInitialized) {
      // this.highlightContentRef.nativeElement.innerHTML = ' ';
      this.highlightContentRef.nativeElement.innerHTML = this.content;
      this.syntaxHighlighterService.highlightAll();
      this.isInitialized = true;
    }
    // } else if(!this.isInitialized) {
    // this.highlightContentRef
    // }
    // if (!this.isHighlighted) {
    // this.syntaxHighlighterService.highlightAll();
    // this.isHighlighted = true;
    // }
    // this.syntaxHighlighterService.highlightElement(
    // this.higlightContentRef.nativeElement
    // );
  }
}
