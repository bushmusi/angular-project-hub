import { Injectable } from '@angular/core';
import { Archive } from './archive'
import { ArchiveType } from './archive'
import { SendTo } from './archive'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private saveFileLookUP = environment.rootPath + 'BPEL/SaveDocumentMaster';  // URL to web api
  private dlTransactionURL = environment.rootApiPath + "document/Document_LetterTransaction"; //This where to push at final
  private procArchiveURL = environment.rootApiPath + "document/procArchive"; //This where to push at final
  private License_ServiceURL = environment.rootPath + "License_Service"; // URL to web api
  private SaveDataURL = environment.rootPath + "BPEL/SaveData"; // URL to web api
  private nextTaskCompleteURL = environment.rootPath + "BPEL/nextTaskComplete"; // URL to web api
  private nextTaskAcceptOrRejectURl = environment.rootPath + "BPEL/nextTaskAcceptOrReject"; // URL to web api
  private getTaskRuleURL = environment.rootPath + "BPEL/TaskRule"; // URL to web api
  private getProcArchiveTypeURL = environment.rootApiPath + "document/procArchiveType";// will fetch archive type
  private getProArchiveListURL = environment.rootApiPath + "document/procArchive"; //Will used for archive
  private GetDataURL = environment.rootPath + "BPEL/GetData"; // URL to web api
  private getTodandAppNoURL = environment.rootPath + "BPEL/TodandAppNo"; // URL to web api
  private organizationURL = environment.rootApiPath + "finance/procorganizations"
  private UserWorkInfoURl = environment.rootApiPath + "view/ViewAspNetUsersWorkInfoDetail"; // URL to web api
  private deptListURL = environment.rootApiPath + 'finance/procdepartments'
  private orgStrURL = environment.rootApiPath + 'HRA/OrganizationalStructure'
  private orgStrURLDiv = environment.rootApiPath + 'HRA/OrganizationalStructure/DIV'
  private sendToURL = environment.rootApiPath + 'document/procSendTO'
  private archiveTypeUrl = environment.rootApiPath + 'document/procArchiveType'
  private getRequerdURL = environment.rootPath + 'BPEL/getRequrementDocumentOfTasks';  // URL to web api
  public currentData: any;
  public data: any;
  public temp: any; 
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //upload file

  getRequerdDocs(TaskID) {
    console.log("From service requerDocs called:",this.getRequerdURL + '?TaskID=' + TaskID);
    
    return this.http.get(this.getRequerdURL + '?TaskID=' + TaskID);
  }

  // End of file


  //Save Data of letter transaction
  saveForm(ApplicationCode, serviceId, taskid, orgid, UserName, json, docid, todoID) {
    orgid = "1e60f3a1-7017-47bf-95f4-f0e47c793c72";
    return this.http.post(
      this.SaveDataURL +
      "?ApplicationCode=" +
      ApplicationCode +
      "&serviceId=" +
      serviceId +
      "&taskid=" +
      taskid +
      "&orgid=" +
      orgid +
      "&UserName=" +
      environment.username +
      "&json=" +
      json +
      "&docid=" +
      docid +
      "&todoID=" +
      todoID,
      null
    );
  }


  // getAll by to get app no for letter Transaction
  getAll(AppNo) {

    return this.http.get<any[]>(
      this.License_ServiceURL +
      "?" +
      "sortOrder=test&currentFilter=" +
      AppNo +
      "&searchString&pageIndex&pageSize"
    );
  }

  //Action footer
  getTaskRule(tasksId) {
    return this.http.post(
      this.getTaskRuleURL + "?" + "taskid=" + tasksId,
      null
    );
  }

  //Doc archive submit action
  public SubmitDocArchive(AppCode, docID, todoID, ruleid) {
    return this.http.post(
      this.nextTaskCompleteURL +
      "?ApplicationNo=" +
      AppCode +
      "&docid=" +
      docID +
      "&todoid=" +
      todoID +
      "&userName=" +
      environment.username +
      "&status=C&Taskruleid=" +
      ruleid +
      "&ispending=false",
      null
    );
  }

  SubmitAR(AppCode, docID, todoID, ruleid) {
    return this.http.post(
      this.nextTaskAcceptOrRejectURl +
      "?ApplicationNo=" +
      AppCode +
      "&docid=" +
      docID +
      "&eid=00000000-0000-0000-0000-000000000000&isPending=false&todoid=" +
      todoID +
      "&userName=" +
      environment.username +
      "&status=C&taskruleid=" +
      ruleid,
      null
    );
  }





  private ArchiveInfo: Archive[] = [



    {
      id: 0,
      folderNo: null,
      name: null,
      archiveType: null,
      selfRow: null,
      shelfColumn: null,
      letterId: null


    },
    {
      id: 0,
      folderNo: null,
      name: null,
      archiveType: null,
      selfRow: null,
      shelfColumn: null,
      letterId: null


    },
    {
      id: 1,
      folderNo: null,
      name: null,
      archiveType: null,
      selfRow: null,
      shelfColumn: null,
      letterId: null

    },
    {
      id: 2,
      folderNo: null,
      name: null,
      archiveType: null,
      selfRow: null,
      shelfColumn: null,
      letterId: null


    }
  ]

  private ArchiveTypeInfo: ArchiveType[] = [
    {

      id: null,
      nameType: null,
      description: null,
      room: null,
      site: null,
      blockFloor: null,
      shelfNo: null
    },
    {

      id: 1,
      nameType: null,
      description: null,
      room: null,
      site: null,
      blockFloor: null,
      shelfNo: null
    },

    {

      id: 1,
      nameType: null,
      description: null,
      room: null,
      site: null,
      blockFloor: null,
      shelfNo: null
    },

    {

      id: 1,
      nameType: null,
      description: null,
      room: null,
      site: null,
      blockFloor: null,
      shelfNo: null
    }



  ]
  constructor(private http: HttpClient) { }

  //Doc Lettr transn get service method
  getDLtransaction(currentData) {
    return this.http.get(this.dlTransactionURL + '/' + currentData);
  }
  // end

  registerDLTransaction(dlTransaction) {
    return this.http.post(this.dlTransactionURL, dlTransaction);
  }
  UpdateDLTransaction(dlTransaction) {
    console.log('The service has been called', dlTransaction);
    return this.http.put(this.dlTransactionURL, dlTransaction);
  }


  public getArchiveInfo(): Archive[] {
    return this.ArchiveInfo;

  }

  public getArchiveTypeInfo(): ArchiveType[] {
    return this.ArchiveTypeInfo;

  }

  public deleteLetterTrans(data) {
    return this.http.delete(this.dlTransactionURL + "/" + data.letter_ID);
  }

  saveFile(DocData, FileType, ApplicationNo, RequrementID, TaskType, Requrement,docid) {
    // console.log('File', File);
    // return this.http.post(this.saveFileLookUP + '?' + 'TaskType=' + TaskType + '&ApplicationNo=' + ApplicationNo + '&DocData=' + File + '&uid=00000000-0000-0000-0000-000000000000' + '&FileType=' + Type + '&RequrementID=' + ReqId + '&Requrement=' + Requrement, null);

    const temp = 'TaskType=' + TaskType + '&ApplicationNo=' + ApplicationNo +'&uid=00000000-0000-0000-0000-000000000000' + '&FileType=' + FileType + '&RequrementID=' + RequrementID + '&Requrement=' + Requrement
    console.log("current datas:",temp);
    
    return this.http.post(this.saveFileLookUP, {
      TaskType,
      ApplicationNo,
      DocData,
      uid: '00000000-0000-0000-0000-000000000000',
      FileType,
      RequrementID,
      Requrement,
      docid
    });
  }

  /* Below codes are for doc archive */

  //below codes are doc archive
  public saveDocumentArchive(data) {
    console.log('save doc archive service called', data);
    return this.http.post(this.procArchiveURL, data);
  }

  public updateDocumentArchive(data) {
    return this.http.put(this.procArchiveURL, data);
  }

  //Get proc archive type
  public getProcArchiveType() {
    return this.http.get(
      this.getProcArchiveTypeURL
    );
  }

  public getProArchiveList(letter_ID) {
    return this.http.get(this.getProArchiveListURL + "/" + letter_ID)
  }



  /* Above codes are for doc archive */


  // Below codes for action footer
  getPriveys(certefcatcode) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
      "?" +
      "sortOrder=test&currentFilter=" +
      certefcatcode +
      "&searchString&pageIndex&pageSize"
    );
  }

  GetForm(docid) {
    return this.http.get(this.GetDataURL + "?docId=" + docid);
  }

  getUserWorkInfo() {
    return this.http.get(this.UserWorkInfoURl + "/" + environment.username);
  }

  getTodandAppNo(AppNo) {
    return this.http.get<any[]>(
      this.getTodandAppNoURL + "?" + "ApplicationNo=" + AppNo
    );
  }

  getOrganizationList() {

    return this.http.get(this.organizationURL)
  }
  getDeptList() {
    return this.http.get(this.deptListURL)
  }
  fetchDeptListDepndant(){
    return this.http.get(this.deptListURL)
  }
  getStrRoleIdByDiv(div){
    return this.http.get(this.orgStrURLDiv+'/'+div)
  }
  getOrgStrList() {
    return this.http.get(this.orgStrURL)
  }
  
  sendToForm(data) {
    console.log("st-2 service");
    
    return this.http.post(this.sendToURL,data, { headers: this.headers })
    
  }

  sendToFormUpdate(data){
    return this.http.put(this.sendToURL,data, { headers: this.headers })
  }

  register(data) {

    
    return this.http.post(this.archiveTypeUrl, data)
  }
  louadArchiveType(){
    return this.http.get(this.archiveTypeUrl)
  }
  updateArchiveType(data){
    return this.http.put(this.archiveTypeUrl,data)
  }
  deleteArchiveType(id){
    return this.http.delete(this.archiveTypeUrl+'/'+id)
  }
  // Above codes for action footer
}

