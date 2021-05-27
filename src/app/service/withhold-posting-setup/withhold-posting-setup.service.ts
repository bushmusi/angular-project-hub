import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class WithHoldPostingSetupService {
  private getWithHoldPostingSetupListUrl =
    environment.rootPath2 + "finance/WHTPostingSetup";
  private getChartOfAccountUrl = environment.rootPath2 + "ChartOfAccount";
  private busPostingGroupUrl = environment.rootPath2 + "finance/GenBusPostingGroups";
  private productPostingGroupUrl = environment.rootPath2 + "finance/GenProductPostingGroup";

  ChartOfAccount;

  constructor(private http: HttpClient) {}

  getBusPostingGroups() {
    return this.http.get(this.busPostingGroupUrl);
  }

  getProductPostingGroups() {
    return this.http.get(this.productPostingGroupUrl);
  }

  getWithHoldPostingSetupList() {
    return this.http.get(this.getWithHoldPostingSetupListUrl);
  }

  saveNewWithHoldPosting(WithHoldPostingGroup) {
    return this.http.post(
      this.getWithHoldPostingSetupListUrl,
      WithHoldPostingGroup
    );
  }

  updateWithHoldPosting(WithHoldPostingGroup) {
    return this.http.put(
      this.getWithHoldPostingSetupListUrl,
      WithHoldPostingGroup
    );
  }

  deleteWithHoldPosting(WithHoldPostingGroup) {
    return this.http.delete(
      this.getWithHoldPostingSetupListUrl +
        "/" +
        WithHoldPostingGroup.WithHold_BusPosting_Group +
        "/" +
        WithHoldPostingGroup.WithHold_Prod_Psting_Group
    );
  }

  getChartOfAccount() {
    return this.http.get(this.getChartOfAccountUrl);
  }
}
