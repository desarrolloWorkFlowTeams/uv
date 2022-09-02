import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'table-services',
  templateUrl: './table-services.component.html',
  styleUrls: ['./table-services.component.scss']
})
export class TableServicesComponent implements OnInit {

  @Input() negociaciones: any[] = [];
  @Output() nuevasNegociaciones = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  eliminarProgramacion(id: number){
    this.negociaciones = this.negociaciones.filter(negociacion => negociacion.customId !== id);
    this.nuevasNegociaciones.emit(this.negociaciones);
  }

}
