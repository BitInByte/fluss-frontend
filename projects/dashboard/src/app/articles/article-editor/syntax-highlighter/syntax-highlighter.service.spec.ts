import { TestBed } from '@angular/core/testing';

import { SyntaxHighlighterService } from './syntax-highlighter.service';

describe('SyntaxHighlighterService', () => {
  let service: SyntaxHighlighterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyntaxHighlighterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
