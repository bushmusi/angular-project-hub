import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  public getData(){
    console.log(environment.rootPath);
    
    return this.httpClient.get(environment.rootPath+'View_Topic_ERP');
  }
}
