import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import { CrmService } from 'src/app/modules/core/services/crm.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-negotiation-in-progress',
  templateUrl: './negotiation-in-progress.component.html',
  styleUrls: ['./negotiation-in-progress.component.scss']
})
export class NegotiationInProgressComponent implements OnInit {

  updateProgramForm!: FormGroup;
  public placa: string = '';
  public idProgrammation: string = '';
  public embudo: string = '';
  campos: any = {};
  programationUpdate: any = {};

  constructor(
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly crm: CrmService,
    private toastr: ToastrService,
    private readonly router: Router,
    ) {
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(query => {
      this.placa = query['placa'];
      this.idProgrammation = query['idProgrammation'];
      this.embudo = query['embudo'];
    })

    if (this.embudo === "9") {
      this.campos = {
        numRecibo: ['', [Validators.required]],
        horometroInicial: ['', [Validators.required]],
        horometroFinal: ['', [Validators.required]],
        cantidad: ['', [Validators.required]]
      }
    }
    if (this.embudo === "7") {
      this.campos = {
        numRecibo: ['', [Validators.required]],
        cantidad: ['', [Validators.required]]
      }
    }
    if (this.embudo === "3") {
      this.campos = {
        numRecibo: ['', [Validators.required]]
      }
    }

    this.updateProgramForm = this.formBuilder.group(this.campos)

  }

  showInput(embudo: string, inputName: string) {
    let show = false;
    switch (embudo) {
      case '3':
        // grua
        show = false;
        break;
      case '7':
        // volqueta
        show = inputName === 'cantidad';
        break;
      case '9':
        // Maquina
          show = true;
        break;
    }
    return show;
  }

  saveProgramationUpdate() {
    this.programationUpdate = this.updateProgramForm.value;
    this.programationUpdate['etapa'] = `C${this.embudo}:PREPARATION`;
    let i = 0;
    if (this.updateProgramForm.valid) {
      this.crm.actualizarProgramacion(this.idProgrammation, this.programationUpdate, this.embudo).subscribe({
        'next': (programUpdate: any) => {
          console.log('programResult ' + i + ' => ', programUpdate)
          if(programUpdate) this.toastr.success('Programacion '+ this.idProgrammation +' actualizada exitosamente!', 'Bien!');
        },
        'error': err => {
          console.log('programResult ' + i + ' => ', err);
          if(err) this.toastr.error('Algo salio mal!', 'Error!');
        }
      });
      console.log('Campos del formulario: ', this.programationUpdate);
      this.router.navigate(['/programming']).then();
    }
  }

}
