import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CrmService} from "../../../core/services/crm.service";

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html',
  styleUrls: ['./result-search.component.scss']
})
export class ResultSearchComponent implements OnInit {
  public negociaciones: any[] = [];
  public placa: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly crm: CrmService,
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      this.placa = query['placa']
      this.getDataNegotiation()
    })
  }

  getDataNegotiation() {
    const options = {
      // 'STAGE_ID': `C7:NEW`,
      filter: {
        'UF_CRM_1659706567283': `${this.placa}`
      },
    };
    this.crm.getDealList(0, options).subscribe({
      'next': (deals: any) => {
        this.negociaciones = [];
        this.negociaciones = deals.result;
        console.log(this.negociaciones[0].STAGE_ID.split(':')[1]);
        this.negociaciones = this.negociaciones.filter(negociacion => negociacion.STAGE_ID.split(':')[1].toLowerCase() === 'new')

      },
      'error': err => console.log(err)
    })
  }

}
