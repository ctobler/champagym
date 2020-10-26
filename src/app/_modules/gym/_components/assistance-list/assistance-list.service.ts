import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, from } from 'rxjs';

// DTOs
import { AssistanceDatesDTO, AssistanceDTO, AthleteAssistanceByCategoryDTO } from  '../../_models';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssistanceListService {

  apiurl = environment.apiurl;
  assistancesChanged = new Subject<any[]>();

  constructor(
    private http: HttpClient
    ) { }

    fetchAthletesAssistances(formFilters: AthleteAssistanceByCategoryDTO): Observable<any[]> {
      const url = 'AthleteAssistance/GetAthletesAssistances';
      return this.http.post<any[]>(`${this.apiurl}/${url}`,formFilters);
    }

    postAssistance(assistanceDTO: AssistanceDTO): Observable<any>{
      const url = 'Assistance';
      return this.http.post<any>(`${this.apiurl}/${url}`, assistanceDTO);
    }

    postMultipleAssistances(assistanceDTOList: AssistanceDTO[]): Observable<any[]>{
      const url = 'Assistance/PostAssistanceList';
      return this.http.post<any[]>(`${this.apiurl}/${url}`, assistanceDTOList);
    }

    deleteMultipleAssistances(assistanceDTOList: AssistanceDTO[]) {
      const url = 'Assistance/DeleteAssistanceList';
      return this.http.post<any[]>(`${this.apiurl}/${url}`, assistanceDTOList);
    }

    fetchAssistanceDates(assistanceDatesDTO: AssistanceDatesDTO): Observable<any[]> {
      const url = 'Assistance/GetAssistanceDates';
      return this.http.post<any[]>(`${this.apiurl}/${url}`, assistanceDatesDTO);
    }

    deleteAssistance(assistanceId): Observable<any> {
      const url = 'Assistance/';
      return this.http.delete<any>(`${this.apiurl}/${url}`+assistanceId);
    }



}
