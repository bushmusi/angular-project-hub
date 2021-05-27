import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TitleDeedRegistrationService {
  private DeedURL = environment.rootPath + 'Deed_Registration';  // URL to web api

  constructor(private http: HttpClient) {
  }


  getAll(propertyid) {
    return (this.http.get<any[]>(this.DeedURL + '?' + 'sortOrder=test&currentFilter=' + propertyid + '&searchString&pageIndex&pageSize'));
  }

  save(data) {
    return (this.http.put<any[]>(this.DeedURL, data));
  }

  Add(data) {
    return (this.http.post<any[]>(this.DeedURL, data));
  }
}
