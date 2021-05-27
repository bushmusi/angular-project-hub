import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private PlotManagementUrl = environment.rootPath + 'Plot_Registration';  // URL to web api
  private PropertyListUrl = environment.rootPath + 'Property_Registration';  // URL to web api
  private CertificateVersionUrl = environment.rootPath + 'Certificate_Version';  // URL to web api
  private DeedUrl = environment.rootPath + 'Deed_Registration';  // URL to web api
  private License_ServiceURL = environment.rootPath + 'License_Service';  // URL to web api
  private saveFileLookUP = environment.rootPath + 'BPEL/SaveDocumentMaster';  // URL to web api


  private CustomerTypeLookUP = environment.rootPath + 'Customer_Type_Lookup';  // URL to web api
  private CustomerLookUP = environment.rootPath + 'Customer';  // URL to web api
  private SuspendedReasonLookUP = environment.rootPath + 'Suspension_Reason_Lookup';  // URL to web api
  private PropertyTypeLookUP = environment.rootPath + 'Property_Type_Lookup';  // URL to web api
  private PropertyStatusLookUP = environment.rootPath + 'Property_StatusLookup';  // URL to web api
  private ServiceDeliveryUnitLookUP = environment.rootPath + 'BPEL/AllOrg';
  private Deed_Transfer_Lookup = environment.rootPath + 'Deed_Transfer_Lookup/Get';
  private Lease_Type_Lookup = environment.rootPath + 'Lease_Type_Lookup/Get';
  private WoredaLookUP = environment.rootPath + 'Woreda_Lookup';  // URL to web api
  private PlotStutusLookUP = environment.rootPath + 'Plotl_Status_Lookup';  // URL to web api
  private PlotLandUseLookUP = environment.rootPath + 'Plot_Type_Of_Use_Lookup';  // URL to web api
  private saveFormDataURL = environment.rootPath + 'Savedata';  // URL to web api
  private getTaskRuleURL = environment.rootPath + 'BPEL/TaskRule';  // URL to web api
  private getTodandAppNoURL = environment.rootPath + 'BPEL/TodandAppNo';  // URL to web api
  private getRequerdURL = environment.rootPath + 'BPEL/getRequrementDocumentOfTasks';  // URL to web api
  private nextTaskCompleteURL = environment.rootPath + 'BPEL/nextTaskComplete';  // URL to web api
  private nextTaskAcceptOrRejectURl = environment.rootPath + 'BPEL/nextTaskAcceptOrReject';  // URL to web api
  private SaveDataURL = environment.rootPath + 'BPEL/SaveData';  // URL to web api
  private GetDataURL = environment.rootPath + 'BPEL/GetData';  // URL to web api

  private KeyPerformanceIndicators = environment.rootPath2 + 'KeyPerformanceIndicators';  // URL to web api
  private Perspectives = environment.rootPath2 + 'Perspectives';  // URL to web api

  private StrategicInnitiative = environment.rootPath2 + 'StrategicInnitiative';  // URL to web api
  private InnitiativePlanAssignment = environment.rootPath2 + 'InnitiativePlanAssignment';  // URL to web api

  private AnnualStrategyGoals = environment.rootPath2 + 'AnnualStrategyGoals';  // URL to web api
  private AnnualStrategicPlanAssignment = environment.rootPath2 + 'AnnualStrategicPlanAssignment';  // URL to web api
  private AnnualStrategyGoalsWithPerspectiveGoals = environment.rootPath2 + 'AnnualStrategyGoalsWithPerspectiveGoals';  // URL to web api

  private CompanyStrategy = environment.rootPath2 + 'CompanyStrategy';  // URL to web api
  private StrategicThemes = environment.rootPath2 + 'StrategicThemes';  // URL to web api

  private KPIGoalMappingDetail = environment.rootPath2 + 'KPIGoalMappingDetail';  // URL to web api
  private KPIGoalMapping = environment.rootPath2 + 'KPIGoalMapping';  // URL to web api
  private Departments = environment.rootPath2 + 'finance/procdepartments';  // URL to web api
  private ViewAspNetUsersWorkInfoDetail = environment.rootPath2 + 'view/ViewAspNetUsersWorkInfoDetail';  // URL to web api
  private ViewBSCInnitiativePlanAssigmentGrid = environment.rootPath2 + 'view/ViewBSCInnitiativePlanAssigmentGrid';  // URL to web api
  private AspnetUsers = environment.rootPath2 + 'dbo/procaspnetUsers';  // URL to web api
  private spnetRolesGetAllRoles = environment.rootPath2 + 'dbo/aspnetRolesGetAllRoles';  // URL to web api
  private BacDataCollectionTransaction = environment.rootPath2 + 'procBacDataCollectionTransaction';  // URL to web api
  private BSCValues = environment.rootPath2 + 'procBSCValues';  // URL to web api
  private cUnit = environment.rootPath2 + 'finance/cUnit';  // URL to web api
  private DocumentDetail = environment.rootPath2 + 'ProprtyData/proctblDocumentDetail';  // URL to web api
  private TypeOfInnitiative = environment.rootPath + 'BPEL/GetLookUp?DropGownName=Type_Of_Innitiative';  // URL to web api
  private ViewBSCAnualStrategicPlanAssignment = environment.rootPath2 + 'view/ViewBSCAnualStrategicPlanAssignment';  // URL to web api
  private OrganizationalStructure = environment.rootPath2 + 'HRA/OrganizationalStructure';  // URL to web api
  private WorkInfo = environment.rootPath2 + 'HRA/WorkInfo';  // URL to web api
  private CEmployee = environment.rootPath2 + 'HRA/CEmployee';  // URL to web api

  constructor(private http: HttpClient) {
  }

  getViewAspNetUsersWorkInfoDetail(User_ID) {
    User_ID = this.removeSlash(User_ID);
    return this.http.get<any>(this.ViewAspNetUsersWorkInfoDetail + '/' + User_ID);
  }

  getViewBSCInnitiativePlanAssigmentGrid() {
    return this.http.get<any>(this.ViewBSCInnitiativePlanAssigmentGrid);
  }

  // KeyPerformanceIndicators

  getKeyPerformanceIndicatorsLoadAll() {
    return this.http.get<any>(this.KeyPerformanceIndicators);
  }

  getKeyPerformanceIndicatorsByPrimaryKey_KPI_ID(KPI_ID) {
    KPI_ID = this.removeSlash(KPI_ID);
    return this.http.get<any>(this.KeyPerformanceIndicators + '/' + KPI_ID);
  }

  getKeyPerformanceIndicatorsByPrimaryKey_PerspectiveID(PerspectiveID) {
    PerspectiveID = this.removeSlash(PerspectiveID);
    return this.http.get<any>(this.KeyPerformanceIndicators + '/PerspectiveID/' + PerspectiveID);
  }

  saveKeyPerformanceIndicators(data) {
    return this.http.post(this.KeyPerformanceIndicators, data);
  }

  updateKeyPerformanceIndicators(data) {
    return this.http.put(this.KeyPerformanceIndicators, data);
  }

  deleteKeyPerformanceIndicators(KPI_ID) {
    KPI_ID = this.removeSlash(KPI_ID);
    return this.http.delete(this.KeyPerformanceIndicators + '/' + KPI_ID);
  }


  // Perspectives

  getPerspectivesLoadAll() {
    return this.http.get<any>(this.Perspectives);
  }

  getPerspectivesByPrimaryKey_Perspectives_ID(Perspectives_ID) {
    Perspectives_ID = this.removeSlash(Perspectives_ID);
    return this.http.get<any>(this.Perspectives + '/' + Perspectives_ID);
  }

  savePerspectives(data) {
    return this.http.post(this.Perspectives, data);
  }

  updatePerspectives(data) {
    return this.http.put(this.Perspectives, data);
  }

  deletePerspectives(Perspectives_ID) {
    Perspectives_ID = this.removeSlash(Perspectives_ID);
    return this.http.delete(this.Perspectives + '/' + Perspectives_ID);
  }

  // StrategicInnitiative

  getStrategicInnitiativeLoadAll() {
    return this.http.get<any>(this.StrategicInnitiative);
  }

  getStrategicInnitiativeByPrimaryKey_Innitiative_ID(Innitiative_ID) {
    Innitiative_ID = this.removeSlash(Innitiative_ID);
    return this.http.get<any>(this.StrategicInnitiative + '/InnitiativeID/' + Innitiative_ID);
  }

  saveStrategicInnitiative(data) {
    return this.http.post(this.StrategicInnitiative, data);
  }

  updateStrategicInnitiative(data) {
    return this.http.put(this.StrategicInnitiative, data);
  }

  deleteStrategicInnitiative(Innitiative_ID) {
    Innitiative_ID = this.removeSlash(Innitiative_ID);
    return this.http.delete(this.StrategicInnitiative + '/' + Innitiative_ID);
  }

  // InnitiativePlanAssignment

  getInnitiativePlanAssignmentLoadAll() {
    return this.http.get<any>(this.InnitiativePlanAssignment);
  }

  getInnitiativePlanAssignmentByPrimaryKey_IPA_ID(IPA_ID) {
    IPA_ID = this.removeSlash(IPA_ID);
    return this.http.get<any>(this.InnitiativePlanAssignment + '/' + IPA_ID);
  }

  saveInnitiativePlanAssignment(data) {
    return this.http.post(this.InnitiativePlanAssignment, data);
  }

  updateInnitiativePlanAssignment(data) {
    return this.http.put(this.InnitiativePlanAssignment, data);
  }

  deleteInnitiativePlanAssignment(IPA_ID) {
    IPA_ID = this.removeSlash(IPA_ID);
    return this.http.delete(this.InnitiativePlanAssignment + '/' + IPA_ID);
  }

  // AnnualStrategyGoals

  getAnnualStrategyGoalsLoadAll() {
    return this.http.get<any>(this.AnnualStrategyGoals);
  }

  getAnnualStrategyGoalsByPrimaryKey_annualStrategicGoalID(annual_Strategic_GoalID) {
    annual_Strategic_GoalID = this.removeSlash(annual_Strategic_GoalID);
    return this.http.get<any>(this.AnnualStrategyGoals + '/annualStrategicGoalID/' + annual_Strategic_GoalID);
  }

  getAnnualStrategyGoalsBy_ApplicationNumber(application_Number) {
    application_Number = this.removeSlash(application_Number);
    return this.http.get<any>(this.AnnualStrategyGoals + '/ApplicationNumber/' + application_Number);
  }

  saveAnnualStrategyGoals(data) {
    return this.http.post(this.AnnualStrategyGoals, data);
  }

  updateAnnualStrategyGoals(data) {
    return this.http.put(this.AnnualStrategyGoals, data);
  }

  deleteAnnualStrategyGoals(annual_Strategic_GoalID) {
    annual_Strategic_GoalID = this.removeSlash(annual_Strategic_GoalID)
    return this.http.delete(this.AnnualStrategyGoals + '/' + annual_Strategic_GoalID);
  }


  // AnnualStrategicPlanAssignment

  getAnnualStrategicPlanAssignmentLoadAll() {
    return this.http.get<any>(this.AnnualStrategicPlanAssignment);
  }

  getAnnualStrategicPlanAssignmentByPrimaryKey_aspa_id(aspa_id) {
    aspa_id = this.removeSlash(aspa_id);
    return this.http.get<any>(this.AnnualStrategicPlanAssignment + '/aspaid/' + aspa_id);
  }

  getAnnualStrategicPlanAssignmentBy_ApplicationNumber(ApplicationNumber) {
    ApplicationNumber = this.removeSlash(ApplicationNumber);
    return this.http.get<any>(this.AnnualStrategicPlanAssignment + '/ApplicationNumber/' + ApplicationNumber);
  }

  saveAnnualStrategicPlanAssignment(data) {
    return this.http.post(this.AnnualStrategicPlanAssignment, data);
  }

  updateAnnualStrategicPlanAssignment(data) {
    return this.http.put(this.AnnualStrategicPlanAssignment, data);
  }

  deleteAnnualStrategicPlanAssignment(aspa_id) {
    aspa_id = this.removeSlash(aspa_id);
    return this.http.delete(this.AnnualStrategicPlanAssignment + '/' + aspa_id);
  }

  // AnnualStrategyGoalsWithPerspectiveGoals

  getAnnualStrategyGoalsWithPerspectiveGoalsLoadAll() {
    return this.http.get<any>(this.AnnualStrategyGoalsWithPerspectiveGoals);
  }

  getAnnualStrategyGoalsWithPerspectiveGoalsByPrimaryKey_perspectiveGoal_ID(perspectiveGoal_ID) {
    perspectiveGoal_ID = this.removeSlash(perspectiveGoal_ID);
    return this.http.get<any>(this.AnnualStrategyGoalsWithPerspectiveGoals + '/perspectiveGoalID/' + perspectiveGoal_ID);
  }

  saveAnnualStrategyGoalsWithPerspectiveGoals(data) {
    return this.http.post(this.AnnualStrategyGoalsWithPerspectiveGoals, data);
  }

  updateAnnualStrategyGoalsWithPerspectiveGoals(data) {
    return this.http.put(this.AnnualStrategyGoalsWithPerspectiveGoals, data);
  }

  deleteAnnualStrategyGoalsWithPerspectiveGoals(perspectiveGoal_ID) {
    perspectiveGoal_ID = this.removeSlash(perspectiveGoal_ID);
    return this.http.delete(this.AnnualStrategyGoalsWithPerspectiveGoals + '/' + perspectiveGoal_ID);
  }

  // CompanyStrategy

  getCompanyStrategyLoadAll() {
    return this.http.get<any>(this.CompanyStrategy);
  }

  getCompanyStrategyByPrimaryKey_strategy_no(strategy_no) {
    strategy_no = this.removeSlash(strategy_no);
    return this.http.get<any>(this.CompanyStrategy + '/' + strategy_no);
  }

  saveCompanyStrategy(data) {
    return this.http.post(this.CompanyStrategy, data);
  }

  updateCompanyStrategy(data) {
    return this.http.put(this.CompanyStrategy, data);
  }

  deleteCompanyStrategy(strategy_no) {
    strategy_no = this.removeSlash(strategy_no);
    return this.http.delete(this.CompanyStrategy + '/' + strategy_no);
  }

   // StrategicThemes

   getStrategicThemesLoadAll() {
    return this.http.get<any>(this.StrategicThemes);
  }

  getStrategicThemesByPrimaryKey_Strategic_ThemeID(Strategic_ThemeID) {
    Strategic_ThemeID = this.removeSlash(Strategic_ThemeID);
    return this.http.get<any>(this.StrategicThemes + '/StrategicThemeID/' + Strategic_ThemeID);
  }

  saveStrategicThemes(data) {
    return this.http.post(this.StrategicThemes, data);
  }

  updateStrategicThemes(data) {
    return this.http.put(this.StrategicThemes, data);
  }

  deleteStrategicThemes(Strategic_ThemeID) {
    Strategic_ThemeID = this.removeSlash(Strategic_ThemeID);
    return this.http.delete(this.StrategicThemes + '/' + Strategic_ThemeID);
  }

  // KPIGoalMappingDetail

  getKPIGoalMappingDetailLoadAll() {
    return this.http.get<any>(this.KPIGoalMappingDetail);
  }

  getKPIGoalMappingDetailByPrimaryKey_TPA_ID(Mapping_DetailID ) {
    Mapping_DetailID = this.removeSlash(Mapping_DetailID );
    return this.http.get<any>(this.KPIGoalMappingDetail + '/' + Mapping_DetailID );
  }

  saveKPIGoalMappingDetail(data) {
    return this.http.post(this.KPIGoalMappingDetail, data);
  }

  updateKPIGoalMappingDetail(data) {
    return this.http.put(this.KPIGoalMappingDetail, data);
  }

  deleteKPIGoalMappingDetail(Mapping_DetailID ) {
    Mapping_DetailID  = this.removeSlash(Mapping_DetailID );
    return this.http.delete(this.KPIGoalMappingDetail + '/' + Mapping_DetailID );
  }


  // KPIGoalMapping

  getKPIGoalMappingLoadAll() {
    return this.http.get<any>(this.KPIGoalMapping);
  }

  getKPIGoalMappingByPrimaryKey_TPA_ID(KPIMapping_ID ) {
    KPIMapping_ID  = this.removeSlash(KPIMapping_ID );
    return this.http.get<any>(this.KPIGoalMapping + '/' + KPIMapping_ID );
  }

  saveKPIGoalMapping(data) {
    return this.http.post(this.KPIGoalMapping, data);
  }

  updateKPIGoalMapping(data) {
    return this.http.put(this.KPIGoalMapping, data);
  }

  deleteKPIGoalMapping(KPIMapping_ID ) {
    KPIMapping_ID  = this.removeSlash(KPIMapping_ID );
    return this.http.delete(this.KPIGoalMapping + '/' + KPIMapping_ID );
  }

  // Departments

  getDepartmentsLoadAll() {
    return this.http.get<any>(this.Departments);
  }

  getDepartmentsByPrimaryKey_Departments_ID(department_Code) {
    department_Code  = this.removeSlash(department_Code );
    return this.http.get<any>(this.Departments + '/' + department_Code);
  }

  saveDepartments(data) {
    return this.http.post(this.Departments, data);
  }

  updateDepartments(data) {
    return this.http.put(this.Departments, data);
  }

  deleteDepartments(department_Code) {
    department_Code = this.removeSlash(department_Code);
    return this.http.delete(this.Departments + '/' + department_Code);
  }

  // BacDataCollectionTransaction

  getBacDataCollectionTransactionLoadAll() {
    return this.http.get<any>(this.BacDataCollectionTransaction);
  }

  getBacDataCollectionTransactionByPrimaryKey_BSCTranID(BSC_Tran_ID) {
    BSC_Tran_ID = this.removeSlash(BSC_Tran_ID);
    return this.http.get<any>(this.BacDataCollectionTransaction + '/' + BSC_Tran_ID);
  }

  saveBacDataCollectionTransaction(data) {
    return this.http.post(this.BacDataCollectionTransaction, data);
  }

  updateBacDataCollectionTransaction(data) {
    return this.http.put(this.BacDataCollectionTransaction, data);
  }

  deleteBacDataCollectionTransaction(BSC_Tran_ID) {
    BSC_Tran_ID = this.removeSlash(BSC_Tran_ID);
    return this.http.delete(this.BacDataCollectionTransaction + '/' + BSC_Tran_ID);
  }

  // BSCValues

  getBSCValuesLoadAll() {
    return this.http.get<any>(this.BSCValues);
  }

  getBSCValuesByPrimaryKey_BSCValueID(BSC_Value_ID) {
    BSC_Value_ID = this.removeSlash(BSC_Value_ID);
    return this.http.get<any>(this.BSCValues + '/' + BSC_Value_ID);
  }

  saveBSCValues(data) {
    return this.http.post(this.BSCValues, data);
  }

  updateBSCValues(data) {
    return this.http.put(this.BSCValues, data);
  }

  deleteBSCValues(BSC_Value_ID) {
    BSC_Value_ID = this.removeSlash(BSC_Value_ID);
    return this.http.delete(this.BSCValues + '/' + BSC_Value_ID);
  }

  // DocumentDetail

  getDocumentDetailLoadAll() {
    return this.http.get<any>(this.DocumentDetail);
  }

  getDocumentDetailByPrimaryKey_id(id) {
    id = this.removeSlash(id);
    return this.http.get<any>(this.DocumentDetail + '/' + id);
  }

  saveDocumentDetail(data) {
    return this.http.post(this.DocumentDetail, data);
  }

  updateDocumentDetail(data) {
    return this.http.put(this.DocumentDetail, data);
  }

  deleteDocumentDetail(id) {
    id = this.removeSlash(id);
    return this.http.delete(this.DocumentDetail + '/' + id);
  }


