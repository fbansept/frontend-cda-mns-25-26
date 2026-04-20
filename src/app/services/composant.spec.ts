import { TestBed } from '@angular/core/testing';

import { Composant } from './composant';

describe('Composant', () => {
  let service: Composant;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Composant);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
