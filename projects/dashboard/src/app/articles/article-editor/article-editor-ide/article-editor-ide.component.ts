import {
  Component,
  ContentChild,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { TranscludeDirective } from '../../../shared/transclude.directive';

@Component({
  selector: 'app-article-editor-ide',
  templateUrl: './article-editor-ide.component.html',
  styleUrls: ['./article-editor-ide.component.scss'],
})
export class ArticleEditorIdeComponent implements OnInit {
  // Allow to replicate the <ng-content> which by default doesn't
  // let us replicate static content inside it
  @ContentChild(TranscludeDirective, { read: TemplateRef }) transcludeTemplate;

  @Input() language: string;
  @Input() codeContent: string;
  isVisible = false;

  constructor() {}

  ngOnInit(): void {}

  onClick(): void {
    this.isVisible = !this.isVisible;
  }
}
