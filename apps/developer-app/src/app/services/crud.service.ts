import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, ReplaySubject } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { Location } from 'libs/common/center-matrix/src/lib/location.interface';

const BASE_URL = "http://localhost:3400";
const CENTER_MATRIX = "center-matrix";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private entriesSrc: ReplaySubject<Array<Location>> = new ReplaySubject<Array<Location>>(1);
  public entries$: Observable<Array<Location>> = this.entriesSrc.asObservable();

  constructor(private http: HttpClient) { }

  public getEntry(id: number): Observable<Location> {
    return this.http.get<Location>(`${BASE_URL}/${CENTER_MATRIX}/${id}`);
  }

  public getAllEntries(): Observable<Array<Location>> {
    return this.http.get<Array<Location>>(`${BASE_URL}/${CENTER_MATRIX}`).pipe(
      tap((entries: Array<Location>) => this.entriesSrc.next(entries))
    );
  }

  public newEntry(location: Location): Observable<Location> {
    return this.http.post<Location>(`${BASE_URL}/${CENTER_MATRIX}`, location).pipe(
      switchMap((entry: Location) =>
        this.getAllEntries().pipe(
          map(() => <Location>entry)
        )
      )
    );
  }

  public editEntry(id: number, location: Location): Observable<Array<Location>> {
    return this.http.put<Array<Location>>(`${BASE_URL}/${CENTER_MATRIX}/${id}`, location).pipe(
      switchMap(() => this.getAllEntries())
    );
  }

  public removeEntry(id: number): Observable<Array<Location>> {
    return this.http.delete(`${BASE_URL}/${CENTER_MATRIX}/${id}`).pipe(
      switchMap(() => this.getAllEntries())
    );
  }
}