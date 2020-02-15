import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpeciesService {
  constructor(private http: HttpClient) { }

  getSpecies() {
    return this.http.get('http://localhost:3000/species');
  }
}
