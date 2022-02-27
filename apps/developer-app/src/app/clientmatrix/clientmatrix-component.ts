import {Component} from "@angular/core";
import {ClientMatrixService} from "../shared/clientmatrix-service";
import {BehaviorSubject, catchError, combineLatest, EMPTY, map, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'tss-job-interview-client-matrix',
  templateUrl: './clientmatrix-component.html',
  styleUrls: ['./clientmatrix-component.scss']
})
export class ClientmatrixComponent {
  clientMatrixForm: FormGroup;
  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  pageTitle = 'Client Matrix';
  vfnr = ['0','1','2','3','4','5'];
  private categorySelectedSubject = new BehaviorSubject<string>('');
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  constructor(private clientMatrixService: ClientMatrixService, private fb: FormBuilder) {
    this.clientMatrixForm = this.fb.group({
      center_name: ['', [Validators.required]],
      GSSN_COMPANYID: ['', [Validators.required]],
      GSSN_OUTLETID: ['', [Validators.required]],
      vd_name: ['', [Validators.required]],
      vfnr: ['', [Validators.required]],
      vfnr_hb: ['', [Validators.required]],
      mode: ['', [Validators.required]],
      sortorder: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      status: ['', [Validators.required]],
      shortcut: ['', [Validators.required]],
      branch: ['', [Validators.required]],
      street: ['', [Validators.required]],
      zip: ['', [Validators.required]],
      place: ['', [Validators.required]],
      region: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      website: ['', [Validators.required]]
    });
  }

  clientMatrix$ = combineLatest([
    this.clientMatrixService.clientMatrix$,
    //this.clientMatrixService.clientMatrixCRUD$,
    this.categorySelectedAction$
  ])
    .pipe(
      map(([clientMatrix, categorySelected]) =>
        clientMatrix.filter(entry =>
          categorySelected ? entry.vfnr === categorySelected : true
        )),
      catchError(err => {
        this.errorMessageSubject.next(err);
        return EMPTY;
      })
    );

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(categoryId);
  }

  delete(clienMatrix: any) {
    if (confirm('Are you sure, You want to delete?')) {
      this.clientMatrixService.delete(clienMatrix.id);
    }

  }
  save(value: any) {
    this.clientMatrixService.addProduct(value);
  }

  update(clientMatrix: any) {
  // TODO
  }
}
