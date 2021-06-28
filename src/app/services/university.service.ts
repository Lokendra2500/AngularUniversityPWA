import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UniversityModel} from '../model/university.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  baseURL = 'http://universities.hipolabs.com/';

  constructor(private httpClient: HttpClient) { }

  fetchUniversitiesList(country?: string): Observable<UniversityModel> {
    return this.httpClient.get<UniversityModel>(`${this.baseURL}search?country=${country}`);
  }
}
