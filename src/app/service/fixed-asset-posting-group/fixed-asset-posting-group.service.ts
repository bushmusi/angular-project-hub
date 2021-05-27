import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FixedAssetPostingGroupService {
  public productionTaxUrl =
    environment.rootApiPath + "finance/TAXProdPostingGroup";

  public fixedAssetPostingGroupUrl =
    environment.rootApiPath + "finance/FixedAssetsPostingGroups";
  public interestAccountUrl = environment.rootApiPath + "ChartOfAccount";

  constructor(private http: HttpClient) {}

  getChartOfAccounts() {
    return this.http.get(this.interestAccountUrl);
  }

  getProductionTaxes() {
    return this.http.get(this.productionTaxUrl);
  }
  getFixedAssetPostingGroups() {
    return this.http.get(this.fixedAssetPostingGroupUrl);
  }

  addFixedAssetPostingGroups(fixedAssetPostingGroup) {
    return this.http.post(
      this.fixedAssetPostingGroupUrl,
      fixedAssetPostingGroup
    );
  }

  updateFixedAssetPostingGroups(fixedAssetPostingGroup) {
    return this.http.put(
      this.fixedAssetPostingGroupUrl,
      fixedAssetPostingGroup
    );
  }

  deleteFixedAssetPostingGroups(fixedAssetPostingGroup) {
    return this.http.delete(
      this.fixedAssetPostingGroupUrl + "/" + fixedAssetPostingGroup.code
    );
  }
}
