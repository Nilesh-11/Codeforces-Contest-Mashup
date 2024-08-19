import { Component } from '@angular/core';
import { ProblemLinkComponent } from './problem-link/problem-link.component';
import { ProblemFormComponent } from './problem-form/problem-form.component';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-new-problem',
  standalone: true,
  imports: [
    ProblemLinkComponent,
    ProblemFormComponent,
    FormsModule,
    MatTabsModule,
    MatFormFieldModule,
  ],
  templateUrl: './new-problem.component.html',
  styleUrl: './new-problem.component.css'
})
export class NewProblemComponent {

}
