import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, Subject } from 'rxjs';

import { CategoryDTO } from '../../_models';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiurl = environment.apiurl;

  categoriesChanged = new Subject<CategoryDTO[]>();
  categories: CategoryDTO[] = [];

  constructor(
    private apiService: ApiService,
    private http: HttpClient
    ) { }

    fetchCategories(): Observable<CategoryDTO[]> {
      const url ='Categories'
      return this.http.get<CategoryDTO[]>(`${this.apiurl}/${url}`);
    }

  getCategories(): Observable<CategoryDTO[]> {
    const url = 'Categories';
    const subject = new Subject<CategoryDTO[]>();

    this.apiService.get(url).subscribe(res => {
      return subject.next(res.map(item => ({
        Id: item.Id,
        Number: item.Number,
        Name: item.Name,
        Count: item.Count
      })));
    }, err => {
      return subject.error(err);
    });
    return subject.asObservable();
  }
}


