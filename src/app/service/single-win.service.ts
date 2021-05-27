import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class SingleWinService {
  public singleWinUrl = environment.rootApiPath + "dbo/procLicenceServiceForSingleWin";

  constructor(public http: HttpClient) {}

  registerSingleWin(singleWin) {
    return this.http.post(this.singleWinUrl, singleWin);
  }

  updateSingleWin(singleWin) {
    console.log(singleWin);
    return this.http.put(this.singleWinUrl, singleWin);
  }
}
