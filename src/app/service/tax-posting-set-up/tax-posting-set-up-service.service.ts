import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TaxPostingSetupService {
  private getTaxPostingSetupListUrl =
    environment.rootPath2 + "finance/cTAXPostingSetup";
  private getChartOfAccountUrl = environment.rootPath2 + "ChartOfAccount";
  private taxProdPostingGroupUrl = environment.rootPath2 + "inventory/procTAXProdPostingGroup";
  private taxBusPostingGroupUrl = environment.rootPath2 + "inventory/procTAXBusPostingGroup";


  ChartOfAccount;

  constructor(private http: HttpClient) {}

  getTaxProdPostingGroups() {
    return this.http.get(this.taxProdPostingGroupUrl);
  }

  getTaxBusPostingGroups() {
    return this.http.get(this.taxBusPostingGroupUrl);
  }

  getTaxPostingSetupList() {
    return this.http.get(this.getTaxPostingSetupListUrl);
  }

  saveNewTaxPosting(TaxPostingGroup) {
    return this.http.post(this.getTaxPostingSetupListUrl, TaxPostingGroup);
  }

  updateTaxPosting(TaxPostingGroup) {
    return this.http.put(this.getTaxPostingSetupListUrl, TaxPostingGroup);
  }

  deleteTaxPosting(TaxPostingGroup) {
    return this.http.delete(
      this.getTaxPostingSetupListUrl +
        "/" +
        TaxPostingGroup.taX_BusPosting_Group +
        "/" +
        TaxPostingGroup.taX_Prod_Psting_Group
    );
  }

  getChartOfAccount() {
    return this.http.get(this.getChartOfAccountUrl);
  }
}
