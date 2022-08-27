import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CrmService {
crm = environment.crm
  constructor(private readonly http: HttpClient) { }

  getDealForId(method:string, id: string){
  const params = new HttpParams()
    .set('id',`${id}`)
    return this.http.get(`${this.crm}/${method}.json`, {params})
  }

  getDealList(method:string, start: number, options: any){
  const params = new HttpParams()
    .set('start',`${start}`)
    const body = options;
    return this.http.post(`${this.crm}/${method}.json`,body, {params})
  }
}
