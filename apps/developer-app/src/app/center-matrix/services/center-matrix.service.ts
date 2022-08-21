import { CenterMatrix } from '../models /center-matrix.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CenterMatrixService {
  private  api = "http://localhost:3400/api/center-matrix/";

  constructor(private http: HttpClient) { }

  public getCenterMatrixs() {
    return this.http.get<CenterMatrix[]>(this.api);
  }

  public deleteCenterMatrix(id: number) {
    return this.http.delete(this.api + id);
  } 

  public createCenterMatrix(val: CenterMatrix) {
    return this.http.post(this.api, val);
  }
}
