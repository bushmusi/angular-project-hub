import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class MaintainInventoryitemService {
  public rootApiPath = environment.rootApiPath;

  constructor(private http: HttpClient) {}

  getInventoryItems() {
    return this.http.get(this.rootApiPath + "inventory/InventoryItems");
  }

  getClasses() {
    return this.http.get(this.rootApiPath + "finance/cItemClass");
  }
  
  getItemTypes() {
    return this.http.get(this.rootApiPath + "inventory/ItemType");
  }

  getCostMethod() {
    return this.http.get(this.rootApiPath + "CostMethod");
  }

  getVendors() {
    return this.http.get(this.rootApiPath + "finance/CVendor");
  }
  
  getProductPostingGroup() {
    return this.http.get(this.rootApiPath + "finance/procGenProductPostingGroup");
  }
  
  getInventoryPostingGroup() {
    return this.http.get(this.rootApiPath + "finance/InventoryPostingGroup");
  }

  getChartOfAccount() {
    return this.http.get(this.rootApiPath + "ChartOfAccount");
  }

  getCustomers() {
    return this.http.get(this.rootApiPath + "finance/procCCustomer");
  }

  getVendorPostingGroup() {
    return this.http.get(this.rootApiPath + "finance/VendorPostingGroup");
  }
   
  addItem(inventory) {
    return this.http.post(
      "http://197.156.93.110/xoka.ERP.API/api/inventory/InventoryItems",
      inventory
    );
  }
  
  updateItem(inventory) {
    console.log(inventory);
    return this.http.put(
      "http://197.156.93.110/xoka.ERP.API/api/inventory/InventoryItems",
      inventory
    );
  }
  
  deleteItem(inventory) {
    console.log(inventory);
    return this.http.delete(
      "http://197.156.93.110/xoka.ERP.API/api/inventory/InventoryItems/" + inventory.inv_ID,
    );
  }
}
