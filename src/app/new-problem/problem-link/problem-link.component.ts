import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ProblemServices } from '../../problems/problems.services';

@Component({
  selector: 'app-problem-link',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  templateUrl: './problem-link.component.html',
  styleUrl: './problem-link.component.css'
})
export class ProblemLinkComponent {
  linkForm: FormGroup;
  @Output() onSubmitProblemLink: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router, private problemServices: ProblemServices) {
    this.linkForm = this.fb.group({
      problemLink: ['', Validators.required],
    });
  }

  onSubmitLink() {
    if (this.linkForm.valid) {
      const problemLink = this.linkForm.get('problemLink')?.value;
      console.log("correct", problemLink)
      this.problemServices.addProblemFromLink(problemLink).subscribe({
        next: () => {
          console.log("Problem added successfully");
          this.router.navigate(['/problems']);
        },
        error: (err) => {
          console.error("Error adding problem:", err);
        }
      });
    }
    else{
      console.error("error in form:", this.linkForm.errors);
    }
  }
}
