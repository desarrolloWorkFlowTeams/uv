import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CrmService} from "../../../core/services/crm.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as $ from 'jquery';
import {ServicesEnum} from "../../../core/utils/services.enum";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'volqueta',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  programForm!: FormGroup;
  negociacionesAEnviar: any[] = [];
  productosAEnviar: any[] = [];
  codeService = '';
  id = '';
  embudoId = '';
  negociaciones: any[] = []
  materiales: any[] = []
  placas: any[] = [];
  campos: any = {};
  productSelected: any[] = [];
  path = '';
  servicesEnum = ServicesEnum;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crm: CrmService,
    private readonly router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.path = param['service'];
    })

    this.route.queryParams.subscribe(query => {
      this.codeService = query['service'];
      this.id = query['id'];
      this.getDataNegotiation();
      this.embudoId = query['embudo'];
    })

    if (this.path === ServicesEnum.volqueta) {
      this.campos = {
        obra: ['', [Validators.required]],
        material: ['', [Validators.required]],
        placa: ['', [Validators.required]],
        origen: ['', [Validators.required]],
        destino: ['', [Validators.required]],
      }
    }

    if (this.path === ServicesEnum.grua) {
      this.campos = {
        obra: ['', [Validators.required]],
        placa: ['', [Validators.required]],
        origen: ['', [Validators.required]],
        destino: ['', [Validators.required]],
      }
    }

    if (this.path === ServicesEnum.maquina) {
      this.campos = {
        obra: ['', [Validators.required]],
        material: ['', [Validators.required]],
      }
    }

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
        this.negociaciones = [];
        this.negociaciones = deals.result;
      },
      'error': err => console.log(err)
    })
  }

  newProgram() {
    if (this.programForm.valid) {
      console.log('_____Values form______', this.programForm.value);
      let program = this.programForm.value;
      program.customId = this.negociacionesAEnviar.length + 1;
      program.producto = this.productSelected[0];
      console.log("Id Material : ", this.programForm.value.material);
      console.log("Materiales : ", this.materiales);
      this.negociacionesAEnviar.push(program);
      console.log("Negociaciones a enviar: ", this.negociacionesAEnviar);
      this.programForm.reset();
      this.getDataNegotiation();
    }
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

  async enviarProgramaciones() {
    console.log("Programaciones a enviar: ", this.negociacionesAEnviar);
    let i = 0;
    if(this.negociacionesAEnviar.length!==0){
      while (i < this.negociacionesAEnviar.length) {
        const idNegociacion: any = await this.crm.enviarProgramacion( `${this.path}`, this.negociacionesAEnviar[i], `${this.embudoId}`)

        if (idNegociacion) {

          if(this.path ===this.servicesEnum.volqueta || this.path === this.servicesEnum.maquina){
            const row = [
              {
                PRODUCT_ID: this.negociacionesAEnviar[i].producto.PRODUCT_ID,
                PRICE: this.negociacionesAEnviar[i].producto.PRICE,
                QUANTITY: this.negociacionesAEnviar[i].producto.QUANTITY
              }
            ]
            console.log({row});
            console.log('____idNegociacion____',idNegociacion.result)
            this.crm.agregarProductosANuevaProgramacion(`${idNegociacion.result}`, row).subscribe({
              'next': (productResult: any) => {
                console.log('productResult ' + i + ' => ', productResult);
                if(productResult) this.toastr.success('Nueva programacion '+ idNegociacion.result +' creada exitosamente!', 'Bien!');
              },
              'error': error => {
                console.log('productResult ' + i + ' => ', error);
                if(error) this.toastr.error('Algo salio mal!', 'Error!');
              },
            })
          }else{
            this.toastr.success('Nueva programacion '+ idNegociacion.result +' creada exitosamente!', 'Bien!');
          }

        }else{
          console.log('____else____',idNegociacion.result)
          this.toastr.error('Algo salio mal!', 'Error!');
        }
        i++;
      }
    }

    this.router.navigate(['/services']).then()
  }


}
