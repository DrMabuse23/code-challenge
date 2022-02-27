import { Component, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { AddComponent } from './add/add.component';
import { Location } from 'libs/common/center-matrix/src/lib/location.interface';
import { CrudService } from './services/crud.service';

@Component({
  selector: 'tss-job-interview-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  private close$ = new Subject();

  constructor(public crudService: CrudService, private modalService: NgbModal) { }

  onAdd() {
    const modalRef = this.modalService.open(AddComponent);
    modalRef.componentInstance.location.pipe(
      switchMap((location: Location) => this.crudService.newEntry(location)),
      takeUntil(this.close$)
    ).subscribe();
  }

  onRefresh() {
    this.crudService.getAllEntries().pipe(
      takeUntil(this.close$)
    ).subscribe();
  }

  onEdit() {
    /* Make each property of the selected location entry editable and show a OK and cancel button.
       On clicking OK, send the PUT request with the current values of the entry */
  }

  onRemove() {
    /* Show remove entry modal */
  }

  ngOnDestroy() {
    this.close$.next(null);           // close open subscriptions
    this.close$.complete();
  }
}
