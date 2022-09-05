import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CrmService} from "../../../core/services/crm.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as $ from 'jquery';

@Component({
  selector: 'volqueta',
  templateUrl: './volqueta.component.html',
  styleUrls: ['./volqueta.component.scss']
})
export class VolquetaComponent implements OnInit {

  programForm!: FormGroup;
  negociacionesAEnviar: any[] = [];
  productosAEnviar: any[] = [];
  codeService = '';
  id = '';
  embudoId = '';
  negociaciones: any[] = []
  materiales: any[] = []
  placas: any[] = [];
  campos: any = {
    obra: ['', [Validators.required]],
    material: ['', [Validators.required]],
    placa: ['', [Validators.required]],
    origen: ['', [Validators.required]],
    destino: ['', [Validators.required]],
  }
  productSelected: any[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crm: CrmService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      this.codeService = query['service'];
      this.id = query['id'];
      this.getDataNegotiation();
      this.embudoId = query['embudo'];
    })
    // if(this.codeService !=='63'){
    //   delete this.campos.material;
    //   delete this.campos.destino;
    // }
    this.programForm = this.formBuilder.group(this.campos)
    this.traerPlacas();
    $('#datalistOptions2').click(function (e) {
      console.log(e)
    })
  }

  getDataNegotiation() {
    const options = {
      filter: {'STAGE_ID': `WON`, 'UF_CRM_1654179740278': `${this.codeService}`},
    };
    this.crm.getDealList(0, options).subscribe({
      'next': (deals: any) => {
        this.negociaciones = deals.result;
      },
      'error': err => console.log(err)
    })
  }

  newProgram() {
    console.log('_____Values form______', this.programForm.value);
    let program = this.programForm.value;
    program.customId = this.negociacionesAEnviar.length + 1;
    program.producto = this.productSelected[0];
    console.log("Id Material : ", this.programForm.value.material);
    console.log("Materiales : ", this.materiales);
    this.negociacionesAEnviar.push(program);
    console.log("Negociaciones a enviar: ", this.negociacionesAEnviar);
    this.programForm.reset();
  }

  negociacionSeleccionada(event?: any) {
    if (event) {
      this.crm.getDealProductList(`${this.negociaciones.filter((negociacion: any) => negociacion.TITLE === event)[0].ID}`).subscribe({
        'next': (products: any) => {
          this.materiales = products.result;
        }
      });
    }

  }

  actualizarNegociacionesAEnviar(event: any) {
    this.negociacionesAEnviar = event;
  }

  traerPlacas(event?: any) {
    if (event) {
      this.productSelected = []
      this.productSelected = this.materiales.filter(
        product => product.PRODUCT_NAME === event.target.value
      );
      console.log('productSelected', this.productSelected)
    }
    let options = {
      filter: {'UF_CRM_1659061343591': `${this.id}`},
    };

    this.crm.getCompanyList(`${this.id}`, options).subscribe({
      'next': (companies: any) => {
        this.placas = companies.result;
      }
    });
  }

  enviarProgramaciones() {
    console.log("Programaciones a enviar: ", this.negociacionesAEnviar);
    let i = 0;
    while (i < this.negociacionesAEnviar.length){
      this.crm.enviarProgramacion(this.negociacionesAEnviar[i], `${this.embudoId}`).subscribe({
        "next": (result: any) => {
          console.log("Resultado envio de negociación "+i+': ', result);

          const row = [
            {
              PRODUCT_ID: this.negociacionesAEnviar[0].producto.PRODUCT_ID,
              PRICE: this.negociacionesAEnviar[0].producto.PRICE,
              QUANTITY: this.negociacionesAEnviar[0].producto.QUANTITY
            }
          ]
          console.log({row});

          this.crm.agregarProductosANuevaProgramacion(`${result.result}`, row ).subscribe({
            'next': productResult => {
              console.log('productResult ' + i + ' => ', productResult);
              this.router.navigate(['/services']).then()
            },
            'error': error => console.log('productResult '+i+' => ',error),
          })
        },
        "error": (error: any) => console.log("Errorado envio de negociación: ", error)
      });
      i++;
    }
  }


}

// [
//   { "PRODUCT_ID": 689, "PRICE": 100.00, "QUANTITY": 4 },
//   { "PRODUCT_ID": 690, "PRICE": 400.00, "QUANTITY": 1 }
// ]
