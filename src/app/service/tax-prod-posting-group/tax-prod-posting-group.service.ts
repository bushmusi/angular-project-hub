import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TaxProdPostingGroupService {
  public taxProdPostingGroupUrl =
    environment.rootApiPath + "finance/TAXProdPostingGroup";

  constructor(private http: HttpClient) {}

  getTaxProdPostingGroups() {
    return this.http.get(this.taxProdPostingGroupUrl);
  }

  addTaxProdPostingGroups(taxProdPostingGroup) {
    return this.http.post(this.taxProdPostingGroupUrl, taxProdPostingGroup);
  }

  updateTaxProdPostingGroups(taxProdPostingGroup) {
    return this.http.put(this.taxProdPostingGroupUrl, taxProdPostingGroup);
  }

  deleteTaxProdPostingGroups(taxProdPostingGroup) {
    return this.http.delete(this.taxProdPostingGroupUrl + "/" + taxProdPostingGroup.code);
  }
}
