import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class WithholdingService {
  public withholdingUrl =
    environment.rootApiPath + "finance/WithPostingGroup";

  constructor(private http: HttpClient) {}

  getWithholdings() {
    return this.http.get(this.withholdingUrl);
  }

  addWithholdings(withholding) {
    return this.http.post(this.withholdingUrl, withholding);
  }

  updateWithholdings(withholding) {
    return this.http.put(this.withholdingUrl, withholding);
  }

  deleteWithholdings(withholding) {
    return this.http.delete(
      this.withholdingUrl + "/" + withholding.code
    );
  }
}
