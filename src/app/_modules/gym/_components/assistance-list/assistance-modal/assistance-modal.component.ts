import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgbDateStruct, NgbCalendar, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-assistance-modal',
  templateUrl: './assistance-modal.component.html',
  styleUrls: ['./assistance-modal.component.scss']
})

export class AssistanceModalComponent implements OnInit {

  @Input() title;
  @Input() content;
  @Output() emitService = new EventEmitter();
  assistanceDate: NgbDateStruct;

  constructor(
    public activeModal: NgbActiveModal,
    private calendar: NgbCalendar
  ) {
    this.assistanceDate = this.calendar.getToday();
  }

  ngOnInit(): void {
  }

  postDate() {
    this.emitService.next(this.assistanceDate);
    this.activeModal.close('Post click');
  }

}

