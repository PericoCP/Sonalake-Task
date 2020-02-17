import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Characters } from '../models/character.model';
import { catchError, retry } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {

  url = 'http://localhost:3000/characters';

  constructor(private http: HttpClient) { }

  getCharacters() {
    return this.http.get(this.url);
  }

  addCharacter(character: Characters): Observable<Characters> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
      })
    };
    return this.http.post<Characters>(this.url, character).pipe(catchError(this.handleError));
  }

  searchCharacters(page: number, limit: number, search: string, sort: string, asc: boolean = false) {
    let order: string;
    if (asc) {
      order = 'asc';
    } else {
      order = 'desc';
    }
    return this.http.get(this.url + '?_page=' + page + '&_limit=' + limit + '&q=' + search + '&_sort=' + sort + '&_order=' + order);
  }

  editCharacter(character: Characters, id: number) {

    return this.http.put(this.url + '/' + id, JSON.stringify(character), { headers: { 'Content-Type': 'application/json' } }).pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  removeCharacter(id: number) {
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
    // Return an observable with a user-facing error message
    return throwError(
      'Something wrong happened. Please retry later.');
  }
}