// cUnit

getcUnitLoadAll() {
  return this.http.get<any>(this.cUnit);
}

getcUnitByPrimaryKey_unit(unit) {
  unit = this.removeSlash(unit);
  return this.http.get<any>(this.cUnit + '/unit/' + unit);
}

savecUnit(data) {
  return this.http.post(this.cUnit, data);
}

updatecUnit(data) {
  return this.http.put(this.cUnit, data);
}

deletecUnit(unit) {
  unit = this.removeSlash(unit);
  return this.http.delete(this.cUnit + '/' + unit);
}


getAspnetUsersLoadAll() {
  return this.http.get<any>(this.AspnetUsers);
}

getTypeOfInnitiativeLoadAll() {
  return this.http.get<any>(this.TypeOfInnitiative);
}

getViewBSCAnualStrategicPlanAssignmentLoadAll() {
  return this.http.get<any>(this.ViewBSCAnualStrategicPlanAssignment);
}

getAspnetUsersByPrimaryKey_UserId(UserId) {
  return this.http.get<any>(this.AspnetUsers + '/UserId/' + UserId);
}

getaspnetRolesGetAllRolesByPrimaryKey_ApplicationName(ApplicationName) {
  ApplicationName = this.removeSlash(ApplicationName);
  return this.http.get<any>(this.spnetRolesGetAllRoles + '/' + ApplicationName);
}

