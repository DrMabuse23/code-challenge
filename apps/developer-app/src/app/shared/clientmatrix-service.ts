import {Injectable} from "@angular/core";
import {ClientMatrix} from "../clientmatrix/clientmatrix";
import {catchError, concatMap, map, merge, Observable, of, scan, Subject, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Action} from "./action";

@Injectable({
  providedIn: 'root'
})
export class ClientMatrixService {
  constructor(private http: HttpClient) { }

  private Url = 'http://localhost:3400/api/center-matrix';
  private clientMatrixModifiedSubject = new Subject<Action<ClientMatrix>>();
  clientMatrixModifiedAction$ = this.clientMatrixModifiedSubject.asObservable();
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  clientMatrix$ = this.http.get<ClientMatrix[]>(this.Url)
    .pipe(
      catchError(this.handleError)
    );

  clientMatrixCRUD$ = merge(
    this.clientMatrix$,
    this.clientMatrixModifiedAction$
      .pipe(
        concatMap(operation => this.operate(operation))
      ))
    .pipe(
      scan((acc, value) =>
        (value instanceof Array) ? [...value] : this.modifyProducts(acc, value), [] as ClientMatrix[]),
    );

  operate(operation: Action<ClientMatrix>): Observable<Action<ClientMatrix>> {
    const clientMatrix = operation.item;
    if (operation.action === 'add') {
      return this.http.post<ClientMatrix>(this.Url, clientMatrix, {headers: this.headers})
        .pipe(
          map(clientMatrix => ({item: clientMatrix, action: operation.action})),
          catchError(this.handleError)
        );
    }
    if (operation.action === 'delete') {console.log('delete')
      const url = `${this.Url}/${operation.item.id}`;
      return this.http.delete<ClientMatrix>(url, {headers: this.headers})
        .pipe(
          map(() => ({item: clientMatrix, action: operation.action})),
          catchError(this.handleError)
        );
    }
    /*if (operation.action === 'update') {
     const url = `${this.Url}/${clientMatrix.id}`;
     return this.http.put<Product>(url, clientMatrix, {headers: this.headers})
       .pipe(
         map(() => ({item: clientMatrix, action: operation.action})),
         catchError(this.handleError)
       );
   }*/
    return of(operation);
  }
    modifyProducts(clientMatrix: ClientMatrix[], operation: Action<ClientMatrix>): ClientMatrix[] {
      if (operation.action === 'add') {
        return [...clientMatrix, operation.item];
      } else if (operation.action === 'update') {
        console.log('after modify', operation.item);
        return clientMatrix.map(clientMatrix => clientMatrix.id === operation.item.id ? operation.item : clientMatrix)
      } else if (operation.action === 'delete') {
        return clientMatrix.filter(clientMatrix => clientMatrix.id !== operation.item.id);
      }
      return [...clientMatrix];
    }

  private handleError(err: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.message}`;
    }
    console.error(err);
    return throwError(() => errorMessage);
  }
//fallback
  delete(id: any) {
    this.http.delete<ClientMatrix[]>(`${this.Url}/${id}`).subscribe();
  }
//fallback
  add(value: any) {
    this.http.post<ClientMatrix[]>(`${this.Url}`, value).subscribe();
  }

  addProduct(clientMatrix: ClientMatrix): void {
    this.clientMatrixModifiedSubject.next({
      item: clientMatrix,
      action: 'add'
    });
  }

  deleteProduct(clientMatrix: ClientMatrix): void {
    this.clientMatrixModifiedSubject.next({
      item: clientMatrix,
      action: 'delete'
    });
  }
}
