import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProblemComponent } from './new-problem.component';

describe('NewProblemComponent', () => {
  let component: NewProblemComponent;
  let fixture: ComponentFixture<NewProblemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewProblemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewProblemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
