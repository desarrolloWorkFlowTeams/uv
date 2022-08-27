import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'home-form',
  templateUrl: './home-form.component.html',
  styleUrls: ['./home-form.component.scss']
})
export class HomeFormComponent implements OnInit {

  servicesForm!: FormGroup;
  services: any[] = [
    {value:'volqueta', code: 'volqueta'},
    {value:'grúa', code: 'grua'},
    {value:'maquina', code: 'maquina'},
  ]
  constructor(
    private readonly formBuilder:FormBuilder,
    private readonly router:Router,
    ) { }

  ngOnInit(): void {
    this.servicesForm = this.formBuilder.group({
      service: ['', [Validators.required]]
    })
  }


  goToProgrammingModule() {
    console.log(this.servicesForm.value.service)
    this.router.navigate([`programming/${this.servicesForm.value.service}`],{queryParams: {service: 'aaa', id: 'bbb', embudo:'ccc'}}).then()
  }
}
