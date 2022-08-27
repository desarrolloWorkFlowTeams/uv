import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-volqueta',
  templateUrl: './volqueta.component.html',
  styleUrls: ['./volqueta.component.scss']
})
export class VolquetaComponent implements OnInit {

  constructor(private readonly route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      console.log(query['service'])
      console.log(query['id'])
      console.log(query['embudo'])
    })
  }

}
