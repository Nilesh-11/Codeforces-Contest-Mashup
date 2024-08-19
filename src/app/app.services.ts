import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class APIServices {
  constructor(private http: HttpClient) {}

  getTags(): Observable<string[]> {
    let apiUrl = 'http://localhost:5000/tags';
    let response = this.http.get<string[]>(apiUrl);
    return response;
  }

  getProblemFromLink(link: string){
    const apiUrl = `http://localhost:5000/url?problemLink=${encodeURIComponent(link)}`;
    return this.http.get<any>(apiUrl);
  }
}
