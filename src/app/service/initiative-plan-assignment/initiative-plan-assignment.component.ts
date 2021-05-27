import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import {environment} from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-initiative-plan-assignment',
  templateUrl: './initiative-plan-assignment.component.html',
  styleUrls: ['./initiative-plan-assignment.component.css']
})
export class InitiativePlanAssignmentComponent implements OnInit {
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

  StrategicInnitiativeList: any;
  InnitiativePlanAssignmentList: InnitiativePlanAssignment[] = [];
  InnitiativePlanAssignmentList2: InnitiativePlanAssignment[] = [];

  public InnitiativePlanAssignment: InnitiativePlanAssignment;
  StrategicInnitiative: StrategicInnitiative;
  ViewBSCAnualStrategicPlanAssignment: ViewBSCAnualStrategicPlanAssignment;

  DepartmentsList: any;
  spnetRolesGetAllRolesList: any;
  aspnetUsersList: any;
  StrategicInnitiativeSelectList: any;
  cUnitList: any;
  TypeOfInnitiativeList: any;
  ViewBSCAnualStrategicPlanAssignmentList: ViewBSCAnualStrategicPlanAssignment[]= [];

  saveBtn1IsSelected: boolean = false;
  newBtn1IsSelected: boolean = false;
  deleteBtn1IsSelected: boolean = false;

  saveBtn2IsSelected: boolean = false;
  newBtn2IsSelected: boolean = false;
  deleteBtn2IsSelected: boolean = false;

  selectedInnitiativePlanAssignmentRowIndex = -1;
  selectedStrategicInnitiativeRowIndex = -1;
  selectedViewBSCAnualStrategicPlanAssignmentRowIndex = -1;

  OrganizationalStructuresList: any;

  Responsible_User_ID;

