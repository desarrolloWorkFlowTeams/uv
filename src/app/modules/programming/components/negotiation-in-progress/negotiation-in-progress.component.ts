import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-negotiation-in-progress',
  templateUrl: './negotiation-in-progress.component.html',
  styleUrls: ['./negotiation-in-progress.component.scss']
})
export class NegotiationInProgressComponent implements OnInit {
  public placa: string = '';
  private idProgrammation: string = '';
  public embudo: string = '';

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      this.placa = query['placa'];
      this.idProgrammation = query['idProgrammation'];
      this.embudo = query['embudo'];
    })
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


}
