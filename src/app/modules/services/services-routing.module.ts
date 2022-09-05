import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ServiceComponent} from "./components/service/service.component";
import {ServiceLayoutComponent} from "./components/service-layout/service-layout.component";

const routes: Routes = [
  {
    path: '',
    component: ServiceLayoutComponent
  },
  {
    path: ':service',
    component: ServiceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicesRoutingModule { }
