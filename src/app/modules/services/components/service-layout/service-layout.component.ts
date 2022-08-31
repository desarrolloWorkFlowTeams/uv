import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ServicesEnum} from "../../../core/utils/services.enum";

@Component({
  selector: 'app-service-layout',
  templateUrl: './service-layout.component.html',
  styleUrls: ['./service-layout.component.scss']
})
export class ServiceLayoutComponent implements OnInit {

  servicesForm!: FormGroup;
  services: any[] = [
    {value: 'volqueta', code: ServicesEnum.volqueta},
    {value: 'grúa', code: ServicesEnum.grua},
    {value: 'maquina', code: ServicesEnum.maquina},
  ]

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.servicesForm = this.formBuilder.group({
      service: ['', [Validators.required]],
    })
  }


  goToProgrammingModule() {
    console.log('____valid_____', this.servicesForm.valid)
    console.log('____get(\'service\')_____', this.servicesForm.get('service')?.value)
    if (!this.servicesForm.valid) return;
    console.log('________this.servicesForm.value.service____', this.servicesForm.value.service)
    switch (this.servicesForm.value.service) {
      case ServicesEnum.volqueta:
        this.router.navigate([`/services/volqueta`], {
          queryParams: {
            embudo: 7,
            id: 265,
            service: 63,
          }
        }).then()
        break;case ServicesEnum.grua:
        this.router.navigate([`/services/volqueta`], {
          queryParams: {
            embudo: 3,
            id: 265,
            service: 67,
          }
        }).then()
        break;case ServicesEnum.maquina:
        this.router.navigate([`/services/volqueta`], {
          queryParams: {
            embudo: 9,
            id: 289,
            service: 65 ,
          }
        }).then()
        break;
    }
  }

}
