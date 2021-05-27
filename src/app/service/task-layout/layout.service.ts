import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  constructor(private http: HttpClient) {}

  getFormData(formcode): Observable<FormData> {
    //return this.http.get<any>(environment.formPath + formcode + ".json");
    return this.http.get<any>("assets/xokaSWCMS/db/" + formcode + ".json");
  }
}
