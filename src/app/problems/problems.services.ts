import { Injectable } from '@angular/core';
import { Problem } from '../app.model';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { APIServices } from '../app.services';
import { map } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ProblemServices {
  constructor(private apiServices: APIServices) {}

  private problems: Problem[] = [
    {
      contestId: 1,
      name: 'Title here',
      tags: ['tag1', 'tag2'],
      rating: 100,
      statement: `One hot summer day Pete and his friend Billy decided to buy a watermelon. They chose the biggest and the ripest one, in their opinion. After that the watermelon was weighed, and the scales showed w kilos. They rushed home, dying of thirst, and decided to divide the berry, however they faced a hard problem.\n
Pete and Billy are great fans of even numbers, that's why they want to divide the watermelon in such a way that each of the two parts weighs even number of kilos, at the same time it is not obligatory that the parts are equal. The boys are extremely tired and want to start their meal as soon as possible, that's why you should help them and find out, if they can divide the watermelon in the way they want. For sure, each of them should get a part of positive weight.`,
      time_lim: 10,
      mem_lim: 100,
      input: 'Input',
      output: 'Output',
      link: 'https://codeforces.com/problemset/problem/4/A',
    },
    {
      contestId: 1,
      name: 'Title here',
      tags: ['tag1', 'tag2'],
      rating: 100,
      statement: `One hot summer day Pete and his friend Billy decided to buy a watermelon. They chose the biggest and the ripest one, in their opinion. After that the watermelon was weighed, and the scales showed w kilos. They rushed home, dying of thirst, and decided to divide the berry, however they faced a hard problem.\n
Pete and Billy are great fans of even numbers, that's why they want to divide the watermelon in such a way that each of the two parts weighs even number of kilos, at the same time it is not obligatory that the parts are equal. The boys are extremely tired and want to start their meal as soon as possible, that's why you should help them and find out, if they can divide the watermelon in the way they want. For sure, each of them should get a part of positive weight.`,
      time_lim: 10,
      mem_lim: 100,
      input: 'Input',
      output: 'Output',
      link: 'https://codeforces.com/problemset/problem/4/A',
    },
  ];

  addProblemFromLink(link: string): Observable<void> {
    return this.apiServices.getProblemFromLink(link)
    .pipe(
      map((response: any) => {
        // Transform the response if needed to match the Problem interface
        const problem: Problem = {
          contestId: response.contestId,
          name: response.name,
          tags: response.tags,
          rating: response.rating,
          statement: response.statement,
          time_lim: response.time_lim,
          mem_lim: response.mem_lim,
          input: response.input,
          output: response.output,
          link: response.link,
        };
        console.log(problem);
        this.addProblem(problem);
      })
    );
    // console.log("ProblemService: ", problem);
  }

  getProblems(): Problem[] {
    return this.problems;
  }

  addProblem(problem: Problem): void {
    this.problems.push(problem);
  }

  deleteProblem(name: string): void {
    this.problems = this.problems.filter((problem) => problem.name !== name);
  }
}
