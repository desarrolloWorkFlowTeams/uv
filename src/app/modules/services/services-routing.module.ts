import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {VolquetaComponent} from "./components/volqueta/volqueta.component";
import {GruaComponent} from "./components/grua/grua.component";
import {MaquinaComponent} from "./components/maquina/maquina.component";
import {ServiceLayoutComponent} from "./components/service-layout/service-layout.component";

const routes: Routes = [
  {
    path: '',
    component: ServiceLayoutComponent
  },
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
export class ServicesRoutingModule { }
