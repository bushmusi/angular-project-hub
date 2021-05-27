import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-key-performance-indicator-goal-mapping',
  templateUrl: './key-performance-indicator-goal-mapping.component.html',
  styleUrls: ['./key-performance-indicator-goal-mapping.component.css']
})
export class KeyPerformanceIndicatorGoalMappingComponent implements OnInit {

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

  public KPIGoalMapping: KPIGoalMapping;
  StrategicInnitiative: StrategicInnitiative;

  KPIGoalMappingList: KPIGoalMapping[] = [];
  KPIGoalMappingList2: KPIGoalMapping[] = [];

  PerspectivesList: any;
  StrategicInnitiativeSelectList: any;
  KeyPerformanceIndicatorsList: any;
  AnnualStrategicPlanAssignmentList: any;
  cUnitList: any;
  DocumentDetailList: any;
  ViewBSCInnitiativePlanAssigmentGridList: ViewBSCInnitiativePlanAssigmentGrid[] = [];

  saveBtn1IsSelected: boolean = false;
  newBtn1IsSelected: boolean = false;
  deleteBtn1IsSelected: boolean = false;

  saveBtn2IsSelected: boolean = false;
  newBtn2IsSelected: boolean = false;
  deleteBtn2IsSelected: boolean = false;

  selectedKPIGoalMappingRowIndex = -1;
  selectedStrategicInnitiativeRowIndex = -1;
  selected_View_BSCIPAG_RowIndex = -1;
  selectedKeyPerformanceIndicatorsRowIndex = -1;

  popupselectedKeyPerformanceIndicatorsKpIID;

  loading: boolean = false;

