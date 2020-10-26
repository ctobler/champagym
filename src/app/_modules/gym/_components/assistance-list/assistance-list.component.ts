import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { NgbDateStruct, NgbCalendar, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

import { AthleteAssistanceByCategoryDTO, CategoryDTO, AssistanceDTO } from '../../_models';
import { AssistanceDatesDTO, AthleteAssistanceDTO } from '../../_models';

import { AssistanceListService } from '../../../../assistance-list/assistance-list.service';
import { CategoryService } from '../category/category.service';

import { AssistanceModalComponent } from './assistance-modal/assistance-modal.component';
import { ViewAssistancesModalComponent } from './view-assistances-modal/view-assistances-modal.component';


@Component({
  selector: 'app-assistance-list',
  templateUrl: './assistance-list.component.html',
  styleUrls: ['./assistance-list.component.scss']
})

export class AssistanceListComponent implements OnInit {
  headerCheckbox: boolean = false;
  form: FormGroup;
  closeResult = '';

  athletesAssistances: any[] = [];

  isFetching = false;
  categories: CategoryDTO[];
  assistanceDTO: AssistanceDTO = { 'athleteId':'0', 'date':'' };
  isFetchingCategory = false;

  button = {
    left: true,
    middle: false,
    right: false
  };

  categoryList: any = [];
  assistanceSearchResultList: any = [];
  searchValue: AthleteAssistanceByCategoryDTO = {
    categoryId:'',
    fromDate: '',
    toDate: ''
  };

  status = {
    pageLoading: false,
    dataLoading: false
  };

  modelFromDate: NgbDateStruct;
  modelToDate: NgbDateStruct;
  modelCheckAllDate:NgbDateStruct;
  assistanceDate: NgbDateStruct;

  modalOptions:NgbModalOptions;

  constructor(
    public fb: FormBuilder,
    private calendar: NgbCalendar,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private assistanceListService: AssistanceListService
  ) {

    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      fromDate: '',
      toDate: '',
      categoryId: '1'
    });
    this.categoryService.fetchCategories().subscribe(
      (response) => {
        this.categories = response;
      },
      (error) => {
        console.log(error);
      }
    );
    this.setFromDate();
    this.setToDate();
    this.setCheckAllDate();

    this.defaultSearch();

  }

  // 27-04-20: Default End Date(ToDate) value: is today date.
  private setToDate(): void {
    this.modelToDate = this.calendar.getToday();
   }

  // 27-04-20: Default Start Date(FromDate) value: is one week prior to End Date(ToDate).
  private setFromDate(): void {
    this.modelFromDate = this.calendar.getPrev(this.calendar.getToday(),'d',6);
   }

   // 11-06-20: Default CheckAllDate value: equal to today's date.
   private setCheckAllDate() : void {
     this.modelCheckAllDate = this.calendar.getToday();
   }

   private defaultSearch() {
    this.searchValue.fromDate = this.modelFromDate.month+'/'+
                                  this.modelFromDate.day+'/'+
                                  this.modelFromDate.year;
    this.searchValue.toDate = this.modelToDate.month+'/'+
                                this.modelToDate.day+'/'+
                                this.modelToDate.year;
    this.searchValue.categoryId = "1";

    var daysDifference=  this.getDaysDifference(this.searchValue);

    this.assistanceListService.fetchAthletesAssistances(this.searchValue).subscribe(
      (response) => {
        this.athletesAssistances = this.calculatePercentages(daysDifference, response);
      },
      (error) => {
        console.log(error);
      });
  }

  search({value}: {value: AthleteAssistanceByCategoryDTO}) {
    value.fromDate= this.form.get('fromDate').value.month+'/'+
                    this.form.get('fromDate').value.day+'/'+
                    this.form.get('fromDate').value.year;
    value.toDate= this.form.get('toDate').value.month+'/'+
                  this.form.get('toDate').value.day+'/'+
                  this.form.get('toDate').value.year;
    if (value.categoryId.length === 0)
      value.categoryId ="0";

    var daysDifference=  this.getDaysDifference(value);

    this.searchValue = value;
    this.assistanceListService.fetchAthletesAssistances(value).subscribe(
      (response) => {
        this.athletesAssistances = this.calculatePercentages(daysDifference, response);
      },
      (error) => {
        console.log(error);
      });
  }

  searchByCategory(value: AthleteAssistanceByCategoryDTO) {
    value.fromDate= this.form.get('fromDate').value.month+'/'+
                    this.form.get('fromDate').value.day+'/'+
                    this.form.get('fromDate').value.year;
    value.toDate= this.form.get('toDate').value.month+'/'+
                  this.form.get('toDate').value.day+'/'+
                  this.form.get('toDate').value.year;
    if (value.categoryId.length === 0)
      value.categoryId ="0";

    var daysDifference=  this.getDaysDifference(value);

    this.searchValue = value;
    this.assistanceListService.fetchAthletesAssistances(value).subscribe(
      (response) => {
        this.athletesAssistances = this.calculatePercentages(daysDifference, response);
      },
      (error) => {
        console.log(error);
      });
  }

  private getDaysDifference(value: AthleteAssistanceByCategoryDTO): number
  {
    var date1= this.convertToDate(value.fromDate);
    var date2= this.convertToDate(value.toDate);
    var diffInDays = (date2.getTime() - date1.getTime())/ (1000*60*60*24);

    return diffInDays+1;
  }

  private calculatePercentages(daysDifference: number, athletesAssistances: AthleteAssistanceDTO[]): AthleteAssistanceDTO[]
  {
    var athletesAssistancesWithPercentage: AthleteAssistanceDTO[] = [];
    var athleteAssistanceWithPercentage: AthleteAssistanceDTO;
    let percentage = 0;

    athletesAssistances.forEach(
      athleteAssistance => {
        athleteAssistanceWithPercentage = athleteAssistance;
        if(athleteAssistance.assistances === 0)
        {
          percentage = 0;
        }
        else if (daysDifference !== 0) {
          // 3 days => % 100
          percentage = athleteAssistance.assistances*100/3;
          var percentage = Math.round(percentage * 10) / 10
        }
        athleteAssistanceWithPercentage.percentage = percentage.toString();
        athletesAssistancesWithPercentage.push(athleteAssistanceWithPercentage);
      }
    );
    return athletesAssistancesWithPercentage;
  }

  private convertToDate(str)
  {
    var dateArr = str.split("/");
    return new Date(dateArr[2], dateArr[0], dateArr[1])
  }

  CheckAll(event:any)
  {
    if (event.currentTarget.checked) {
      this.athletesAssistances
            .forEach(ath=>ath.checked = true);
    } else {
      this.athletesAssistances
            .forEach(ath=>ath.checked = false);
    }
  }

  multipleSelection(option: string) {
    let checkedAthletesId: number[] = [];
    let assistanceDTOList: AssistanceDTO[] = [];

    let postingDate = this.modelCheckAllDate.month+'/'+
                      this.modelCheckAllDate.day+'/'+
                      this.modelCheckAllDate.year;
    checkedAthletesId = this.athletesAssistances
              .filter(ath => ath.checked)
              .map(ath => ath.id);
    for (let id of checkedAthletesId)
    {
      let assistanceDTO: AssistanceDTO = {date:"",athleteId:""};
      assistanceDTO.athleteId = id.toString();
      assistanceDTO.date = postingDate;
      assistanceDTOList.push(assistanceDTO);
    }
    if(assistanceDTOList.length > 0) {
      if( option === 'add') {
        this.assistanceListService.postMultipleAssistances(assistanceDTOList).subscribe(
          () => {
            this.athletesAssistances.forEach(ath=>ath.checked = false);
            if( this.headerCheckbox )
              this.headerCheckbox = false;
              this.searchByCategory(this.searchValue);
          },
          (error) =>{
            console.log(error);
          }
        );
      }else if( option === 'delete') {
        this.assistanceListService.deleteMultipleAssistances(assistanceDTOList).subscribe(
          () => {
            this.athletesAssistances.forEach(ath=>ath.checked = false);
            if( this.headerCheckbox )
              this.headerCheckbox = false;
              this.searchByCategory(this.searchValue);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }
  }

  openModal(athlete, action) {
    if (action === 'create') {
      const modalRef = this.modalService.open(AssistanceModalComponent, this.modalOptions);
      modalRef.componentInstance.title = 'Nueva asistencia - '+ athlete.name + ' ' + athlete.lastName;
      modalRef.componentInstance.emitService.subscribe((emmitedValue) => {
          // process emmitedValue from modal
          this.assistanceDate = emmitedValue;
          this.assistanceDTO.date = this.assistanceDate.month +'/'+
                                    this.assistanceDate.day +'/'+
                                    this.assistanceDate.year;
          this.assistanceDTO.athleteId = athlete.id;
          this.assistanceListService.postAssistance(this.assistanceDTO).subscribe(
            () => {
              this.searchByCategory(this.searchValue);
            }
          );
      });
    } else if ( action === 'view') {
      const modalRef = this.modalService.open(ViewAssistancesModalComponent, this.modalOptions);
      modalRef.componentInstance.title = 'Lista de asistencias - '+ athlete.name + ' ' + athlete.lastName;
      const assistanceDatesDTO: AssistanceDatesDTO = {
        athleteId: athlete.id,
        fromDate: this.searchValue.fromDate,
        toDate: this.searchValue.toDate
      };
      modalRef.componentInstance.assistanceDatesDTO = assistanceDatesDTO;
      modalRef.componentInstance.actionPerformed.subscribe(
        // process action performed from modal
        (action) => {
          if (action === 'delete')
          {
            this.searchByCategory(this.searchValue);
          }
        }
      );
    }
  }
}
