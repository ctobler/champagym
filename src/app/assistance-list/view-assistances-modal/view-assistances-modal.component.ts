// import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// import { AssistanceDatesDTO } from 'src/app/models/assistance-dates-dto';
// import { AssistanceDTO } from 'src/app/models/assistance-dto';
// import { AssistanceListService } from '../assistance-list.service';

// @Component({
//   selector: 'app-view-assistances-modal',
//   templateUrl: './view-assistances-modal.component.html',
//   styleUrls: ['./view-assistances-modal.component.scss']
// })
// export class ViewAssistancesModalComponent implements OnInit {

//   @Input() title;
//   @Input() assistanceDatesDTO: AssistanceDatesDTO;
//   @Output() actionPerformed = new EventEmitter();

//   assistanceDatesList: AssistanceDTO[] = [];
//   constructor(
//     public activeModal: NgbActiveModal,
//     public assistanceListService: AssistanceListService
//   ) { }

//   ngOnInit(): void {
//     this.assistanceListService.fetchAssistanceDates(this.assistanceDatesDTO).subscribe(
//       (assistances) => {
//         console.log(assistances);
//         this.assistanceDatesList = assistances;
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   }

//   openModal(assistance, action) {
//     this.assistanceListService.deleteAssistance(assistance.id).subscribe(
//       () => {
//         this.actionPerformed.next(action);
//         this.assistanceListService.fetchAssistanceDates(this.assistanceDatesDTO).subscribe(
//           (assistances) => {
//             this.assistanceDatesList = assistances;
//           },
//           (err) => {
//             console.log(err);
//           }
//         );
//       },
//       (err) => {
//         console.log(err)
//       }
//     );
//   }

// }
