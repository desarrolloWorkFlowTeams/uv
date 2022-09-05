import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ServicesEnum} from "../../../core/utils/services.enum";

@Component({
  selector: 'table-services',
  templateUrl: './table-services.component.html',
  styleUrls: ['./table-services.component.scss']
})
export class TableServicesComponent implements OnInit {

  @Input() negociaciones: any[] = [];
  @Output() nuevasNegociaciones = new EventEmitter();
  path = '';
  servicesEnum = ServicesEnum;
  constructor( private readonly route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.path = param['service'];
    })
  }

  eliminarProgramacion(id: number){
    this.negociaciones = this.negociaciones.filter(negociacion => negociacion.customId !== id);
    this.nuevasNegociaciones.emit(this.negociaciones);
  }

}
