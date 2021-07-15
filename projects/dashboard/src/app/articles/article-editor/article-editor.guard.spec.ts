import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ArticleEditorGuard } from './article-editor.guard';

describe('ArticleEditorGuard', () => {
  let guard: ArticleEditorGuard;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', [
      'navigate',
      'getCurrentNavigation',
      'previousNavigation',
    ]);
    TestBed.configureTestingModule({
      providers: [{ provide: Router, useValue: routerSpy }],
    });
    guard = TestBed.inject(ArticleEditorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
