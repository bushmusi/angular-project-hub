import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ActualBudgetService {
  private actualBudgetUrl = environment.rootApiPath + 'budget/BudgetActual'
  constructor(private http: HttpClient) { }

  getActualBudget(){
    return this.http.get(this.actualBudgetUrl)
  }

  addActualBudget(data){
    return this.http.post(this.actualBudgetUrl,data)
  }

  updateActualBudget(data){
    return this.http.put(this.actualBudgetUrl,data)
  }

  deleteActualBudget(data){
    return this.http.delete(this.actualBudgetUrl+'/'+data.budget_ActualID)
  }
}
