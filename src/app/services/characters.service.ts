import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Characters } from '../models/character.model';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  url = 'http://localhost:3000/characters';

  constructor(private http: HttpClient) { }

  getCharacters(page?: number, limit?: number, search?: string) {
    let finalUrl = this.url;
    if (page) {
      finalUrl += '?_page=' + page;
    }
    if (limit) {
      finalUrl += '&limit=' + limit;
    }
    if (search) {
      finalUrl += '&q=' + search;
    }
    return this.http.get(finalUrl);
  }

  addCharacter(character: Characters) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post(this.url, character, httpOptions);
  }

  searchCharacters(query: string) {
    return this.http.get(this.url + '?q=' + query);
  }

  editCharacter(character: Characters) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.put(this.url, character, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  removeCharacter(id: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    const removeUrl = `${this.url}/${id}`;
    return this.http.delete(removeUrl, httpOptions).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something wrong happened; please retry later.');
  }
}
