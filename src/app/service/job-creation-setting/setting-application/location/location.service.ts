import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  
  private getSubCityURL = environment.rootPath + 'BPEL/GetLookUp?DropGownName=city'
  constructor(
    private http: HttpClient
  ) { }

  getSubCity(){
    return this.http.get(this.getSubCityURL)
  }
}
