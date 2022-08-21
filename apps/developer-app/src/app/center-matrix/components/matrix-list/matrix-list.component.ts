import { Component, OnInit } from '@angular/core';
import { CenterMatrix } from '../../models /center-matrix.model';
import { CenterMatrixService } from '../../services/center-matrix.service';

@Component({
  selector: 'app-matrix-list',
  templateUrl: './matrix-list.component.html',
  styleUrls: ['./matrix-list.component.css']
})
export class MatrixListComponent implements OnInit {
  constructor(private centerMatrixService: CenterMatrixService){}
  public matrixs: CenterMatrix[] = [];

  ngOnInit(): void {
    this.getMatrixs();
  }

  private getMatrixs(): void {
    this.centerMatrixService.getCenterMatrixs().subscribe((res: CenterMatrix[]) => {
      console.log("load matrixs ::::: ", res);
      this.matrixs = res;
    })
  }

  public deleteMatrixs(mat: CenterMatrix): void {
     this.centerMatrixService.deleteCenterMatrix(mat.id).subscribe((res: Object) => {
      console.log("deleted ::::: ", res);
      this.getMatrixs();
    })
  }
}
