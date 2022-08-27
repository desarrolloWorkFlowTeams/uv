import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgrammingRoutingModule } from './programming-routing.module';
import { VolquetaComponent } from './components/volqueta/volqueta.component';
import { GruaComponent } from './components/grua/grua.component';
import { MaquinaComponent } from './components/maquina/maquina.component';
import {CoreModule} from "../core/core.module";


@NgModule({
  declarations: [
    VolquetaComponent,
    GruaComponent,
    MaquinaComponent,

  ],
  imports: [
    CommonModule,
    ProgrammingRoutingModule,
    CoreModule,
  ]
})
export class ProgrammingModule { }
