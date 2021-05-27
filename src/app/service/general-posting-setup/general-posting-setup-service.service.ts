import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class GenaeralPostingSetupService {
  private getGeneralPostingSetupListUrl =
    environment.rootPath2 + "finance/GeneralPostingSetups";
    
  private businessPostingGroupUrl =
  environment.rootPath2 + "finance/GenBusPostingGroups";
  
  private productPostingGroupUrl =
  environment.rootPath2 + "finance/GenProductPostingGroup";
  private getChartOfAccountUrl = environment.rootPath2 + "ChartOfAccount";

  ChartOfAccount;

  constructor(private http: HttpClient) {}

  getGeneralPostingSetupList() {
    return this.http.get(this.getGeneralPostingSetupListUrl);
  }

  getBusinessPostings() {
    return this.http.get(this.businessPostingGroupUrl);
  }

  getProductPostings() {
    return this.http.get(this.productPostingGroupUrl);
  }

  saveNewGeneralPosting(GeneralPostingGroup) {
    return this.http.post(
      this.getGeneralPostingSetupListUrl,
      GeneralPostingGroup
    );
  }

  updateGeneralPosting(GeneralPostingGroup) {
    return this.http.put(
      this.getGeneralPostingSetupListUrl,
      GeneralPostingGroup
    );
  }

  deleteGeneralPosting(GeneralPostingGroup) {
    return this.http.delete(
      this.getGeneralPostingSetupListUrl +
        "/" +
        GeneralPostingGroup.gen_Bus_Posting_Group +
        "/" +
        GeneralPostingGroup.gen_Pord_Posting_Group
    );
  }

  getChartOfAccount() {
    return this.http.get(this.getChartOfAccountUrl);
  }
}
