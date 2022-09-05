import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchComponent} from "./components/search/search.component";
import { ResultSearchComponent } from './components/result-search/result-search.component';
import { NegotiationInProgressComponent } from './components/negotiation-in-progress/negotiation-in-progress.component';

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path:'result-search',
    component:ResultSearchComponent
  },
  {
    path:'negotiation-in-progress',
    component:NegotiationInProgressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgrammingRoutingModule { }
