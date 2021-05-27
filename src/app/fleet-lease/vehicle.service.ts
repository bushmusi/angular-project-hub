import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class VehicleService {
  public vehicleUrl = environment.rootApiPath + "Vehicle/Vehicle";

  constructor(public http: HttpClient) {}

  getVehicles() {
    return this.http.get(this.vehicleUrl);
  }
}
