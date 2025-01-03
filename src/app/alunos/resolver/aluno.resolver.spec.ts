import { TestBed } from '@angular/core/testing';
import { alunoResolver } from './aluno.resolver';

describe('alunoResolver', () => {
  let resolver: typeof alunoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [alunoResolver]
    });
    resolver = TestBed.inject(alunoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});

