import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormDisplayService {

  private FormsUrl = environment.formPath;
  
  constructor(private http: HttpClient) { }
  
  getFormData(formcode): Observable<FormData> {
    return this.http.get<any>(this.FormsUrl + formcode+ '.json');
  }
}
