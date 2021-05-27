import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MaintainCustomerService {
  public rootApiPath = environment.rootApiPath;

  constructor(public http: HttpClient) {}

  getCustomers() {
    return this.http.get(this.rootApiPath + "finance/procCCustomer");
  }

  getTaxTypes() {
    return this.http.get(this.rootApiPath + "finance/CTax");
  }

  getCustomerPostingGroups() {
    return this.http.get(this.rootApiPath + "finance/CustomerPostingGroup");
  }

  getBusPostingGroups() {
    return this.http.get(this.rootApiPath + "finance/GenBusPostingGroups");
  }

  addCustomer(customer) {
    return this.http.post(this.rootApiPath + "finance/procCCustomer", customer);
  }

  updateCustomer(customer) {
    return this.http.put(this.rootApiPath + "finance/procCCustomer", customer);
  }

  deleteCustomer(customer) {
    return this.http.delete(
      this.rootApiPath + "finance/procCCustomer/" + customer.customer_ID
    );
  }
}
