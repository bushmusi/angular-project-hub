import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionSalesTypeService {

  public transactionSalesTypeUrl = environment.rootApiPath + "finance/STransactionSalesType";
  public busPostingGroupUrl = environment.rootApiPath + "finance/GenBusPostingGroups";

  constructor(private http: HttpClient) {}

  getBusPostingGroups() {
    return this.http.get(this.busPostingGroupUrl);
  }

  getTransactionSalesType() {
    return this.http.get(this.transactionSalesTypeUrl);
  }

  addTransactionSalesType(transactionSalesType) {
    return this.http.post(this.transactionSalesTypeUrl, transactionSalesType);
  }

  updateTransactionSalesType(transactionSalesType) {
    return this.http.put(this.transactionSalesTypeUrl, transactionSalesType);
  }

  deleteTransactionSalesType(transactionSalesType) {
    return this.http.delete(
      this.transactionSalesTypeUrl + "/" + transactionSalesType.code
    );
  }
}