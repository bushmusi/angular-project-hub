import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UnitOfMeasureService {

  unitMeasureURL = environment.rootApiPath + 'finance/cUnit'

  constructor(
    private http: HttpClient
  ) { }

  getUnitMeasureList(){
    return this.http.get(this.unitMeasureURL)
  }

  addUnitMeasure(data){
    return this.http.post(this.unitMeasureURL,data)
  }

  updateUnitMeasure(data){
    return this.http.put(this.unitMeasureURL,data)
  }

  delteUnitMeasure(data){
    return this.http.delete(this.unitMeasureURL+'/'+data.unit)
  }
}
