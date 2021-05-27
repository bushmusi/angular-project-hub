import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import {environment} from '../../../environments/environment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-asp-assignment',
  templateUrl: './asp-assignment.component.html',
  styleUrls: ['./asp-assignment.component.css']
})
export class ASPAssignmentComponent implements OnInit {

  @Output() completed = new EventEmitter();
  @Output() updateSaveformMethod = new EventEmitter();
  @Input() AppNo;
  @Input() DocID;
  @Input() AppCode;
  @Input() Licence_Service_ID;
  @Input() Service_ID;
  @Input() tskID;
  @Input() SDP_ID;
  @Input() todoID;

  AnnualStrategyGoalsList: any;
  AnnualStrategicPlanAssignmentList: AnnualStrategicPlanAssignment [] = [];
  AnnualStrategicPlanAssignmentList2: AnnualStrategicPlanAssignment [] = [];

  AnnualStrategicPlanAssignment: AnnualStrategicPlanAssignment;
  AnnualStrategyGoals: AnnualStrategyGoals;

  DepartmentsList: any;
  OrganizationalStructuresList: any;
  OrganizationalStructuresForResponsibleList: any;

  saveBtn1IsSelected: boolean = false;
  newBtn1IsSelected: boolean = false;
  deleteBtn1IsSelected: boolean = false;

  saveBtn2IsSelected: boolean = false;
  newBtn2IsSelected: boolean = false;
  deleteBtn2IsSelected: boolean = false;

  selectedAnnualStrategicPlanAssignmentRowIndex = -1;
  selectedAnnualStrategyGoalsRowIndex = -1;
  selectedStrategicThemesRowIndex = -1;

  StrategicThemesList: any;

  Responsible_User_ID;
  CurrentUsername = environment.username;

  constructor(private serviceService: ServiceService, private notificationsService: NotificationsService) {
    this.AnnualStrategicPlanAssignment = new AnnualStrategicPlanAssignment();
    this.AnnualStrategyGoals = new AnnualStrategyGoals();
  }

  ngOnInit() {
    this.AnnualStrategicPlanAssignment.assigned_By = environment.username;
    this.AnnualStrategicPlanAssignment.aspA_ID = Guid.newGuid();
    this.CurrentUsername = environment.username;
    this.getAllAnnualStrategyGoalsBy_ApplicationNumber();
    this.getAllAnnualStrategicPlanAssignmentBy_ApplicationNumber();
    this.getAllDepartments();
  }

  newAnnualStrategicPlanAssignment(){
    this.selectedAnnualStrategicPlanAssignmentRowIndex = -1;
    this.AnnualStrategicPlanAssignment = new AnnualStrategicPlanAssignment();
    this.AnnualStrategicPlanAssignment.aspA_ID = Guid.newGuid();
    this.AnnualStrategicPlanAssignment.assigned_By = environment.username;
    this.Responsible_User_ID = null;
    this.getAllDepartments();
  }

