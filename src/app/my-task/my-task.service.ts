import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyTaskService {

  private MytasksUrl = environment.rootPath + 'BPEL/GetlistofTodo';  // URL to web api
  private SupervisertasksUrl = environment.rootPath + 'BPEL/GetlistofTodo';  // URL to web api


  constructor(private http: HttpClient) {
  }

  getMytasks(orgid) {
    return this.http.get(this.MytasksUrl + '?username=' + environment.username +
      '&orgid=' + orgid + '&lanid=10D04E8B-3361-E111-95D5-00E04C05559B&userroll' +
      '=00000000-0000-0000-0000-000000000000');
  }

  getSupervisertasks(orgid) {
    return this.http.get(this.SupervisertasksUrl + '?username=' + environment.username +
      '&orgid=' + orgid + '&lanid=10D04E8B-3361-E111-95D5-00E04C05559B');
  }
}
