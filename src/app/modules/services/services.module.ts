import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServiceComponent } from './components/service/service.component';
import { ServiceLayoutComponent } from './components/service-layout/service-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../core/core.module";
import { TableServicesComponent } from './components/table-services/table-services.component';


@NgModule({
  declarations: [
    ServiceComponent,
    ServiceLayoutComponent,
    TableServicesComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
  ]
})
export class ServicesModule { }