// OrganizationalStructure

getOrganizationalStructureLoadAll() {
  return this.http.get<any>(this.OrganizationalStructure);
}

getOrganizationalStructureByPrimaryKey(structure_ID) {
  structure_ID = this.removeSlash(structure_ID);
  return this.http.get<any>(this.OrganizationalStructure + '/' + structure_ID);
}

getOrganizationalStructureByPrimaryKey_DIV(DIV) {
  DIV = this.removeSlash(DIV);
  return this.http.get<any>(this.OrganizationalStructure + '/DIV/' + DIV);
}

saveOrganizationalStructure(data) {
  return this.http.post(this.OrganizationalStructure, data);
}

updateOrganizationalStructure(data) {
  return this.http.put(this.OrganizationalStructure, data);
}

deleteOrganizationalStructure(Strategic_ThemeID) {
  Strategic_ThemeID = this.removeSlash(Strategic_ThemeID);
  return this.http.delete(this.OrganizationalStructure + '/' + Strategic_ThemeID);
}

// WorkInfo

getWorkInfoLoadAll() {
  return this.http.get<any>(this.WorkInfo);
}

getWorkInfoByPrimaryKey(workInfo_ID) {
  workInfo_ID = this.removeSlash(workInfo_ID);
  return this.http.get<any>(this.WorkInfo + '/' + workInfo_ID);
}