  constructor(private serviceService: ServiceService,
              private notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute) {
    this.KPIGoalMapping = new KPIGoalMapping();
    this.StrategicInnitiative = new StrategicInnitiative();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getAllKPIGoalMapping();
      this.getAllAnnualStrategicPlanAssignment();
      this.getAllcUnit();
      this.getDocumentDetail();
      this.getAllViewBSCInnitiativePlanAssigmentGrid();
      this.KPIGoalMapping.kpiMapping_ID = Guid.newGuid();
    });
  }

  newKPIGoalMapping(){
    this.selectedKPIGoalMappingRowIndex = -1;
    this.selected_View_BSCIPAG_RowIndex = -1;
    this.StrategicInnitiative = new StrategicInnitiative();
    this.KPIGoalMapping = new KPIGoalMapping();
    this.KPIGoalMapping.kpiMapping_ID = Guid.newGuid();
  }

  async saveOrUpdateKPIGoalMapping(){
    var result = await this.serviceService.getKPIGoalMappingByPrimaryKey_TPA_ID(this.KPIGoalMapping.kpiMapping_ID).toPromise();
    if(result.procKPIGoalMappings.length <= 0){
          this.saveKPIGoalMapping();
          return;
    }

    if (this.selectedKPIGoalMappingRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }

    this.saveBtn2IsSelected = true;
    this.serviceService.updateKPIGoalMapping(this.KPIGoalMapping).subscribe(result =>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.newKPIGoalMapping();
      this.getAllKPIGoalMapping();
    }, error=>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }


  getAllKPIGoalMapping(){

    this.serviceService.getKPIGoalMappingLoadAll().subscribe(async data=>{

      data = data.procKPIGoalMappings;
      var TempKPIGoalMappingList: KPIGoalMapping[] = [];
      var temp : KPIGoalMapping;
      for( var i = 0; i < data.length; i++ ){
        temp = Object.assign({},data[i]);

        if(data[i].kpI_ID != undefined)
        var KeyPerformanceIndicators = await this.serviceService.getKeyPerformanceIndicatorsByPrimaryKey_KPI_ID(data[i].kpI_ID).toPromise();

        if(KeyPerformanceIndicators != undefined){
          if(KeyPerformanceIndicators.keyPerformanceIndicatorss != ""){
            temp.kpI_ID = KeyPerformanceIndicators.keyPerformanceIndicatorss[0].performance_Indicator;
          }else{
            temp.kpI_ID = "";
          }
        }else{
          temp.kpI_ID = "";
        }

        KeyPerformanceIndicators = null;
        TempKPIGoalMappingList.push(temp);
      }

      this.KPIGoalMappingList2 = TempKPIGoalMappingList;
      this.KPIGoalMappingList = data;

    }, error=>{
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });

  }

  getAllPerspectives(){
    this.serviceService.getPerspectivesLoadAll().subscribe(Perspectives=>{
      this.PerspectivesList = Perspectives.perspectivess;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  async saveKPIGoalMapping(){
    try{
      if(this.AppCode == undefined || this.DocID == undefined || this.todoID == undefined){
          var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
          this.SDP_ID = userInfo[0].organization_code;
          var message = await this.saveForm(null).toPromise();
          this.AppCode = message[0];
          this.DocID = message[1];
          this.todoID = message[2];
          this.completed.emit(message[0]);
          this.updateSaveformMethod.emit(message);
      }
      this.saveBtn2IsSelected = true;
      this.serviceService.saveKPIGoalMapping(this.KPIGoalMapping).subscribe(result =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.success('Success', 'Saved');
        this.getAllKPIGoalMapping();
        this.newKPIGoalMapping();
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

  deleteKPIGoalMapping(){
    if (this.selectedKPIGoalMappingRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn2IsSelected = true;
    this.serviceService.deleteKPIGoalMapping(this.KPIGoalMapping.kpiMapping_ID).subscribe(result =>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.getAllKPIGoalMapping();
      this.newKPIGoalMapping();
    }, error=>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public selectKPIGoalMappingTableRow(index) {
    this.selected_View_BSCIPAG_RowIndex = -1;
    this.selectedKPIGoalMappingRowIndex = index;
    this.KPIGoalMapping = new KPIGoalMapping();
    this.StrategicInnitiative = new StrategicInnitiative();
    this.KPIGoalMapping = Object.assign({},this.KPIGoalMappingList[index]);
  }

  newView_BSCIPAG(){
    this.selected_View_BSCIPAG_RowIndex = -1;
    this.selectedKPIGoalMappingRowIndex = -1;
    this.StrategicInnitiative = new StrategicInnitiative();
    this.KPIGoalMapping = new KPIGoalMapping();
    this.KPIGoalMapping.kpiMapping_ID = Guid.newGuid();
    this.getAllAnnualStrategicPlanAssignment();
    this.getAllcUnit();
    this.getDocumentDetail();
  }

  newStrategicInnitiativePopup(){
    this.newView_BSCIPAG();
    document.getElementById('new-popup').style.display='block';
  }

  getStrategicInnitiativePopup(){
    if (this.selected_View_BSCIPAG_RowIndex == -1)
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
      this.getAllViewBSCInnitiativePlanAssigmentGrid();
      this.newView_BSCIPAG();
      document.getElementById('SaveOrUpdate-popup').style.display='none';
    }, error=>{
      this.saveBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  getAllViewBSCInnitiativePlanAssigmentGrid(){
    this.serviceService.getViewBSCInnitiativePlanAssigmentGrid().subscribe(async data=>{
      this.ViewBSCInnitiativePlanAssigmentGridList = data.filter(entity => entity.responsible_Role_Name === environment.username);
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  async saveStrategicInnitiative(){
    try{
      if(this.AppCode == undefined || this.DocID == undefined || this.todoID == undefined){
          var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
          this.SDP_ID = userInfo[0].organization_code;
          var message = await this.saveForm(null).toPromise();
          this.AppCode = message[0];
          this.DocID = message[1];
          this.todoID = message[2];
          this.completed.emit(message[0]);
          this.updateSaveformMethod.emit(message);
      }
      this.newBtn1IsSelected = true;
      this.serviceService.saveStrategicInnitiative(this.StrategicInnitiative).subscribe(result =>{
        this.newBtn1IsSelected = false;
        this.notificationsService.success('Success', 'Saved');
        this.getAllViewBSCInnitiativePlanAssigmentGrid();
        this.newView_BSCIPAG();
        document.getElementById('new-popup').style.display='none';
      }, error=>{
        this.newBtn1IsSelected = false;
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error.error));
      });
    }catch(error){
      this.newBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    }
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
      this.getAllViewBSCInnitiativePlanAssigmentGrid();
      this.newView_BSCIPAG();
    }, error=>{
      this.deleteBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public selectView_BSCIPAGTableRow(index, innitiative_ID) {
    this.selected_View_BSCIPAG_RowIndex = index;
    this.StrategicInnitiative = new StrategicInnitiative();
    this.KPIGoalMapping.innitiative_ID = null;
    this.serviceService.getStrategicInnitiativeByPrimaryKey_Innitiative_ID(innitiative_ID).subscribe(data=>{
      if(data.strategicInnitiatives != ""){
        this.StrategicInnitiative = Object.assign({},data.strategicInnitiatives[0]);
        this.KPIGoalMapping.innitiative_ID = data.strategicInnitiatives[0].innitiative_ID;
      }else{
        this.selected_View_BSCIPAG_RowIndex = -1;
        this.notificationsService.error('Error', 'SomeThing Went Wrong');
      }
    },error =>{
      this.selected_View_BSCIPAG_RowIndex = -1;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  getAllKeyPerformanceIndicators(){
    this.loading = true;
    this.serviceService.getKeyPerformanceIndicatorsLoadAll().subscribe(result=>{
      this.KeyPerformanceIndicatorsList = result.keyPerformanceIndicatorss;
      this.loading = false;
    },error => {
      this.loading = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  getAllAnnualStrategicPlanAssignment(){
    this.serviceService.getAnnualStrategicPlanAssignmentLoadAll().subscribe(result=>{
      this.AnnualStrategicPlanAssignmentList = result.annualStrategicPlans;
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

  getDocumentDetail(){
    this.serviceService.getDocumentDetailLoadAll().subscribe(result=>{
      this.DocumentDetailList = result.proctblDocumentDetails;
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

  public OnSelectKeyPerformanceIndicators(){
    var temp = this.KeyPerformanceIndicatorsList.filter(entity => entity.kpI_ID === this.popupselectedKeyPerformanceIndicatorsKpIID);
    this.KPIGoalMapping.kpI_ID = temp[0].kpI_ID;
    document.getElementById('kpi-popup-input-values').style.display='none';
    this.selectedKeyPerformanceIndicatorsRowIndex = -1;
  }

  public selectKeyPerformanceIndicatorsTableRow(index, kpI_ID) {
    this.selectedKeyPerformanceIndicatorsRowIndex = index;
    this.popupselectedKeyPerformanceIndicatorsKpIID = kpI_ID;
  }

  newKeyPerformanceIndicators(){
    this.selectedKeyPerformanceIndicatorsRowIndex = -1;
  }

  OnKPIPopupCancel(){
    this.KeyPerformanceIndicatorsList = null;
    this.popupselectedKeyPerformanceIndicatorsKpIID = null;
    document.getElementById('kpi-popup-input-values').style.display='none';
  }

  onFocus(){
    document.getElementById('kpi-popup-input-values').style.display='block';
    this.getAllKeyPerformanceIndicators();
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

class KPIGoalMapping{
  public kpiMapping_ID: string;
  public kpI_ID: string;
  public innitiative_ID: string;
  public baseLine: number;
  public target: number;
  public min: number;
  public max: number;
  public value: number;
  public weight: number;
  public accomplished_Per: number;
  public varance: number;
}

class ViewBSCInnitiativePlanAssigmentGrid{
  ipA_ID: any;
  innitiative_ID: any;
  assigned_Body: any;
  assigned_Body_Name: any;
  responsible_Role: any;
  responsible_Role_Name: any;
  is_Active: any;
  applicationCode: any;
  application_NO: any;
  assigned_By: any;
  assigned_By_name: any;
  is_Owner: any;
}

class KeyPerformanceIndicators{
  public kpI_ID: string;
  public performance_Indicator: string;
  public description: string;
  public perspective_ID: string;
  public update_Interval_Weekly: boolean;
  public update_Interval_Monthly: boolean;
  public update_Interval_6Monthly: boolean;
  public group_Function: string;
  public unit: string;
  public iS_Quantitative: boolean;
  public is_Composite: boolean;
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
