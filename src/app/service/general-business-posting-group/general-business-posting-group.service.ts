import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GeneralBusinessPostingGroupService {
  public productionTaxUrl =
    environment.rootApiPath + "finance/TAXProdPostingGroup";

  public genBusinessPostingGroupUrl =
    environment.rootApiPath + "finance/GenBusPostingGroups";

  constructor(private http: HttpClient) {}

  getBusinessionTaxes() {
    return this.http.get(this.productionTaxUrl);
  }
  getGenBusinessPostingGroups() {
    return this.http.get(this.genBusinessPostingGroupUrl);
  }

  addGenBusinessPostingGroups(genBusinessPostingGroup) {
    return this.http.post(
      this.genBusinessPostingGroupUrl,
      genBusinessPostingGroup
    );
  }

  updateGenBusinessPostingGroups(genBusinessPostingGroup) {
    return this.http.put(
      this.genBusinessPostingGroupUrl,
      genBusinessPostingGroup
    );
  }

  deleteGenBusinessPostingGroups(genBusinessPostingGroup) {
    return this.http.delete(
      this.genBusinessPostingGroupUrl + "/" + genBusinessPostingGroup.code
    );
  }
}
