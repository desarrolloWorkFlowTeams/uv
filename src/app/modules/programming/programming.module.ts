import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProgrammingRoutingModule } from './programming-routing.module';
import {CoreModule} from "../core/core.module";
import { SearchComponent } from './components/search/search.component';


@NgModule({
  declarations: [
    SearchComponent,

  ],
  imports: [
    CommonModule,
    ProgrammingRoutingModule,
    CoreModule,
  ]
})
export class ProgrammingModule { }