getWorkInfoByPrimaryKey_structureID(structure_ID) {
  structure_ID = this.removeSlash(structure_ID);
  return this.http.get<any>(this.WorkInfo + '/structureID/' + structure_ID);
}

saveWorkInfo(data) {
  return this.http.post(this.WorkInfo, data);
}

updateWorkInfo(data) {
  return this.http.put(this.WorkInfo, data);
}

deleteWorkInfo(workInfo_ID) {
  workInfo_ID = this.removeSlash(workInfo_ID);
  return this.http.delete(this.WorkInfo + '/' + workInfo_ID);
}

 // CEmployee

 getCEmployeeLoadAll() {
  return this.http.get<any>(this.CEmployee);
}

getCEmployeeByPrimaryKey_EmployeeId(Employee_Id) {
  Employee_Id = this.removeSlash(Employee_Id);
  return this.http.get<any>(this.CEmployee + '/EmployeeId/' + Employee_Id);
}

getCEmployeeByPrimaryKey_UserID(User_ID) {
  User_ID = this.removeSlash(User_ID);
  return this.http.get<any>(this.CEmployee + '/UserID/' + User_ID);
}

saveCEmployee(data) {
  return this.http.post(this.CEmployee, data);
}

updateCEmployee(data) {
  return this.http.put(this.CEmployee, data);
}

