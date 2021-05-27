import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import { ServiceService } from '../service.service';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private FormPath = environment.formPath;
  constructor(private http: HttpClient, private serviceService: ServiceService) {
  }

  getFormData(formcode): Observable<FormData> {
    return this.http.get<any>(this.FormPath + formcode + '.json');
  }

}
