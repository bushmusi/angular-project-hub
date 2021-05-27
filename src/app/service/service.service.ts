import { Injectable } from '@angular/core';
import { BudgetType } from './budget'
import { BudgetDetail } from './budget'
import { Budgetsummrazed } from './budget'
import { Budget } from './budget'
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse, HttpRequest } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators'
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';




@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  private budgetTypeUrl = environment.rootApiPath + 'budget/BudgetType'
  private budgetDetailUrl = environment.rootApiPath + "budget/BudgetDetailByDIV"
  private budgetSummaryUrl = environment.rootApiPath + "budget/Summarized"
  private budgetUrl = environment.rootApiPath + "budget/Budget"
  private SaveDataURL = environment.rootPath + 'BPEL/SaveData';  // URL to web api
  private saveFileLookUP = environment.rootPath + 'BPEL/SaveDocumentMaster';  // URL to web api
  private GetDataURL = environment.rootPath + 'BPEL/GetData';  // URL to web api
  private GetLookUpURL = environment.rootPath + 'BPEL/GetLookUp'
  private License_ServiceURL = environment.rootPath + 'License_Service';  // URL to web api
  private getChartOfAccountURL = environment.rootApiPath + 'ChartOfAccount'; //List of account code
  private getListOfOrgURL = environment.rootApiPath + 'finance/procorganizations'; //List of org for budget type
  private getUnitListURL = environment.rootApiPath + 'finance/cUnit'
  private loadDeptListURL = environment.rootApiPath + 'finance/procdepartments'
  private UserWorkInfoURl = environment.rootApiPath + "view/ViewAspNetUsersWorkInfoDetail"; // URL to web api
  private nextTaskCompleteURL = environment.rootPath + "BPEL/nextTaskComplete"; // URL to web api
  private getTaskRuleURL = environment.rootPath + "BPEL/TaskRule"; // URL to web api
  private nextTaskAcceptOrRejectURl = environment.rootPath + "BPEL/nextTaskAcceptOrReject"; // URL to web api
  private getTodandAppNoURL = environment.rootPath + "BPEL/TodandAppNo"; // URL to web api
  private getRequerdURL = environment.rootPath + 'BPEL/getRequrementDocumentOfTasks';  // URL to web ap
  private getInitativeListURL = environment.rootApiPath + 'StrategicInnitiative'

  private data = new BehaviorSubject('');
  currentData = this.data.asObservable()





  constructor(private http: HttpClient) { }

  getInitativeList(){
    console.log("Service called from service: ", this.http.get(this.getInitativeListURL));
    
    return this.http.get(this.getInitativeListURL)
  }

  getStatustype(DropGownName){
    return this.http.get(this.GetLookUpURL+'?DropGownName='+DropGownName)
  }

  updateMessage(item: any) {
    this.data.next(item);
  }


  getUserWorkInfo() {
    return this.http.get(this.UserWorkInfoURl + "/" + environment.username);
  }



  Submit(AppCode, docID, todoID, ruleid) {
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

  getTaskRule(tasksId) {
    return this.http.post(
      this.getTaskRuleURL + "?" + "taskid=" + tasksId,
      null
    );
  }

  getPriveys(certefcatcode) {
    return this.http.get<any[]>(
      this.License_ServiceURL +
      "?" +
      "sortOrder=test&currentFilter=" +
      certefcatcode +
      "&searchString&pageIndex&pageSize"
    );
  }

  getTodandAppNo(AppNo) {
    return this.http.get<any[]>(
      this.getTodandAppNoURL + "?" + "ApplicationNo=" + AppNo
    );
  }

  saveFile(DocData, FileType, ApplicationNo, RequrementID, TaskType, Requrement) {
    // console.log('File', File);
    /*return this.http.post(this.saveFileLookUP + '?' + 'TaskType=' + TaskType + '&ApplicationNo=' + ApplicationNo + '&DocData=' + File + '&uid=00000000-0000-0000-0000-000000000000' + '&FileType=' + Type + '&RequrementID=' + ReqId + '&Requrement=' + Requrement, null);*/


    return this.http.post(this.saveFileLookUP, {
      TaskType,
      ApplicationNo,
      DocData,
      uid: '00000000-0000-0000-0000-000000000000',
      FileType,
      RequrementID,
      Requrement
    });
  }


  // Budget type CRUD

  loadBudgetType(): Observable<BudgetType[]> {

    return this.http.get(this.budgetTypeUrl)
      .pipe(
        map((budgetT: BudgetType[]) => {
          return budgetT;
        })
      )

  }



  //below are bush codes


  // Below are for budget type
  getListOfOrg() {

    return this.http.get(this.getListOfOrgURL);

  }

  getUnitList(){
    return this.http.get(this.getUnitListURL)
  }


  getChartOfAccount() {

    console.log("get serv is called: ", this.http.get(this.getChartOfAccountURL));

    return this.http.get(this.getChartOfAccountURL)

  }

  createBudgetType(budgetTypeForm) {

    console.log("Service createBudgetType sent form:", budgetTypeForm);

    console.log("Service createBudgetType URL:", this.budgetTypeUrl, budgetTypeForm);

    return this.http.post(this.budgetTypeUrl, budgetTypeForm);

  }

  updateBudgetType(budgetTypeForm) {

    console.log('Update is called on serv: ', budgetTypeForm)

    return this.http.put(this.budgetTypeUrl, budgetTypeForm);

  }

  deleteBudgetType(budgetTypeCode) {

    console.log('Delete service called with code: A' + budgetTypeCode.code + 'Z')

    return this.http.delete(this.budgetTypeUrl + "/" + budgetTypeCode.code);

  }

  // Above for budget-type

  // Below are for #budget-summary

  saveBudgetData(ApplicationCode, serviceId, taskid, orgid, UserName, json, docid, todoID) {
    console.log("saveBudgetData called from service");

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

  getAll(AppNo) {
    console.log('getAll appNo:', AppNo, " from service")
    return (this.http.get<any[]>(this.License_ServiceURL + '?' + 'sortOrder=test&currentFilter=' +
      AppNo + '&searchString&pageIndex&pageSize'));
  }

  registerBudget(budgetData) {

    console.log('register called data:', budgetData + " from service")
    return this.http.post(this.budgetUrl, budgetData)

  }

  registerBudgetSummary(budgetSummaryData) {

    console.log('Sent data', budgetSummaryData)

    return this.http.post(this.budgetSummaryUrl, budgetSummaryData)
  }

  updateBudgetSummary(budgetSummaryData) {

    return this.http.put(this.budgetSummaryUrl, budgetSummaryData)
  }

  deleteBudgetsummary(data) {
    return this.http.delete(this.budgetSummaryUrl + '/' + data.budget_Summarized_ID + '/' + data.budget_ID + '/' + data.budget_Type + '/' + data.organization_code)
  }

  updateBudgetData(budgetData) {

    console.log("Comming data to service data: ", budgetData);
    return this.http.put(this.budgetUrl, budgetData)

  }

  deleteBudget(id) {

    return this.http.delete(this.budgetUrl + '/' + id)

  }

  // Above are for #budget-summary

  // below budget-detail
  registerBudgetDetail(data) {

    return this.http.post(this.budgetDetailUrl, data)

  }

  updateBudgetDetail(data){
    
    return this.http.put(this.budgetDetailUrl,data)
    
  }

  deleteBudgetDetail(data){
    console.log("Service called: ",data.budget_DetailID);
    
    return this.http.delete(this.budgetDetailUrl+'/'+data.budget_DetailID)
  }

  
  // above budget-detail

  // End of bush code




  updateBugetType(budgettype: BudgetType): Observable<BudgetType> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // const url = `${this.budgetTypeUrl}/${budgettype.code}`;
    const url = `${this.budgetTypeUrl}`;

    return this.http.put(url, budgettype)
      .pipe(
        map((res: Response) => {
          //  console.log('update buget type status' + res.status)
          return budgettype
        })

      )

  }

  deleteBugetType(code: string): Observable<{}> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.budgetTypeUrl}/${code}`

    return this.http.delete<BudgetType>(url)

      .pipe(
        tap(data => console.log("delete proudct :" + code))

      )

  }




  // Budget Detail CRUD

  loadBudgetDetail(): Observable<BudgetDetail[]> {

    return this.http.get(this.budgetDetailUrl)
      .pipe(
        map((budgetD: BudgetDetail[]) => {
          return budgetD;
        })
      )

  }

  loadDeptList(){
    return this.http.get(this.loadDeptListURL)
  }





  insertBugetDetail(budgetdetail: BudgetDetail): Observable<BudgetDetail> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.budgetDetailUrl, budgetdetail, { headers: headers })
      .pipe(
        map((res: Response) => {
          return budgetdetail
        })

      )

  }





  deleteBugetDetail(budget_DetailID: string): Observable<{}> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.budgetDetailUrl}/${budget_DetailID}`

    return this.http.delete<BudgetDetail>(url)

      .pipe(
        tap(data => console.log("delete proudct :" + budget_DetailID))

      )

  }



  updateBugetDetail(budgetdetail: BudgetDetail): Observable<BudgetDetail> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // const url = `${this.budgetTypeUrl}/${budgettype.code}`;
    const url = `${this.budgetDetailUrl}`;

    return this.http.put(url, budgetdetail)
      .pipe(
        map((res: Response) => {
          //  console.log('update buget type status' + res.status)
          return budgetdetail
        })

      )

  }

  // Budget summary CRUD

  loadBudgetSummary(): Observable<Budgetsummrazed[]> {

    return this.http.get(this.budgetSummaryUrl)
      .pipe(
        map((budgetS: Budgetsummrazed[]) => {
          return budgetS;
        })
      )

  }




  insertBugetSummary(budgetsummary: Budgetsummrazed): Observable<Budgetsummrazed> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.budgetSummaryUrl, budgetsummary, { headers: headers })
      .pipe(
        map((res: Response) => {
          return budgetsummary
        })

      )

  }



  updateBugetSummary(budgetsummary: Budgetsummrazed): Observable<Budgetsummrazed> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // const url = `${this.budgetTypeUrl}/${budgettype.code}`;
    const url = `${this.budgetSummaryUrl}`;

    return this.http.put(url, budgetsummary)
      .pipe(
        map((res: Response) => {
          //  console.log('update buget type status' + res.status)
          return budgetsummary
        })

      )

  }


  //Budget CRUD

  loadBudget(): Observable<Budget[]> {

    return this.http.get(this.budgetUrl)
      .pipe(
        map((budget1: Budget[]) => {
          return budget1;
        })
      )

  }










  createBudget(budgett: Budget): Observable<Budget> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.budgetUrl, budgett, { headers: headers })
      .pipe(
        map((res: Response) => {
          return budgett
        })

      )

  }



  updateBuget(budgets: Budget): Observable<Budget> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // const url = `${this.budgetTypeUrl}/${budgettype.code}`;
    const url = `${this.budgetUrl}`;

    return this.http.put(url, budgets)
      .pipe(
        map((res: Response) => {
          //  console.log('update buget type status' + res.status)
          return budgets
        })

      )

  }



  saveForm(ApplicationCode, serviceId, taskid, orgid, json, docid, todoID) {
    return this.http.post(this.SaveDataURL + '?ApplicationCode=' + ApplicationCode + '&serviceId=' +
      serviceId + '&taskid=' + taskid + '&orgid=' + orgid + '&UserName=' + environment.username + '&json=' + json + '&docid=' +
      docid + '&todoID=' +
      todoID, null);
  }

  getRequerdDocs(taskID){
    return this.http.get(this.getRequerdURL + '?TaskID=' + taskID);
  }


  GetForm(docid) {
    console.log("form Data service :"+this.GetDataURL + '?docid=' + docid);
    
    return this.http.get(this.GetDataURL + '?docid=' + docid);
  }




}
