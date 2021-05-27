import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class LeaseToService {
  public leaseTotUrl = environment.rootApiPath + "Vehicle/VehicleLeaseTo";
  public customersUrl = environment.rootApiPath + "finance/procCCustomer";
  public fleetContractsUrl =
    environment.rootApiPath + "finance/procFleetContract";

  constructor(public http: HttpClient) {}

  getLeasTo() {
    return this.http.get(this.leaseTotUrl);
  }

  addLeasTo(data) {
    return this.http.post(this.leaseTotUrl, data);
  }

  updateLeasTo(data) {
    return this.http.put(this.leaseTotUrl, data);
  }

  deleteLeasTo(data) {
    return this.http.delete(this.leaseTotUrl + "/" + data.vehicle_LeaseToID);
  }

  getCustomers() {
    return this.http.get(this.customersUrl);
  }

  getFleetContracts() {
    return this.http.get(this.fleetContractsUrl);
  }
}
