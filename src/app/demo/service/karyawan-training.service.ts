import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KaryawanTrainingService {

    ApiUrl!: string;

  constructor(private httpClient: HttpClient) {
    this.ApiUrl = environment.apiUrl;
   }

   async getAPI(url: string, event: any, body: any) {
    let rh: any;

    try {
        rh = await lastValueFrom(this.httpClient.get<any>(this.ApiUrl + url + event,
            {
                params: new HttpParams(body),
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }),
            }
        ));
    }
    catch (e) {

    }

    return rh;
   }

   async postAPI(url: string, body: any) {
    let rh: any;

    try {
        rh = await lastValueFrom(this.httpClient.post<any>(this.ApiUrl + url, body,
            {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }),
            }
        ));
    }
    catch (e) {

    }
    return rh;
   }

   async putAPI(url: string, body: any) {
    let rh: any;

    try {
        rh = await lastValueFrom(this.httpClient.put<any>(this.ApiUrl + url, body,
            {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }),
            }
        ));
    }
    catch (e){

    }
    return rh;
   }

   async delAPI(url: string, body: any) {
    let rh: any;

    try {
        rh = await lastValueFrom(this.httpClient.delete<any>(this.ApiUrl + url + body,
            {
                headers: new HttpHeaders({
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }),
            }
        ));
    }
    catch (e){

    }
    return rh;
   }
}
