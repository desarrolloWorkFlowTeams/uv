import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../environments/environment";

@Component({
  selector: 'main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  logo= environment.logoUriVolquetas;
  copyrightYear = new Date(Date.now()).getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
