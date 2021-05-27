import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LeaseFromService {
  public leaseFromUrl = environment.rootApiPath + "Vehicle/VehicleLease";
  public vendorsUrl = environment.rootApiPath + "finance/CVendor";
  public fleetContractsUrl = environment.rootApiPath + "finance/procFleetContract";

  constructor(public http: HttpClient) {}

  getLeasFrom() {
    return this.http.get(this.leaseFromUrl);
  }

  addLeasFrom(data) {
    return this.http.post(this.leaseFromUrl, data);
  }

  updateLeasFrom(data) {
    return this.http.put(this.leaseFromUrl, data);
  }

  deleteLeasFrom(data) {
    return this.http.delete(this.leaseFromUrl + "/" + data.vehicle_LeaseID);
  }

  getVendors() {
    return this.http.get(this.vendorsUrl);
  }

  getFleetContracts() {
    return this.http.get(this.fleetContractsUrl);
  }
}
