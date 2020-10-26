import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { GymRoutingModule } from './gym-routing.module';
import { CategoryComponent } from './_components/category/category.component';
import { AssistanceListComponent } from './_components/assistance-list/assistance-list.component';
import { AssistanceModalComponent } from './_components/assistance-list/assistance-modal/assistance-modal.component';
import { ViewAssistancesModalComponent } from './_components/assistance-list/view-assistances-modal/view-assistances-modal.component';


@NgModule({
  declarations: [
    AssistanceListComponent,
    CategoryComponent,
    AssistanceModalComponent,
    ViewAssistancesModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GymRoutingModule,
    NgbModule
  ],
  entryComponents:[
    AssistanceModalComponent,
    ViewAssistancesModalComponent
  ],
})
export class GymModule { }
