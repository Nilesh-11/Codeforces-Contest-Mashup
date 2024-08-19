import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProblemsComponent } from './problems/problems.component';
import { NewProblemComponent } from './new-problem/new-problem.component'; // Import the NewProblemComponent

export const routes: Routes = [
  { path: '', redirectTo: '/problems', pathMatch: 'full' }, // Default route
  { path: 'problems', component: ProblemsComponent }, // Home page with all problems
  { path: 'add', component: NewProblemComponent }, // New Problem page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
