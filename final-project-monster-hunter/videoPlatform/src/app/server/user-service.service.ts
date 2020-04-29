import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {PagesModule} from '../pages/pages.module';
import {User} from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userResource: string;
  userResourceURL: string;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /**
   * constructor
   */
  constructor(private http: HttpClient) {
    this.userResource = 'user';
    this.userResourceURL = `${environment.serverBaseURL}/${this.userResource}`;
  }

  /**
   * GET: search user by id
   */
  getUserById(id: string): Observable<User> {
    const url = `${this.userResourceURL}/${id}`;
    return this.http.get<User>(url).pipe(
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
