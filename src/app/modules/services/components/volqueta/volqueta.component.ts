import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CrmService} from "../../../core/services/crm.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'volqueta',
  templateUrl: './volqueta.component.html',
  styleUrls: ['./volqueta.component.scss']
})
export class VolquetaComponent implements OnInit {

  programForm!: FormGroup;
  codeService = '';
  id='';
  negociaciones: any[]= []
  materiales: any[] = []
  placas: any[] = [];
  campos: any = {
    obra: ['', [Validators.required]],
    material: ['', [Validators.required]],
    placa: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crm: CrmService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      this.codeService = query['service'];
      this.id = query['id'];
      console.log(query['service'])
      console.log(query['id'])
      console.log(query['embudo'])
      this.getDataNegotiation();
    })
    // if(this.codeService !=='63'){
    //   delete this.campos.material;
    //   delete this.campos.destino;
    // }
    this.programForm = this.formBuilder.group(this.campos)
    this.traerPlacas();
  }

  getDataNegotiation() {
    // "filter"=> [ "STAGE_ID"=>"WON","UF_CRM_1654179740278"=>$numServicio ]
    const options = {
      filter: {'STAGE_ID': `WON`, 'UF_CRM_1654179740278': `${this.codeService}`},
    };
    this.crm.getDealList(0, options).subscribe({
      'next': (deals: any) => {
        console.log(deals);
        this.negociaciones = deals.result;
      },
      'error': err => console.log(err)
    })
  }

  newProgram() {

console.log('_____origgen______',this.programForm.value.origen)
console.log('_____destino______',this.programForm.value.destino)
    this.programForm.reset();
  }

  negociacionSeleccionada(event?: any) {
    console.log(event)
    if(event){
      this.crm.getDealProductList(`${this.negociaciones.filter((negociacion:any) => negociacion.TITLE === event)[0].ID}`).subscribe({
        'next': (products: any) =>{
          console.log('_____products______',products)
          this.materiales = products.result;
        }
      });
    }

  }

  traerPlacas(event?: any) {
    console.log(event)
    let options = {
          filter: { 'UF_CRM_1659061343591': `${this.id}`},
        };

    this.crm.getCompanyList(`${this.id}`, options).subscribe({
      'next': (companies: any) =>{
        console.log('_____companies______',companies)

        this.placas = companies.result;
      }
    });
  }
}
