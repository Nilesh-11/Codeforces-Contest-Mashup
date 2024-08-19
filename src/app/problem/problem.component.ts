import { Component, Input } from '@angular/core';
import { Problem } from '../app.model';
import {MatExpansionModule} from '@angular/material/expansion';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-problem',
  standalone: true,
  imports: [
    MatExpansionModule,
    CommonModule,
  ],
  templateUrl: './problem.component.html',
  styleUrl: './problem.component.css'
})
export class ProblemComponent {
  @Input() data?: Problem;
  expandedId?: number;

  getRandomProblem(): void {
    console.log('Random button clicked');
  }

  toggle(id: number): void {
    this.expandedId = this.expandedId === id ? undefined : id;
  }

  isExpanded(id: number): boolean {
    return this.expandedId === id;
  }
}
