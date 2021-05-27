import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class JobCreationService {

  private jobCreationURL = environment.rootApiPath + 'Job/procBusinessOppoForjobCreation'
  private getSectorListURL = environment.rootPath + 'BPEL/GetLookUp?DropGownName=Sector'
  private getSubSectorListURL = environment.rootPath + 'BPEL/GetLookUp?DropGownName=Sub_Sector'

  constructor(
    private http: HttpClient
  ) { }

  getJobList(){
    return this.http.get(this.jobCreationURL)
  }

  addJob(data){
    return this.http.post(this.jobCreationURL,data)
  }

  updateJob(data){
    return this.http.put(this.jobCreationURL,data)
  }

  deleteJob(data){
    
    return this.http.delete(this.jobCreationURL+'/'+data.buS_OPP_ID)
  }

  getSectorList(){
    return this.http.get(this.getSectorListURL)
  }

  getSubSectorList(){
    return this.http.get(this.getSubSectorListURL)
  }

  
}
