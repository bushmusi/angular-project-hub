import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class InsuranceTypeService {
  public insuranceTypeUrl = environment.rootApiPath + "finance/cInsuranceType";

  constructor(private http: HttpClient) {}

  getInsuranceType() {
    return this.http.get(this.insuranceTypeUrl);
  }

  addInsuranceType(genProductPostingGroup) {
    return this.http.post(this.insuranceTypeUrl, genProductPostingGroup);
  }

  updateInsuranceType(genProductPostingGroup) {
    return this.http.put(this.insuranceTypeUrl, genProductPostingGroup);
  }

  deleteInsuranceType(genProductPostingGroup) {
    return this.http.delete(
      this.insuranceTypeUrl + "/" + genProductPostingGroup.name
    );
  }
}
