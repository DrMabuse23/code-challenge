import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Location } from '@tss/common-ctrm';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {
  matrixUrl = 'http://localhost:3400/api/center-matrix';

  constructor(private http: HttpClient) { }

  public getLocations() {
    return this.http.get<Location[]>(this.matrixUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
