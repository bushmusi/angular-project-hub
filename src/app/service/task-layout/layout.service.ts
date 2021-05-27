import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  constructor(private http: HttpClient) {
  }

  getFormData(formcode): Observable<FormData> {
    return this.http.get<any>('/xokaSWCMS/DB/' + formcode + '.json');
  }


}

