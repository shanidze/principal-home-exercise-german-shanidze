import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { Person } from '../componenets/person/person';

@Injectable()
export class PeopleService {

  // Observable PersonId sources
  private _editPersonId = new BehaviorSubject<number>(0);

  // Observable navItem stream
  personId$ = this._editPersonId.asObservable();

  // service command
  changeEditPerson(editPersonId) {
    this._editPersonId.next(editPersonId);
  }

  constructor(private http: HttpClient) { }

  baseUrl: string = '/api/person/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getPeople(): Observable<Person> {
    return this.http.get<Person>(this.baseUrl);
  }

  getPersonById(id: number): Observable<Person> {
    return this.http.get<Person>(this.baseUrl + id);
  }

  createPerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl + 'add', person);
  }

  updatePerson(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl + 'update', person);
  }

  deletePerson(id: number): Observable<Person> {
    return this.http.get<Person>(this.baseUrl + 'delete/' + id);
  }
}
