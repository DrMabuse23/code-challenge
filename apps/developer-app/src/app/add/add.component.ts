import { Output, Component, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Location } from 'libs/common/center-matrix/src/lib/location.interface';

@Component({
  selector: 'tss-job-interview-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  @Output() location = new EventEmitter<Location>();

  constructor(public activeModal: NgbActiveModal) {
    /* Inialize a reative form for a Location entry */
  }

  onSend() {
    this.location.emit(/* `Location` entry from the form */);
  }
}
