import {Component, OnInit} from '@angular/core';
import {CrmService} from "../../../core/services/crm.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  id: string = "265";
  placas: any[] = [];
  deals: any [] = [];
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
      filter: {'STAGE_ID': `${this.state}`, 'UF_CRM_1659706567283': "SNX609"},
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
    let options = {
      filter: {'UF_CRM_1659061343591': `${this.id}`},
    };

    this.crm.getCompanyList(`${this.id}`, options).subscribe({
      'next': (companies: any) => {
        this.placas = companies.result;
      }
    });
  }

  searchRequest() {
    if (this.searchForm.valid) {
      this.router.navigate(['/programming/result-search'], {queryParams: {placa: this.searchForm.value.placa}}).then()
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

