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

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {
  MatChipEditedEvent,
  MatChipInputEvent,
  MatChipsModule,
} from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { Problem } from '../../app.model';
import { APIServices } from '../../app.services';
import { HttpClient } from '@angular/common/http';
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
  allTags: string[] = [];
  selectedTags: string[] = [];
  constructor(private APIservice: APIServices) {}

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
    }
    else{
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
