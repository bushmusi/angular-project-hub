import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaxBusPostingGroupService {

  public taxBusPostingGroupUrl =
    environment.rootApiPath + "finance/TAXBusPostingGroup";

  constructor(private http: HttpClient) {}

  getTaxBusPostingGroups() {
    return this.http.get(this.taxBusPostingGroupUrl);
  }

  addTaxBusPostingGroups(taxBusPostingGroup) {
    return this.http.post(this.taxBusPostingGroupUrl, taxBusPostingGroup);
  }

  updateTaxBusPostingGroups(taxBusPostingGroup) {
    return this.http.put(this.taxBusPostingGroupUrl, taxBusPostingGroup);
  }

  deleteTaxBusPostingGroups(taxBusPostingGroup) {
    return this.http.delete(this.taxBusPostingGroupUrl + "/" + taxBusPostingGroup.code);
  }
}