  constructor(private serviceService: ServiceService,
              private notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute) {
    this.InnitiativePlanAssignment = new InnitiativePlanAssignment();
    this.StrategicInnitiative = new StrategicInnitiative();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {

    this.InnitiativePlanAssignment.assigned_By = environment.username;
      this.getAllInnitiativePlanAssignment();
      this.getAllDepartments();
      this.getAllcUnit();
      this.getAllTypeOfInnitiative();
      this.getAllViewBSCAnualStrategicPlanAssignment();
      this.getAllspnetRolesGetAllRoles();
      this.getAllaspnetUsers();
      this.getAllOrganizationalStructure();
      this.InnitiativePlanAssignment.ipA_ID = Guid.newGuid();
    });
  }

  newInnitiativePlanAssignment(){
    this.selectedInnitiativePlanAssignmentRowIndex = -1;
    this.InnitiativePlanAssignment = new InnitiativePlanAssignment();
    this.InnitiativePlanAssignment.assigned_By = environment.username;
    this.InnitiativePlanAssignment.ipA_ID = Guid.newGuid();
    this.selectedStrategicInnitiativeRowIndex = -1;
    this.selectedViewBSCAnualStrategicPlanAssignmentRowIndex = -1;
    this.StrategicInnitiative = new StrategicInnitiative();
    this.StrategicInnitiativeList = [];
    this.getAllDepartments();
    this.getAllspnetRolesGetAllRoles();
    this.getAllaspnetUsers();
    this.getAllOrganizationalStructure();
  }

  async saveOrUpdateInnitiativePlanAssignment(){
    this.saveBtn2IsSelected = true;
    var result = await this.serviceService.getInnitiativePlanAssignmentByPrimaryKey_IPA_ID(this.InnitiativePlanAssignment.ipA_ID).toPromise();
    if(result.innitiativePlanAssignments.length <= 0){
          this.saveInnitiativePlanAssignment();
          return;
    }

    if (this.selectedInnitiativePlanAssignmentRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      this.saveBtn2IsSelected = false;
      return;
    }

    this.serviceService.updateInnitiativePlanAssignment(this.InnitiativePlanAssignment).subscribe(result =>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.newInnitiativePlanAssignment();
      this.getAllInnitiativePlanAssignment();
    }, error=>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }


  getAllInnitiativePlanAssignment(){
    this.serviceService.getInnitiativePlanAssignmentLoadAll().subscribe(async data=>{
      data = data.innitiativePlanAssignments;
      data = data.filter(entity => entity.application_NO === this.AppNo);
      var TempInnitiativePlanAssignmentList: InnitiativePlanAssignment[] = [];
      var temp : InnitiativePlanAssignment;
      for( var i = 0; i < data.length; i++ ){
        temp = Object.assign({},data[i]);
        var department;
        var OrganizationalStructure;
        var userInfo;

        department = await this.serviceService.getDepartmentsByPrimaryKey_Departments_ID(data[i].assigned_Body).toPromise();
        OrganizationalStructure = await this.serviceService.getOrganizationalStructureByPrimaryKey(data[i].responsible_Role).toPromise();
        userInfo = await this.serviceService.getAspnetUsersByPrimaryKey_UserId(temp.assigned_By).toPromise();

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
          if(userInfo.procaspnetUserss != ""){
            temp.assigned_By = userInfo.procaspnetUserss[0].userName;
          }else{
            temp.assigned_By = "";
          }
        }else{
          temp.assigned_By = "";
        }

        OrganizationalStructure = null;
        userInfo = null;
        department = null;
        TempInnitiativePlanAssignmentList.push(temp);
      }
      this.InnitiativePlanAssignmentList2 = TempInnitiativePlanAssignmentList;
      this.InnitiativePlanAssignmentList = data;
    }, error=>{
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }


 async saveInnitiativePlanAssignment(){
    this.saveBtn2IsSelected = true;
    try{
      if(this.AppCode == undefined || this.DocID == undefined || this.todoID == undefined){
        if(this.InnitiativePlanAssignmentList.length > 0){
          this.AppCode  = this.InnitiativePlanAssignmentList[0].applicationCode;
          this.AppNo = this.InnitiativePlanAssignmentList[0].application_NO;
          this.DocID = this.InnitiativePlanAssignmentList[0].doc_No;
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
      this.InnitiativePlanAssignment.assigned_By = userInfo[0].userId;

      this.InnitiativePlanAssignment.applicationCode = this.AppCode;
      this.InnitiativePlanAssignment.application_NO = this.AppNo;
      this.InnitiativePlanAssignment.doc_No = this.DocID;

      this.serviceService.saveInnitiativePlanAssignment(this.InnitiativePlanAssignment).subscribe(result =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.success('Success', 'Saved');
        this.newInnitiativePlanAssignment();
        this.getAllInnitiativePlanAssignment();
      }, error =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error.error));
      });

    }catch(error){
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    }
  }

  deleteInnitiativePlanAssignment(){
    if (this.selectedInnitiativePlanAssignmentRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn2IsSelected = true;
    this.serviceService.deleteInnitiativePlanAssignment(this.InnitiativePlanAssignment.ipA_ID).subscribe(result =>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.newInnitiativePlanAssignment();
      this.getAllInnitiativePlanAssignment();
    }, error=>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public async selectInnitiativePlanAssignmentTableRow(index) {
    this.newInnitiativePlanAssignment();
    this.selectedStrategicInnitiativeRowIndex = -1;
    this.selectedInnitiativePlanAssignmentRowIndex = index;
    this.InnitiativePlanAssignment = new InnitiativePlanAssignment();
    var temp = Object.assign({},this.InnitiativePlanAssignmentList[index]);

    await this.serviceService.getOrganizationalStructureByPrimaryKey_DIV(temp.assigned_Body).subscribe(data=>{
      this.OrganizationalStructuresList = data.procOrganizationalStructures;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });

    this.Responsible_User_ID = null;
    await this.serviceService.getWorkInfoByPrimaryKey_structureID(temp.responsible_Role).subscribe(data=>{
      if(data.procWorkInfos!=null){
      if(data.procWorkInfos.length > 0)
        this.serviceService.getCEmployeeByPrimaryKey_EmployeeId(data.procWorkInfos[0].employee_ID).subscribe(data=>{
          if(data.c_Employees != null){
          if(data.c_Employees.length > 0)
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

    temp = Object.assign({},this.InnitiativePlanAssignmentList[index]);
    temp.assigned_By = username;
    this.InnitiativePlanAssignment = Object.assign({},temp);
  }

  newStrategicInnitiative(){
    this.selectedStrategicInnitiativeRowIndex = -1;
    this.selectedViewBSCAnualStrategicPlanAssignmentRowIndex = -1;
    this.StrategicInnitiative = new StrategicInnitiative();
    this.StrategicInnitiativeList = [];
    this.getAllcUnit();
    this.getAllTypeOfInnitiative();
  }

  newStrategicInnitiativePopup(){
    this.newStrategicInnitiative();
    this.StrategicInnitiative.aspA_ID = this.ViewBSCAnualStrategicPlanAssignment.aspA_ID;
    document.getElementById('new-popup').style.display='block';
  }

  getStrategicInnitiativePopup(){
    if (this.selectedStrategicInnitiativeRowIndex == -1)
    {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    document.getElementById('SaveOrUpdate-popup').style.display='block';
  }

  saveOrUpdateStrategicInnitiative(){
    this.saveBtn1IsSelected = true;
    this.serviceService.updateStrategicInnitiative(this.StrategicInnitiative).subscribe(result =>{
      this.saveBtn1IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.newStrategicInnitiative();
      this.getAllViewBSCAnualStrategicPlanAssignment();
      document.getElementById('SaveOrUpdate-popup').style.display='none';
    }, error=>{
      this.saveBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  async saveStrategicInnitiative(){
    this.newBtn1IsSelected = true;
    var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
    this.StrategicInnitiative.created_By_User = userInfo[0].userId;
    this.serviceService.saveStrategicInnitiative(this.StrategicInnitiative).subscribe(result =>{
      this.newBtn1IsSelected = false;
      this.notificationsService.success('Success', 'Saved');
      this.newStrategicInnitiative();
      this.getAllViewBSCAnualStrategicPlanAssignment();
      document.getElementById('new-popup').style.display='none';
    }, error=>{
      this.newBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  deleteStrategicInnitiative(){
    if (this.selectedStrategicInnitiativeRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn1IsSelected = true;
    this.serviceService.deleteStrategicInnitiative(this.StrategicInnitiative.innitiative_ID).subscribe(result =>{
      this.deleteBtn1IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.newStrategicInnitiative();
      this.getAllViewBSCAnualStrategicPlanAssignment();
    }, error=>{
      this.deleteBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public selectStrategicInnitiativeTableRow(index) {
    this.selectedStrategicInnitiativeRowIndex = index;
    this.StrategicInnitiative = this.StrategicInnitiativeList[index];

    this.selectedInnitiativePlanAssignmentRowIndex = -1;
    this.InnitiativePlanAssignment = new InnitiativePlanAssignment();
    this.InnitiativePlanAssignment.assigned_By = environment.username;
    this.InnitiativePlanAssignment.ipA_ID = Guid.newGuid();
    this.InnitiativePlanAssignment.innitiative_ID = this.StrategicInnitiative.innitiative_ID;

  }

  public selectViewBSCAnualStrategicPlanAssignmentTableRow(index) {
    this.selectedStrategicInnitiativeRowIndex = -1;
    this.selectedInnitiativePlanAssignmentRowIndex = -1;
    this.selectedViewBSCAnualStrategicPlanAssignmentRowIndex = index;
    this.StrategicInnitiativeList = [];
    this.InnitiativePlanAssignment = new InnitiativePlanAssignment();
    this.InnitiativePlanAssignment.assigned_By = environment.username;
    this.InnitiativePlanAssignment.ipA_ID = Guid.newGuid();
    this.ViewBSCAnualStrategicPlanAssignment = this.ViewBSCAnualStrategicPlanAssignmentList[index];


    this.serviceService.getStrategicInnitiativeByPrimaryKey_Innitiative_ID(this.ViewBSCAnualStrategicPlanAssignment.aspA_ID).subscribe(data=>{
      if(data.strategicInnitiatives != ""){
        this.StrategicInnitiativeList =  data.strategicInnitiatives;
      }else{
        this.notificationsService.error('Error', 'SomeThing Went Wrong');
      }
    },error =>{
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }


  getAllDepartments(){
    this.serviceService.getDepartmentsLoadAll().subscribe(departments=>{
      this.DepartmentsList = departments.procdepartmentss;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  getAllspnetRolesGetAllRoles(){
    this.serviceService.getaspnetRolesGetAllRolesByPrimaryKey_ApplicationName('/').subscribe(data=>{
      this.spnetRolesGetAllRolesList = data.aspnetRolesCreateRoles;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  getAllaspnetUsers(){
    this.serviceService.getAspnetUsersLoadAll().subscribe(data=>{
      this.aspnetUsersList = data.procaspnetUserss;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  getAllcUnit(){
    this.serviceService.getcUnitLoadAll().subscribe(result=>{
      this.cUnitList = result.proccUnits;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }


  getAllTypeOfInnitiative(){
    this.serviceService.getTypeOfInnitiativeLoadAll().subscribe(result=>{
      this.TypeOfInnitiativeList = result;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  getAllViewBSCAnualStrategicPlanAssignment(){
    this.serviceService.getViewBSCAnualStrategicPlanAssignmentLoadAll().subscribe(async result=>{
      var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
      var role = userInfo[0].structure_ID;
      this.ViewBSCAnualStrategicPlanAssignmentList  = result.filter(entity => entity.responsible_Role === role);
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }


  viewDetailStrategicInnitiativePopup(){
    document.getElementById('view-detail-data-popup').style.display='block';
  }


  async getAllOrganizationalStructure(){
    var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
    var department_code = userInfo[0].department_code;
    this.serviceService.getOrganizationalStructureByPrimaryKey_DIV(department_code).subscribe(data=>{
      this.OrganizationalStructuresList = data.procOrganizationalStructures;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }


  onAssignedBodyChange(department_Code) {
    this.Responsible_User_ID = null;
    this.serviceService.getOrganizationalStructureByPrimaryKey_DIV(department_Code).subscribe(data=>{
      this.OrganizationalStructuresList = data.procOrganizationalStructures;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
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


  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        var a= reader.result.toString().split(',');
        this.StrategicInnitiative.document = a[1];
    };
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

class StrategicInnitiative {
  public innitiative_ID: string;
	public aspA_ID: string;
	public type_Of_Innitiative: string;
	public innitiative: string;
	public description: string;
	public estimated_Cost_In_Birr: number;
	public value_In_Per: number;
	public unit: string;
	public expected_Result: string;
	public required_Inputs: string;
	public estimatedBudget: number;
	public budget_Account: string;
	public startDate: Date;
	public endDate: Date;
	public parentInnitiative_ID: string;
	public is_Active: boolean;
	public created_By_User: string;
	public acctual: number;
	public variance: number;
	public duration_In_Days: number;
	public priority: number;
	public document: string = '';
	public document_Details_ID: string;
}

class InnitiativePlanAssignment {
  public ipA_ID: string;
  public innitiative_ID: string;
  public assigned_Body: string;
  public responsible_Role: string;
  public is_Active: boolean;
  public log: string = '';
  public applicationCode: string;
  public application_NO: string;
  public doc_No: string;
  public assigned_By: string;
  public is_Owner: boolean;
}

class Departments {
  public department_code: string;
	public department_name: string;
	public departments_department_code: string;
	public organizations_organization_code: string;
}

class spnetRolesGetAllRoles {
	public roleName: string;
}

class ViewBSCAnualStrategicPlanAssignment{
  public aspA_ID: any;
  public asgD_ID: any;
  public annual_Strategic_GoalID: any;
  public strategic_Goal: any;
  public goal_Value_In_Per: any;
  public assigned_Body: any;
  public assigned_Body_Name: any;
  public responsible_Role: any;
  public responsible_Role_Name: any;
  public is_Active: any;
  public assigned_By: any;
  public assigned_By_Name: any;
  public applicationCode: any;
  public application_NO: any;
  public goal_Description: any;
}

class aspnetUsers {
  public applicationId: string;
	public userId: string;
	public userName: string;
	public loweredUserName: string;
	public mobileAlias: string;
	public isAnonymous: boolean;
	public lastActivityDate: Date;
	public firstName_en: string;
	public lastName_en: string;
	public firstName_Local: string;
	public lastName_Local: string;
	public middleName_en: string;
	public middleName_Local: string;
	public isSuperUser: boolean;
	public intID: number;
	public phone: string;
	public active: boolean;
	public departments_id: number;
	public status: string;
	public is_Employee: boolean;
	public is_synched: boolean;
	public date_synched: Date;
	public department_Code: string;
	public supervised_by: string;
	public email: string;
	public officeNo: number;
}


class Guid {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

