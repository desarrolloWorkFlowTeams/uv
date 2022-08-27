import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {CrmService} from "../../../core/services/crm.service";

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss']
})
export class HomeLayoutComponent implements OnInit {

  deals: any [] = [];
  constructor(private readonly crm: CrmService) {
  }

  ngOnInit(): void {
    // this.crm.getDealForId('crm.deal.get', '1483').subscribe({
    //   'next': (deal: any) => {
    //     console.log(('_').repeat(50))
    //     console.log(deal.result)
    //     console.log(('_').repeat(50))
    //   }
    // })
    let start = 0;
      let next = true
    // while(next){
    //
    //   start = start + 50;
    // }
    let options = {
      filter: {'STAGE_ID': 'C7:PREPARATION', 'UF_CRM_1659706567283': "SNX609"},
      select: ['UF_CRM_1659706567283']
    };
    this.crm.getDealList('crm.deal.list', 50, options).subscribe({
      'next': (deal: any) => {
        console.log(deal)
        // deal.result.forEach((item: any)=> {
        //   //if(item.hasOwnProperty('UF_CRM_1659706567283'))
        //   this.deals.push(item)
        // })
      }
    })
    console.log({deals: this.deals});
  }

}
// UF_CRM_1659706567283
// STAGE_ID: C7:PREPARATION
