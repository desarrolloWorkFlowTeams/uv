import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VolquetaComponent} from "./components/volqueta/volqueta.component";
import {GruaComponent} from "./components/grua/grua.component";
import {MaquinaComponent} from "./components/maquina/maquina.component";

const routes: Routes = [
  {
    path: 'volqueta',
    component: VolquetaComponent
  },{
    path: 'grua',
    component: GruaComponent
  },{
    path: 'maquina',
    component: MaquinaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProgrammingRoutingModule { }
