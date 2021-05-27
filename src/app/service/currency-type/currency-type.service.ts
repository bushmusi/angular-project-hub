import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CurrencyTypeService {

  constructor(
    private http: HttpClient,
  ) { }

  public getCurrencyURL = environment.rootApiPath + "finance/CCurrencyID"

  getCurrencyList(){
    return this.http.get(this.getCurrencyURL)
  }

  addCurrency(data){
    return this.http.post(this.getCurrencyURL,data)
  }

  updateCurrency(data){
    return this.http.put(this.getCurrencyURL,data)
  }

  deleteCurrency(data){
    return this.http.delete(this.getCurrencyURL+'/'+data.currencyID)
  }

}
