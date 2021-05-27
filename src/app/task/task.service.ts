import { Injectable } from '@angular/core';
import {Mytask} from './task'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import { map,catchError, tap} from 'rxjs/operators'
import {environment} from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  task : Mytask[]

  private MytasksUrl = environment.rootPath + 'BPEL/GetlistofTodo/';  // URL to web api
  private GetDataURL = environment.rootPath + "BPEL/GetData"; // URL to web api
  private ViewAspNetUsersWorkInfoDetail = environment.rootApiPath + 'view/ViewAspNetUsersWorkInfoDetail';  // URL to web api


  constructor(private http: HttpClient) { }

  removeSlash(string){
    if(string == null) return;
    return string.replace(/\//g, "%2F");
  }

  getViewAspNetUsersWorkInfoDetail(user_id){
    user_id = this.removeSlash(user_id);
    return this.http.get<any>(this.ViewAspNetUsersWorkInfoDetail + '/' + user_id);
  }

  getMytasks(orgid): Observable<Mytask[]>
  {
    return this.http.get<Mytask[]>(this.MytasksUrl + '?username=' + 'DOC_USER' +
      '&orgid=' + orgid + '&lanid=' + environment.Lang + '&userroll' +
      '=00000000-0000-0000-0000-000000000000')
      .pipe(
        map((taskList : Mytask[])=>{
          return taskList
        })
      )
  }

  // getFormData(docid) {
  //   console.log("Get data url: ",this.GetDataURL+'?docid='+docid);
    
  //   return this.http.get(this.GetDataURL + "?docid=" + docid);
  // }
  

  getFormData(formcode): Observable<FormData> {
    let jsonPath = '/xokaSWCMS/DB/';
    
    
    if(environment.phisicalPath)
    {
      jsonPath = environment.phisicalPath;
    }
    console.log('formcode from task ser:',jsonPath+ formcode + '.json');
    return this.http.get<any>( jsonPath + formcode + '.json');
  }

}
