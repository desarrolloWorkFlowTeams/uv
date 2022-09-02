import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'table-services',
  templateUrl: './table-services.component.html',
  styleUrls: ['./table-services.component.scss']
})
export class TableServicesComponent implements OnInit {

  @Input() negociaciones: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
