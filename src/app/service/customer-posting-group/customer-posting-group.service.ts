import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CustomerPostingGroupService {
  public customerPostingGroupUrl =
    environment.rootApiPath + "finance/CustomerPostingGroup";

  public interestAccountUrl = environment.rootApiPath + "ChartOfAccount";

  constructor(private http: HttpClient) {}

  getInterestAccounts() {
    return this.http.get(this.interestAccountUrl);
  }

  getCustomerPostingGroups() {
    return this.http.get(this.customerPostingGroupUrl);
  }

  addCustomerPostingGroups(customerPostingGroup) {
    return this.http.post(this.customerPostingGroupUrl, customerPostingGroup);
  }

  updateCustomerPostingGroups(customerPostingGroup) {
    return this.http.put(this.customerPostingGroupUrl, customerPostingGroup);
  }

  deleteCustomerPostingGroups(customerPostingGroup) {
    return this.http.delete(
      this.customerPostingGroupUrl + "/" + customerPostingGroup.code
    );
  }
}
