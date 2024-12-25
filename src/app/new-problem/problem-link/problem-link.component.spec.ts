import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemLinkComponent } from './problem-link.component';

describe('ProblemLinkComponent', () => {
  let component: ProblemLinkComponent;
  let fixture: ComponentFixture<ProblemLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProblemLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
