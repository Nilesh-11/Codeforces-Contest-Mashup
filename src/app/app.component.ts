import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { ProblemsComponent } from './problems/problems.component';
import { ProblemComponent } from './problem/problem.component';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';
// import { AppRoutingModule } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, ProblemsComponent, ProblemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'codeforcesMashupGenerator';
}
