import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from "@angular/router";
import {CrmService} from 'src/app/modules/core/services/crm.service';
import {ToastrService} from 'ngx-toastr';
import Swal from 'sweetalert2';

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
  file!: File;
  private detailUrl: string = '';


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
        fotoRecibo: ['', [Validators.required]],
        numRecibo: ['', [Validators.required]],
        horometroInicial: ['', [Validators.required]],
        horometroFinal: ['', [Validators.required]],
        cantidad: ['', [Validators.required]]
      }
    }
    if (this.embudo === "7") {
      this.campos = {
        fotoRecibo: ['', [Validators.required]],
        numRecibo: ['', [Validators.required]],
        cantidad: ['', [Validators.required]]
      }
    }
    if (this.embudo === "3") {
      this.campos = {
        fotoRecibo: ['', [Validators.required]],
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
    if (this.updateProgramForm.valid) {
      this.crm.uploadImage2().subscribe((value: any) => {
        if (value) {
          this.crm.uploadImage(value?.result.uploadUrl, this.file).subscribe((value2: any) => {
            if (value2) {
              this.crm.showImage(Number(value2.result.ID)).subscribe((value3: any) => {
                if (value3) {
                  this.detailUrl = value3.result
                  this.programationUpdate = this.updateProgramForm.value;
                  this.programationUpdate['etapa'] = `C${this.embudo}:PREPARATION`;

                  this.crm.actualizarProgramacion(this.idProgrammation, this.programationUpdate, this.embudo, this.detailUrl).subscribe({
                    'next': (programUpdate: any) => {
                      if (programUpdate) this.toastr.success('¡Programacion ' + this.idProgrammation + ' actualizada exitosamente!', '¡Bien!');
                    },
                    'error': err => {
                      if (err) this.toastr.error('¡Algo salio mal!', '¡Error!');
                    }
                  });
                  this.router.navigate(['/programming']).then();
                }
              })
            }
          })
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: '¡Porfavor llene todos los campos!',
        // footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  }

  uploadFileEvt(imgFile: any) {
    this.file = imgFile.target.files[0];
  }

}