deleteCEmployee(Employee_Id) {
  Employee_Id = this.removeSlash(Employee_Id);
  return this.http.delete(this.CEmployee + '/' + Employee_Id);
}

  removeSlash(string){
    if(string == null) return;
    return string.replace(/\//g, "%2F");
  }

  saveFormData(formData) {
    const ApplicationCode = '95664a26-d518-4854-a3b9-53df2cf1aa9c';
    const serviceId = '81f8770b-2c1e-4255-8be1-341089703fa1';
    const taskid = '6f84777c-44ed-4ba1-8a84-0da092afbb78';
    const orgid = '89eb1aec-c875-4a08-aaf6-2c36c0864979';
    const userid = 'BL_Info_Mgr';
    const json = formData;
    const docid = '3c605a8b-2e08-4c40-8c25-0343f99e543d';
    const todoID='69ceb598-2d2c-4525-929e-dd1e82b2d086';
    return this.http.put(this.saveFormDataURL, {
      ApplicationCode,
      serviceId,
      taskid,
      orgid,
      userid,
      json,
      docid,
      todoID
    });
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

  getTodandAppNo(AppNo) {
    return (this.http.get<any[]>(this.getTodandAppNoURL + '?' + 'ApplicationNo=' + AppNo));
  }

  getAll(AppNo) {
     return (this.http.get<any[]>(this.License_ServiceURL + '?' + 'sortOrder=test&currentFilter=' +
      AppNo + '&searchString&pageIndex&pageSize'));
  }

  getPriveys(certefcatcode) {
    return (this.http.get<any[]>(this.License_ServiceURL + '?' + 'sortOrder=test&currentFilter=' +
      certefcatcode + '&searchString&pageIndex&pageSize'));
  }

  getRequerdDocs(TaskID) {
    return this.http.get(this.getRequerdURL + '?TaskID=' + TaskID);
  }

  getTaskRule(tasksId) {
    return (this.http.post(this.getTaskRuleURL + '?' + 'taskid=' + tasksId, null));
  }

  getPlotManagement(plotid) {
    return this.http.get(this.PlotManagementUrl + '?' + 'sortOrder=test&currentFilter=' + plotid + '&searchString&pageIndex&pageSize');
  }

  getPropertyList(plotid) {
    return this.http.get(this.PropertyListUrl + '?' + 'sortOrder=test&currentFilter=' + plotid +
      '&searchStringByPID&searchStringByPloteID&pageIndex&pageSize');
  }

  getDeedTable(propertyID) {
    return this.http.get(this.DeedUrl + '?' + 'sortOrder=test&currentFilter=' + propertyID +
      '&searchString&pageIndex&pageSize');
  }

  getCertificateVersion(ownerShipid) {
    return this.http.get(this.CertificateVersionUrl + '?' + 'sortOrder=test&currentFilter=' +
      ownerShipid + '&searchString&pageIndex&pageSize');
  }

  getCustomerLookUP() {
    return this.http.get(this.CustomerLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  getCustomerTypeLookUP() {
    return this.http.get(this.CustomerTypeLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  getSuspendedReasonLookUP() {
    return this.http.get(this.SuspendedReasonLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  getPropertyTypeLookUP() {
    return this.http.get(this.PropertyTypeLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  getPropertyStatusLookUP() {
    return this.http.get(this.PropertyStatusLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }


  getServiceDeliveryUnitLookUP() {
    return this.http.get(this.ServiceDeliveryUnitLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  getTransferTypeLookUP() {
    return this.http.get(this.Deed_Transfer_Lookup + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }
  getLease_Type_Lookup() {
    return this.http.get(this.Lease_Type_Lookup + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  getWoredaLookUP() {
    return this.http.get(this.WoredaLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  getPlotStutusLookUP() {
    return this.http.get(this.PlotStutusLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  getPlotLandUseLookUP() {
    return this.http.get(this.PlotLandUseLookUP + '?' + 'sortOrder=test&currentFilter&searchString&pageIndex&pageSize');
  }

  Submit(AppCode, docID, todoID, ruleid) {
    return this.http.post(this.nextTaskCompleteURL + '?ApplicationNo=' + AppCode + '&docid=' + docID
      + '&todoid=' + todoID + '&userName=' + environment.username + '&status=C&Taskruleid=' + ruleid + '&ispending=false', null);
  }

  SubmitAR(AppCode, docID, todoID, ruleid) {
    return this.http.post(this.nextTaskAcceptOrRejectURl + '?ApplicationNo=' + AppCode + '&docid=' + docID
      + '&eid=00000000-0000-0000-0000-000000000000&isPending=false&todoid=' + todoID +
      '&userName=' + environment.username + '&status=C&taskruleid=' + ruleid, null);
  }

  saveForm(ApplicationCode, serviceId, taskid, orgid, json, docid, todoID) {
    return this.http.post(this.SaveDataURL + '?ApplicationCode=' + ApplicationCode + '&serviceId=' +
      serviceId + '&taskid=' + taskid + '&orgid=' + orgid + '&UserName=' + environment.username
      + '&json=' + json + '&docid=' +
      docid+ '&todoID=' +
      todoID, null);
  }

  GetForm(docid) {
    return this.http.get(this.GetDataURL + '?docid=' + docid);
  }

}
