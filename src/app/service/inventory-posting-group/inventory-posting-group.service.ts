import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class InventoryPostingGroupService {
  public inventoryPostingGroupUrl =
    environment.rootApiPath + "finance/InventoryPostingGroup";

  constructor(private http: HttpClient) {}

  getInventoryPostingGroups() {
    return this.http.get(this.inventoryPostingGroupUrl);
  }

  addInventoryPostingGroups(inventoryPostingGroup) {
    return this.http.post(this.inventoryPostingGroupUrl, inventoryPostingGroup);
  }

  updateInventoryPostingGroups(inventoryPostingGroup) {
    return this.http.put(this.inventoryPostingGroupUrl, inventoryPostingGroup);
  }

  deleteInventoryPostingGroups(inventoryPostingGroup) {
    return this.http.delete(
      this.inventoryPostingGroupUrl + "/" + inventoryPostingGroup.code
    );
  }
}
