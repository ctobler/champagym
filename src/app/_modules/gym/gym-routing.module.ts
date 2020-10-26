import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssistanceListComponent } from '../gym/_components';
import { CategoryComponent } from '../gym/_components/category/category.component';
import { AssistanceModalComponent } from './_components/assistance-list/assistance-modal/assistance-modal.component';

const routes: Routes = [
  {
    path: '',
    component: AssistanceListComponent
  },
  {path: 'assistances', pathMatch: 'full', component: AssistanceListComponent},
  {path: 'assistanceModal', pathMatch: 'full', component: AssistanceModalComponent},
  {path: 'categories', pathMatch: 'full', component: CategoryComponent},
  {path: '**', redirectTo: 'assistances'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GymRoutingModule { }
