import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { VolquetaComponent } from './components/volqueta/volqueta.component';
import { GruaComponent } from './components/grua/grua.component';
import { MaquinaComponent } from './components/maquina/maquina.component';
import { ServiceLayoutComponent } from './components/service-layout/service-layout.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../core/core.module";


@NgModule({
  declarations: [
    VolquetaComponent,
    GruaComponent,
    MaquinaComponent,
    ServiceLayoutComponent
  ],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})
export class ServicesModule { }
