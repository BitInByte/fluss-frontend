import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { CategoryResolver } from './category.resolver';

describe('CategoryResolverResolver', () => {
  let resolver: CategoryResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatSnackBarModule],
    });
    resolver = TestBed.inject(CategoryResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
