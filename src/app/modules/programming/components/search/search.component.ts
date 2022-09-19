import { Component, OnInit } from '@angular/core';
import { CrmService } from "../../../core/services/crm.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  idConductor: string = "265";
  idMaquina: string = "289";
  optionsSelect: any;
  resulCompanies: any;
  placas: any[] = [];
  deals: any[] = [];
  state = 'C7:PREPARATION';
  campos: any = {};

  constructor(
    private readonly crm: CrmService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.campos = {
      placa: ['', [Validators.required]],
    }
    this.searchForm = this.formBuilder.group(this.campos)
    this.traerPlacas();
    let options = {
      filter: { 'STAGE_ID': `${this.state}`, 'UF_CRM_1659706567283': "SNX609" },
      select: ['UF_CRM_1659706567283', 'STAGE_ID']
    };
    this.crm.getDealList(0, options).subscribe({
      'next': (deal: any) => {
        console.log(deal)
      },
      'error': error => console.log(error),
    })
  }

  traerPlacas(event?: any) {
    this.optionsSelect = [
      {
        filter: { 'UF_CRM_1659061343591': `${this.idConductor}` }
      },
      {
        filter: { 'UF_CRM_1659061343591': `${this.idMaquina}` }
      }
    ];

    for (let index = 0; index < this.optionsSelect.length; index++) {
      this.crm.getCompanyList(`${this.optionsSelect[index].filter.UF_CRM_1659061343591}`, this.optionsSelect[index]).subscribe({
        'next': (companies: any) => {
          this.resulCompanies = companies.result;
          for (let i = 0; i < this.resulCompanies.length; i++) {
            this.placas.push(this.resulCompanies[i].TITLE);
          }
        }
      });
    }
  }

  searchRequest() {
    if (this.searchForm.valid) {
      this.router.navigate(['/programming/result-search'], { queryParams: { placa: this.searchForm.value.placa } }).then()
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Porfavor seleccione una placa!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

}

