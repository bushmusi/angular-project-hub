import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralProductPostingGroupService {

  public productionTaxUrl =
    environment.rootApiPath + "finance/TAXProdPostingGroup";

  public genProductPostingGroupUrl =
    environment.rootApiPath + "finance/GenProductPostingGroup";

  constructor(private http: HttpClient) {}

  getProductionTaxes() {
    return this.http.get(this.productionTaxUrl);
  }
  getGenProductPostingGroups() {
    return this.http.get(this.genProductPostingGroupUrl);
  }

  addGenProductPostingGroups(genProductPostingGroup) {
    return this.http.post(this.genProductPostingGroupUrl, genProductPostingGroup);
  }

  updateGenProductPostingGroups(genProductPostingGroup) {
    return this.http.put(this.genProductPostingGroupUrl, genProductPostingGroup);
  }

  deleteGenProductPostingGroups(genProductPostingGroup) {
    return this.http.delete(
      this.genProductPostingGroupUrl + "/" + genProductPostingGroup.code
    );
  }
}
