import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CenterMatrixService } from '../../services/center-matrix.service';

@Component({
  selector: 'app-matrix-create',
  templateUrl: './matrix-create.component.html',
  styleUrls: ['./matrix-create.component.css'],
})
export class MatrixCreateComponent implements OnInit {
  constructor(
    private centerMatrixService: CenterMatrixService,
    public fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {}
  
  public matrixForm = this.fb.group({
    center_name: new FormControl(''),
    GSSN_COMPANYID: new FormControl(''),
    GSSN_OUTLETID: new FormControl(''),
    vd_name: new FormControl(''),
    vfnr: new FormControl(''),
    vfnr_hb: new FormControl(''),
    mode: new FormControl(''),
    sortorder: new FormControl(''),
    brand: new FormControl(''),
    status: new FormControl(''),
    shortcut: new FormControl(''),
    company_name: new FormControl(''),
    branch: new FormControl(''),
    street: new FormControl(''),
    zip: new FormControl(''),
    place: new FormControl(''),
    region: new FormControl(''),
    phone: new FormControl(''),
    website: new FormControl(''),
  });

  public createMatrix(): void {
    this.centerMatrixService
      .createCenterMatrix(this.matrixForm.value)
      .subscribe((res) => {
        console.log('created ::::: ', res);
        this.router.navigate(['/matrixList']);
      });
  }
}
