import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ProblemServices } from '../../problems/problems.services';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Problem } from '../../app.model';
import { APIServices } from '../../app.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-problem-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    CommonModule,
  ],
  templateUrl: './problem-form.component.html',
  styleUrl: './problem-form.component.css',
})
export class ProblemFormComponent {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  formDetails: FormGroup;
  allTags: string[] = [];
  selectedTags: string[] = [];

  constructor(
    private APIservice: APIServices,
    private fb: FormBuilder,
    private router: Router,
    private problemServices: ProblemServices
  ) {
    this.formDetails = this.fb.group({
      name: [''],
      contestId: [],
      index: [],
      rating: [],
      tags: [['']],
    });
  }

  onSubmitLink() {
    if (this.formDetails.valid) {
      let details: Problem = {
        "contestId": 0,
        "index": '',
        "name": '',
        "tags": [],
        "rating": 0,
        "statement": '',
        "time_lim": 0,
        "mem_lim": 0,
        "input": '',
        "output": '',
        "link": ''
      };
      details['tags'] = this.selectedTags;
      details['name'] = this.formDetails.get('name')?.value;
      details['contestId'] = this.formDetails.get('contestId')?.value;
      details['index'] = this.formDetails.get('index')?.value;
      details['rating'] = this.formDetails.get('rating')?.value;
      
      console.log('correct', details);
      this.problemServices.randomProblem(details).subscribe({
        next: () => {
          console.log("Problem added successfully");
          this.router.navigate(['/problems']);
        },
        error: (err:any) => {
          console.error("Error adding problem:", err['error']['error']);
          alert(err['error']['error']);
        }
      });
    } else {
      console.error('error in form:', this.formDetails.errors);
    }
  }

  ngOnInit(): void {
    this.APIservice.getTags().subscribe(
      (tags: string[]) => {
        this.allTags = tags;
      },
      (error) => {
        console.error('Failed to fetch tags:', error);
      }
    );
  }

  removeTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }
  }

  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.removeTag(tag);
    } else {
      if (this.allTags.includes(value)) {
        if (!this.selectedTags.includes(value)) {
          this.selectedTags.push(value);
        } else {
          console.error('Already present tag: ', value);
        }
      } else {
        console.error('Invalid Tag: ', value);
      }
    }
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (this.allTags.includes(value)) {
        if (!this.selectedTags.includes(value)) {
          this.selectedTags.push(value);
        } else {
          console.error('Already present tag: ', value);
        }
      } else {
        console.error('Invalid Tag: ', value);
      }
    }
    event.chipInput!.clear();
  }
}
