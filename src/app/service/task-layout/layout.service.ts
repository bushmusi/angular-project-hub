import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  private formPath = environment.formPath; // URL to form code

  constructor(private http: HttpClient) {}

  getFormData(formcode): Observable<FormData> {
    console.log("form_api : ", this.formPath);
    
    return this.http.get<any>(this.formPath + formcode + ".json");
  }
}