  async saveOrUpdateAnnualStrategicPlanAssignment(){
    try{
      this.saveBtn2IsSelected = true;
      var result = await (await this.serviceService.getAnnualStrategicPlanAssignmentByPrimaryKey_aspa_id(this.AnnualStrategicPlanAssignment.aspA_ID)).toPromise();
      if( result.annualStrategicPlans.length <= 0 ){
            this.saveAnnualStrategicPlanAssignment();
            return;
      }

      if (this.selectedAnnualStrategicPlanAssignmentRowIndex == -1) {
        this.notificationsService.error('Error', 'Row has not selected');
        this.saveBtn2IsSelected = false;
        return;
      }

      this.serviceService.updateAnnualStrategicPlanAssignment(this.AnnualStrategicPlanAssignment).subscribe(result =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.success('Success', 'Updated');
        this.getAllAnnualStrategicPlanAssignmentBy_ApplicationNumber();
        this.newAnnualStrategicPlanAssignment();
      }, error=>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error));
      });
    }catch(error){
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    }
  }

  getAllAnnualStrategicPlanAssignmentBy_ApplicationNumber(){
    this.serviceService.getAnnualStrategicPlanAssignmentBy_ApplicationNumber(this.AppNo).subscribe(async data=>{
      data = data.annualStrategicPlans;
      var TempAnnualStrategicPlanAssignmentList: AnnualStrategicPlanAssignment[] = [];
      var temp : AnnualStrategicPlanAssignment;
      for( var i = 0; i < data.length; i++ ){
        temp = Object.assign({},data[i]);
        if(data[i].assigned_Body != undefined)

        var department;
        var OrganizationalStructure;

        department = await this.serviceService.getDepartmentsByPrimaryKey_Departments_ID(data[i].assigned_Body).toPromise();
        OrganizationalStructure = await this.serviceService.getOrganizationalStructureByPrimaryKey(data[i].responsible_Role).toPromise();
        var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
        this.SDP_ID = userInfo[0].organization_code;

        if(department != undefined){
          if(department.procdepartmentss != ""){
            temp.assigned_Body = department.procdepartmentss[0].department_Name;
          }else{
            temp.assigned_Body = "";
          }
        }else{
          temp.assigned_Body = "";
        }

        if(OrganizationalStructure != undefined){
          if(OrganizationalStructure.procOrganizationalStructures != ""){
            temp.responsible_Role = OrganizationalStructure.procOrganizationalStructures[0].roleName;
          }else{
            temp.responsible_Role = "";
          }
        }else{
          temp.responsible_Role = "";
        }

        if(userInfo != undefined){
          if(userInfo != ""){
            temp.assigned_By = userInfo[0].userName;
          }else{
            temp.assigned_By = "";
          }
        }else{
          temp.assigned_By = "";
        }

        OrganizationalStructure = null;
        userInfo = null;
        department = null;
        TempAnnualStrategicPlanAssignmentList.push(temp);
      }
      this.AnnualStrategicPlanAssignmentList2 = TempAnnualStrategicPlanAssignmentList;
      this.AnnualStrategicPlanAssignmentList = data;

    });
  }

  async saveAnnualStrategicPlanAssignment(){
    this.saveBtn2IsSelected = true;
    try{

        if(this.AppCode == undefined || this.DocID == undefined || this.todoID == undefined){

          if(this.AnnualStrategyGoalsList.length > 0){
            this.AppCode  = this.AnnualStrategyGoalsList[0].applicationCode;
            this.AppNo = this.AnnualStrategyGoalsList[0].application_NO;
            this.DocID = this.AnnualStrategyGoalsList[0].docNo;
            this.completed.emit(this.AppCode);
            this.updateSaveformMethod.emit([ this.AppCode, this.DocID, this.AppNo]);
          }else if(this.AnnualStrategicPlanAssignmentList.length > 0){
            this.AppCode  = this.AnnualStrategicPlanAssignmentList[0].applicationCode;
            this.AppNo = this.AnnualStrategicPlanAssignmentList[0].application_NO;
            this.DocID = this.AnnualStrategicPlanAssignmentList[0].doc_No;
            this.completed.emit(this.AppCode);
            this.updateSaveformMethod.emit([ this.AppCode, this.DocID, this.AppNo]);
          }else{
            var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
            this.SDP_ID = userInfo[0].organization_code;
            var message = await this.saveForm(null).toPromise();
            this.AppCode = message[0];
            this.DocID = message[1];
            this.todoID = message[2];
            this.completed.emit(message[0]);
            this.updateSaveformMethod.emit(message);
          }
        }

      var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
      this.AnnualStrategicPlanAssignment.assigned_By = userInfo[0].userId;

      this.AnnualStrategicPlanAssignment.application_NO = this.AppNo;
      this.AnnualStrategicPlanAssignment.applicationCode = this.AppCode;
      this.AnnualStrategicPlanAssignment.doc_No = this.DocID;

      this.serviceService.saveAnnualStrategicPlanAssignment(this.AnnualStrategicPlanAssignment).subscribe(result =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.success('Success', 'Saved');
        this.getAllAnnualStrategicPlanAssignmentBy_ApplicationNumber();
        this.newAnnualStrategicPlanAssignment();
      }, error =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error));
      });
    }catch(error){
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    }

  }

  deleteAnnualStrategicPlanAssignment(){
    if (this.selectedAnnualStrategicPlanAssignmentRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn2IsSelected = true;
    this.serviceService.deleteAnnualStrategicPlanAssignment(this.AnnualStrategicPlanAssignment.aspA_ID).subscribe(result =>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.getAllAnnualStrategicPlanAssignmentBy_ApplicationNumber();
      this.newAnnualStrategicPlanAssignment();
    }, error=>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error));
    });
  }

  public async selectAnnualStrategicPlanAssignmentTableRow(index) {
    this.selectedAnnualStrategicPlanAssignmentRowIndex = index;
    this.selectedAnnualStrategyGoalsRowIndex = -1;
    this.AnnualStrategicPlanAssignment = new AnnualStrategicPlanAssignment();
    this.Responsible_User_ID = null;
    var temp = Object.assign({},this.AnnualStrategicPlanAssignmentList[index]);
    await this.serviceService.getOrganizationalStructureByPrimaryKey_DIV(temp.assigned_Body).subscribe(data=>{
      this.OrganizationalStructuresList = data.procOrganizationalStructures;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });

    this.Responsible_User_ID = null;
    await this.serviceService.getWorkInfoByPrimaryKey_structureID(temp.responsible_Role).subscribe(data=>{
      if(data.procWorkInfos!=null){
        this.serviceService.getCEmployeeByPrimaryKey_EmployeeId(data.procWorkInfos[0].employee_ID).subscribe(data=>{
          if(data.c_Employees != null){
            this.Responsible_User_ID = data.c_Employees[0].fName + data.c_Employees[0].lName;
          }
        },error => {
          this.notificationsService.error('Error', JSON.stringify(error.message));
          console.log('Error', JSON.stringify(error));
        });
      }
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });

    var userInfo = await this.serviceService.getAspnetUsersByPrimaryKey_UserId(temp.assigned_By).toPromise();
    var username;
    if(userInfo != undefined){
      if(userInfo.procaspnetUserss != ""){
        username = userInfo.procaspnetUserss[0].userName;
      }else{
        username = "";
      }
    }else{
      username = "";
    }

    temp = Object.assign({},this.AnnualStrategicPlanAssignmentList[index]);
    temp.assigned_By = username;
    this.AnnualStrategicPlanAssignment = Object.assign({},temp);

  }

  newAnnualStrategyGoals(){
    this.selectedAnnualStrategyGoalsRowIndex = -1;
    this.selectedAnnualStrategicPlanAssignmentRowIndex = -1;
    this.AnnualStrategyGoals = new AnnualStrategyGoals();
    this.AnnualStrategicPlanAssignment = new AnnualStrategicPlanAssignment();
    this.AnnualStrategicPlanAssignment.aspA_ID = Guid.newGuid();
    this.AnnualStrategicPlanAssignment.assigned_By = environment.username;
    this.AnnualStrategyGoals.created_Date = formatDate(new Date(), 'yyyy/MM/dd hh:mm a', 'en');
    this.Responsible_User_ID = null;
  }

  newAnnualStrategyGoalsPopup(){
    this.newAnnualStrategyGoals();
    document.getElementById('new-popup').style.display='block';
  }

  getAnnualStrategyGoals(){
    if (this.selectedAnnualStrategyGoalsRowIndex == -1)
    {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    document.getElementById('SaveOrUpdate-popup').style.display='block';
  }

   saveOrUpdateAnnualStrategyGoals(){
    this.saveBtn1IsSelected = true;
    this.serviceService.updateAnnualStrategyGoals(this.AnnualStrategyGoals).subscribe(result =>{
      this.saveBtn1IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.getAllAnnualStrategyGoalsBy_ApplicationNumber();
      this.newAnnualStrategyGoals();
      document.getElementById('SaveOrUpdate-popup').style.display='none';
    }, error=>{
      this.saveBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error));
      document.getElementById('SaveOrUpdate-popup').style.display='none';
      this.getAllAnnualStrategyGoalsBy_ApplicationNumber();
      this.newAnnualStrategyGoals();
    });
  }

  getAllAnnualStrategyGoalsBy_ApplicationNumber(){
    this.serviceService.getAnnualStrategyGoalsBy_ApplicationNumber(this.AppNo).subscribe(AnnualStrategyGoals=>{
      this.AnnualStrategyGoalsList = AnnualStrategyGoals.annualStrategicGoals;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  async saveAnnualStrategyGoals(){
    this.newBtn1IsSelected = true;
    try{

      if(this.AppCode == undefined || this.DocID == undefined || this.todoID == undefined){

        if(this.AnnualStrategyGoalsList.length > 0){
          this.AppCode  = this.AnnualStrategyGoalsList[0].applicationCode;
          this.AppNo = this.AnnualStrategyGoalsList[0].application_NO;
          this.DocID = this.AnnualStrategyGoalsList[0].docNo;
          this.completed.emit(this.AppCode);
          this.updateSaveformMethod.emit([ this.AppCode, this.DocID, this.AppNo]);
        }else if(this.AnnualStrategicPlanAssignmentList.length > 0){
          this.AppCode  = this.AnnualStrategicPlanAssignmentList[0].applicationCode;
          this.AppNo = this.AnnualStrategicPlanAssignmentList[0].application_NO;
          this.DocID = this.AnnualStrategicPlanAssignmentList[0].doc_No;
          this.completed.emit(this.AppCode);
          this.updateSaveformMethod.emit([ this.AppCode, this.DocID, this.AppNo]);
        }else{
          var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
          this.SDP_ID = userInfo[0].organization_code;
          var message = await this.saveForm(null).toPromise();
          this.AppCode = message[0];
          this.DocID = message[1];
          this.todoID = message[2];
          this.completed.emit(message[0]);
          this.updateSaveformMethod.emit(message);
        }

      }

      this.AnnualStrategyGoals.applicationCode = this.AppCode;
      this.AnnualStrategyGoals.application_NO = this.AppNo;
      this.AnnualStrategyGoals.docNo = this.DocID;

      this.serviceService.saveAnnualStrategyGoals(this.AnnualStrategyGoals).subscribe(result =>{
        this.newBtn1IsSelected = false;
        this.notificationsService.success('Success', 'Saved');
        this.getAllAnnualStrategyGoalsBy_ApplicationNumber();
        this.newAnnualStrategyGoals();
        document.getElementById('new-popup').style.display='none';
      }, error=>{
        this.newBtn1IsSelected = false;
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error));
      });
    }catch(error){
      this.newBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    }

  }

  deleteAnnualStrategyGoals(){
    if (this.selectedAnnualStrategyGoalsRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;

    this.deleteBtn1IsSelected = true;
    this.serviceService.deleteAnnualStrategyGoals(this.AnnualStrategyGoals.annual_Strategic_GoalID).subscribe(result =>{
      this.deleteBtn1IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.getAllAnnualStrategyGoalsBy_ApplicationNumber();
      this.newAnnualStrategyGoals();
    }, error=>{
      this.deleteBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error));
    });
  }

  public selectAnnualStrategyGoalsTableRow(index) {
    this.selectedAnnualStrategyGoalsRowIndex = index;
    this.selectedAnnualStrategicPlanAssignmentRowIndex = -1;
    this.Responsible_User_ID = null;
    this.AnnualStrategicPlanAssignment = new AnnualStrategicPlanAssignment();
    this.AnnualStrategicPlanAssignment.aspA_ID = Guid.newGuid();
    this.AnnualStrategicPlanAssignment.assigned_By = environment.username;
    this.AnnualStrategyGoals = this.AnnualStrategyGoalsList[index];
    this.AnnualStrategicPlanAssignment.asgD_ID = this.AnnualStrategyGoals.annual_Strategic_GoalID;
  }

  public selectStrategicThemesTableRow(index) {
    this.selectedStrategicThemesRowIndex = index;
  }

  public OnSelectStrategicTheme(){
    this.AnnualStrategyGoals.strategic_ThemeID =  this.StrategicThemesList[this.selectedStrategicThemesRowIndex].strategic_ThemeID;
    document.getElementById('popup-input-values').style.display='none';
    this.selectedStrategicThemesRowIndex = -1;
  }
  public OnSelectStrategicTheme2(){
    this.AnnualStrategyGoals.strategic_ThemeID =  this.StrategicThemesList[this.selectedStrategicThemesRowIndex].strategic_ThemeID;
    document.getElementById('popup-input-values2').style.display='none';
    this.selectedStrategicThemesRowIndex = -1;
  }

  onFocus(){
    document.getElementById('popup-input-values').style.display='block';
    this.getAllStrategicThemes();
  }

  onFocus2(){
    document.getElementById('popup-input-values2').style.display='block';
    this.getAllStrategicThemes();
  }

  getAllDepartments(){
    this.serviceService.getDepartmentsLoadAll().subscribe(departments=>{
      this.DepartmentsList = departments.procdepartmentss;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }


  getAllStrategicThemes(){
    this.serviceService.getStrategicThemesLoadAll().subscribe(data=>{
      this.StrategicThemesList = data.strategicThemess;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  onAssignedBodyChange(department_Code) {
    this.Responsible_User_ID = null;
    this.serviceService.getOrganizationalStructureByPrimaryKey_DIV(department_Code).subscribe(data=>{
      this.OrganizationalStructuresList = data.procOrganizationalStructures;
      this.getResponsibleUserList(this.OrganizationalStructuresList);
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  ResponsibleUserList : ResponsibleUserList []= [];

  async getResponsibleUserList(OrganizationalStructuresList){
    var temp: ResponsibleUserList[] = [];
    for(var i = 0; i <  OrganizationalStructuresList.length; i++){
      var OrganizationalStructure = OrganizationalStructuresList[i];
      var workinfo = await this.serviceService.getWorkInfoByPrimaryKey_structureID(OrganizationalStructure.structure_ID).toPromise();

      if(workinfo != ""){
        if(workinfo.procWorkInfos.length > 0){
            var temp2: ResponsibleUserList = new ResponsibleUserList();
            temp2.structure_ID = workinfo.procWorkInfos[0].structure_ID;
            var Employee = await this.serviceService.getCEmployeeByPrimaryKey_EmployeeId(workinfo.procWorkInfos[0].employee_ID).toPromise();
            if(Employee != ""){
              temp2.Employee_name = Employee.c_Employees[0].fName + Employee.c_Employees[0].lName;
              temp.push(temp2);
            }
        }
      }
    }

    this.ResponsibleUserList = temp;
  }


  onResponsibleRoleChange(structure_ID) {
    this.Responsible_User_ID = null;
    this.serviceService.getWorkInfoByPrimaryKey_structureID(structure_ID).subscribe(data=>{
      if(data.procWorkInfos!=null){
        this.serviceService.getCEmployeeByPrimaryKey_EmployeeId(data.procWorkInfos[0].employee_ID).subscribe(data=>{
          if(data.c_Employees != null){
            this.Responsible_User_ID = data.c_Employees[0].fName + data.c_Employees[0].lName;
          }
        },error => {
          this.notificationsService.error('Error', JSON.stringify(error.message));
          console.log('Error', JSON.stringify(error));
        });
      }
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  saveForm(formData) {
    if(this.Licence_Service_ID == undefined){
      this.Licence_Service_ID = '00000000-0000-0000-0000-000000000000';
      this.DocID = '00000000-0000-0000-0000-000000000000';
      this.todoID = '00000000-0000-0000-0000-000000000000';
      this.Service_ID = this.AppNo;
    }

    return this.serviceService.saveForm(this.Licence_Service_ID, this.Service_ID, this.tskID,
       this.SDP_ID, JSON.stringify(formData), this.DocID, this.todoID);
  }

}

class AnnualStrategicPlanAssignment
{
  public aspA_ID: string;
  public asgD_ID: string;
  public assigned_Body: string;
  public responsible_Role: string;
  public is_Active: boolean;
  public log: string = '';
  public applicationCode: string;
  public application_NO: string;
  public doc_No: string;
  public assigned_By: string;
}

class AnnualStrategyGoals{
  public annual_Strategic_GoalID : string;
  public strategic_ThemeID : string;
  public created_Date : any;
  public year : number;
  public result_In_Per : number;
  public applicationCode : string;
  public application_NO : string;
  public docNo : string;
  public log : string;
  public isActive : boolean;
}

class Departments{
  public department_code: string;
	public department_name: string;
	public departments_department_code: string;
	public organizations_organization_code: string;
}

class ResponsibleUserList{
  public structure_ID: any;
	public Employee_name: string;
}

class Guid{
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
