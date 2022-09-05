import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ServicesEnum} from "../utils/services.enum";

@Injectable({
  providedIn: 'root'
})
export class CrmService {
  crm = environment.crm

  constructor(private readonly http: HttpClient) {
  }

  getDealForId(method: string, id: string) {
    const params = new HttpParams()
      .set('id', `${id}`)
    return this.http.get(`${this.crm}/${method}.json`, {params})
  }

  getDealList(start: number, options: any) {
    const params = new HttpParams()
      .set('start', `${start}`)
    const body = options;
    return this.http.post(`${this.crm}/crm.deal.list.json`, body, {params});
  }

  getDealProductList(id: string) {
    const params = new HttpParams()
      .set('id', `${id}`)
    return this.http.get(`${this.crm}/crm.deal.productrows.get.json`, {params});
  }

  getCompanyList(id: string, options: any) {
    const params = new HttpParams()
      .set('id', `${id}`)
    const body = options;
    return this.http.post(`${this.crm}/crm.company.list.json`, body, {params});
  }

  enviarProgramacion(service: string, programacion: any, embudo: string) {

    if(!programacion && !embudo) return;

    let fields: any = {
        TITLE: `${programacion.obra}`,
        CATEGORY_ID: `${embudo}`,
        UF_CRM_1659706553211: `${programacion.obra}`,
    }

    if(service === ServicesEnum.grua || service === ServicesEnum.volqueta){
      fields = {
        TITLE: `${programacion.obra}`,
        CATEGORY_ID: `${embudo}`,
        UF_CRM_1659706567283: `${programacion.placa}`,
        UF_CRM_1659706553211: `${programacion.obra}`,
        UF_CRM_1654545135809: [`${programacion.origen}`],
        UF_CRM_1654545151906: [`${programacion.destino}`]
      }
    }

    const body = { fields }

    console.log({body})
    return this.http.post(`${this.crm}/crm.deal.add`, body).toPromise();
  }

  agregarProductosANuevaProgramacion(id: string, rows: any[]) {
    const body = {
      id,
      rows,
    }
    return this.http.post(`${this.crm}/crm.deal.productrows.set`, body);
  }
}
