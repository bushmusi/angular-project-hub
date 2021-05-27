import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VendorPostingGroupService {
  public vendorPostingGroupUrl =
    environment.rootApiPath + "finance/VendorPostingGroup";

  public interestAccountUrl = environment.rootApiPath + "ChartOfAccount";

  constructor(private http: HttpClient) {}

  getInterestAccounts() {
    return this.http.get(this.interestAccountUrl);
  }

  getVendorPostingGroups() {
    return this.http.get(this.vendorPostingGroupUrl);
  }

  addVendorPostingGroups(vendorPostingGroup) {
    return this.http.post(this.vendorPostingGroupUrl, vendorPostingGroup);
  }

  updateVendorPostingGroups(vendorPostingGroup) {
    return this.http.put(this.vendorPostingGroupUrl, vendorPostingGroup);
  }

  deleteVendorPostingGroups(vendorPostingGroup) {
    return this.http.delete(
      this.vendorPostingGroupUrl + "/" + vendorPostingGroup.code
    );
  }
}
