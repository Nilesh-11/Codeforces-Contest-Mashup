import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Problem } from '../app.model';

import { ProblemComponent } from '../problem/problem.component';

import { ProblemServices } from './problems.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-problems',
  standalone: true,
  imports: [ProblemComponent,
    CommonModule
  ],
  templateUrl: './problems.component.html',
  styleUrl: './problems.component.css'
})
export class ProblemsComponent {
  problems: Problem[] = [];

  constructor(private problemService: ProblemServices, private router: Router) { }

  ngOnInit(): void {
    this.problems = this.problemService.getProblems(); // Fetch problems on init
  }

  goToNewProblem() {
    this.router.navigate(['/add']);
  }
}
