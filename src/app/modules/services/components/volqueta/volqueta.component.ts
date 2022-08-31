import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CrmService} from "../../../core/services/crm.service";
import {FormBuilder, FormGroup, UntypedFormControl, Validators} from "@angular/forms";
import {NgSelectConfig} from "@ng-select/ng-select";
import {MatSelect} from "@angular/material/select";
import {ReplaySubject, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'volqueta',
  templateUrl: './volqueta.component.html',
  styleUrls: ['./volqueta.component.scss']
})
export class VolquetaComponent implements OnInit {

  // select de placa con filtro funcional
  // => *** NO TOCAR *** <=
  @ViewChild('placaSelect', {static: true}) placaSelect!: MatSelect;
  public filtroPlacaCtrl: UntypedFormControl = new UntypedFormControl();
  protected _onDestroy = new Subject<void>();
  public placaCtrl: UntypedFormControl = new UntypedFormControl();
  public placasFiltradas: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  // select con filtro funcional
  // => *** NO TOCAR *** <=

  // select de material con filtro funcional
  // => *** NO TOCAR *** <=
  @ViewChild('materialSelect', {static: true}) materialSelect!: MatSelect;
  public filtroMaterialCtrl: UntypedFormControl = new UntypedFormControl();
  // protected _onDestroy = new Subject<void>();
  public materialCtrl: UntypedFormControl = new UntypedFormControl();
  public materialsFiltrados: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  // select con filtro funcional
  // => *** NO TOCAR *** <=

  // select de obra con filtro funcional
  // => *** NO TOCAR *** <=
  @ViewChild('obraSelect', {static: true}) obraSelect!: MatSelect;
  public filtroObraCtrl: UntypedFormControl = new UntypedFormControl();
  // protected _onDestroy = new Subject<void>();
  public obraCtrl: UntypedFormControl = new UntypedFormControl();
  public obrasFiltradas: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  // select con filtro funcional
  // => *** NO TOCAR *** <=

  programForm!: FormGroup;
  codeService = '';
  id = '';
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


  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly crm: CrmService,
    private config: NgSelectConfig,
  ) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
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
    this.traerPlacas();
    this.programForm = this.formBuilder.group(this.campos)
    // placas
    this.placaCtrl.setValue(this.placas[0]);
    this.placasFiltradas.next(this.placas.slice());
    this.filtroPlacaCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarPlacas();
      });

    // material
    this.materialCtrl.setValue(this.materiales[0]);
    this.materialsFiltrados.next(this.materiales.slice());
    this.filtroMaterialCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarMateriales();
      });

    // material
    this.obraCtrl.setValue(this.negociaciones[0]);
    this.obrasFiltradas.next(this.negociaciones.slice());
    this.filtroObraCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filtrarObras();
      });
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
        this.obrasFiltradas.next(this.negociaciones.slice());
      },
      'error': err => console.log(err)
    })
  }

  newProgram() {
// TODO => Agregar a un array la fila completa cuando click en BTN Agregar a Programacion
    console.log('_____origgen______', this.programForm.value.origen)
    console.log('_____destino______', this.programForm.value.destino)
    console.log(this.programForm.value)
    this.programForm.reset();
  }

  traerMateriales(event?: any) {
    console.log(event)
    if (event) {
      this.crm.getDealProductList(`${this.negociaciones.filter((negociacion: any) => negociacion.TITLE === event)[0].ID}`).subscribe({
        'next': (products: any) => {
          console.log('_____products______', products)
          this.materiales = products.result;
          this.materialsFiltrados.next(this.materiales.slice());
        }
      });
    }

  }

  traerPlacas(event?: any) {
    console.log(event)
    let options = {
      filter: {'UF_CRM_1659061343591': `${this.id}`},
    };

    this.crm.getCompanyList(`${this.id}`, options).subscribe({
      'next': (companies: any) => {
        console.log('_____companies______', companies)

        this.placas = companies.result;
        this.placasFiltradas.next(this.placas.slice());
      }
    });
  }

  filtrarPlacas() {
    if (!this.placas) {
      return;
    }
    // get the search keyword
    let search = this.filtroPlacaCtrl.value;
    if (!search) {
      this.placasFiltradas.next(this.placas.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.placasFiltradas.next(
      this.placas.filter(item => item.TITLE.toLowerCase().indexOf(search) > -1)
    );
  }

  filtrarMateriales() {
    if (!this.materiales) {
      return;
    }
    // get the search keyword
    let search = this.filtroMaterialCtrl.value;
    if (!search) {
      this.materialsFiltrados.next(this.materiales.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.materialsFiltrados.next(
      this.materiales.filter(item => item.PRODUCT_NAME.toLowerCase().indexOf(search) > -1)
    );
  }


  filtrarObras() {
    if (!this.negociaciones) {
      return;
    }
    // get the search keyword
    let search = this.filtroObraCtrl.value;
    if (!search) {
      this.obrasFiltradas.next(this.negociaciones.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.obrasFiltradas.next(
      this.negociaciones.filter(item => item.TITLE.toLowerCase().indexOf(search) > -1)
    );
  }

}
