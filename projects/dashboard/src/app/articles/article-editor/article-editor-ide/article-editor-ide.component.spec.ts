import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditorIdeComponent } from './article-editor-ide.component';

describe('ArticleEditorIdeComponent', () => {
  let component: ArticleEditorIdeComponent;
  let fixture: ComponentFixture<ArticleEditorIdeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleEditorIdeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditorIdeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
