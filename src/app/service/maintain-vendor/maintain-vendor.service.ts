import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MaintainVendorService {
  public rootApiPath = environment.rootApiPath;

  constructor(private http: HttpClient) { }

  getVendors() {
    return this.http.get(
      this.rootApiPath + "finance/CVendor"
    );
  }

  getTaxTypes() {
    return this.http.get(this.rootApiPath + "finance/CTax");
  }

  getBusPostingGroups() {
    return this.http.get(this.rootApiPath + "finance/GenBusPostingGroups");
  }

  getVendorPostingGroup() {
    return this.http.get(
      this.rootApiPath + "finance/VendorPostingGroup"
    );
  }
  
  getBusinessPostingGroup() {
    return this.http.get(
      this.rootApiPath + "fixedAsset/procGenBusPostingGroups"
    );
  }
  
  addVendor(vendor) {
    return this.http.post(
      this.rootApiPath + "finance/CVendor",
      vendor
    );
  }
  
  updateVendor(vendor) {
    console.log(vendor);
    return this.http.put(
      this.rootApiPath + "finance/CVendor",
      vendor
    );
  }
  
  deleteVendor(vendor) {
    return this.http.delete(
      this.rootApiPath + "finance/CVendor/" + vendor,
    );
  }
}
