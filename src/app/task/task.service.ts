import { Injectable } from '@angular/core';
import {Mytask} from './task'
import {HttpClient, HttpErrorResponse} from '@angular/common/http'
import {Observable, from} from 'rxjs';
import { map,catchError, tap} from 'rxjs/operators'
import {environment} from '../../environments/environment';


@Injectable({ 
  
  providedIn: 'root'
})
export class TaskService {
  
task : Mytask[]

  private MytasksUrl = environment.rootPath + 'BPEL/GetlistofTodo';  // URL to web api
  private formPath = environment.formPath; // URL to form code
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
 
   getMytasks(orgId): Observable<Mytask[]>
  {
    return this.http.get<Mytask[]>(this.MytasksUrl + '?username=' + environment.username +
    '&orgid='+orgId+'&lanid='+environment.Lang+'&userroll' +
    '=00000000-0000-0000-0000-000000000000')
      .pipe(
        map((taskList : Mytask[])=>{
          return taskList
        })
      )
  }


  

  getFormData(formcode): Observable<FormData> {
    let jsonPath = '/xokaSWCMS/DB/';
    let cors = "https://cors-anywhere.herokuapp.com/"
    
    if(environment.phisicalPath)
    {
      jsonPath = environment.phisicalPath;
    }
    console.log('getFormData url: '+this.formPath + formcode + '.json');
    
    return this.http.get<any>( this.formPath + formcode + '.json');
  }

  // getFormData(formcode): Observable<FormData> {

  //   // return this.http.get(any)(
  //   //   this.formPath+formcode+'.json',
  //   //   headers: {
  //   //             'Content-Type': 'application/json',
  //   //           },)
  //   // return from(
  //   //   fetch(
  //   //     this.formPath + formcode + '.json', // the url you are trying to access
  //   //     {
  //   //       headers: {
  //   //         'Content-Type': 'application/json',
  //   //       },
  //   //       method: 'GET', // GET, POST, PUT, DELETE
  //   //       mode: 'no-cors' // the most important option
  //   //     }
  //   //   ));
  // }


}
