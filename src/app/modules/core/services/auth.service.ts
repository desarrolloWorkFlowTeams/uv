import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oAuthURL = environment.authURL;
  appURL = environment.appURL;
  app_ID = environment.app_ID;
  constructor(private readonly http: HttpClient) { }

  authentication(token: string ){
    // this.oAuthURL}/?response_type=code&client_id=app_ID&redirect_uri=app_URL
    // const hreaders = new HttpHeaders()
    //   .set('Authorization', `Bearer ${token}`)
    console.log({oAuthURL: this.oAuthURL, appURL: this.appURL, app_ID: this.app_ID})
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', '1')
      .set('redirect_uri', 'localhost:4200');
    console.log(params)
    return // this.http.get(`${this.oAuthURL}/`, {params})
  }
}
