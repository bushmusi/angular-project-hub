import { Component, Input, OnInit, Output , EventEmitter} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-key-performance-indicator',
  templateUrl: './key-performance-indicator.component.html',
  styleUrls: ['./key-performance-indicator.component.css']
})
export class KeyPerformanceIndicatorComponent implements OnInit {

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

  KeyPerformanceIndicatorsList: KeyPerformanceIndicators[] = [];
  KeyPerformanceIndicatorsList2: KeyPerformanceIndicators[] = [];

  public KeyPerformanceIndicators: KeyPerformanceIndicators;

  cUnitList: any;
  PerspectivesList: any;

  saveBtn1IsSelected: boolean = false;
  newBtn1IsSelected: boolean = false;
  deleteBtn1IsSelected: boolean = false;

  saveBtn2IsSelected: boolean = false;
  newBtn2IsSelected: boolean = false;
  deleteBtn2IsSelected: boolean = false;

  selectedKeyPerformanceIndicatorsRowIndex = -1;

  constructor(private serviceService: ServiceService,
              private notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute) {
    this.KeyPerformanceIndicators = new KeyPerformanceIndicators();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getAllKeyPerformanceIndicators();
      this.getAllcUnit();
      this.getAllPerspectives();
      this.KeyPerformanceIndicators.kpI_ID = Guid.newGuid();
    });
  }

  newKeyPerformanceIndicators(){
    this.selectedKeyPerformanceIndicatorsRowIndex = -1;
    this.KeyPerformanceIndicators = new KeyPerformanceIndicators();
    this.getAllcUnit();
    this.getAllPerspectives();
    this.KeyPerformanceIndicators.kpI_ID = Guid.newGuid();
  }

  async saveOrUpdateKeyPerformanceIndicators(){
    this.saveBtn2IsSelected = true;
    var result = await this.serviceService.getKeyPerformanceIndicatorsByPrimaryKey_KPI_ID(this.KeyPerformanceIndicators.kpI_ID).toPromise();
    if(result.keyPerformanceIndicatorss.length <= 0){
          this.saveKeyPerformanceIndicators();
          return;
    }

    if (this.selectedKeyPerformanceIndicatorsRowIndex == -1 && result.keyPerformanceIndicatorss.length <= 0) {
      this.notificationsService.error('Error', 'Row has not selected');
      this.saveBtn2IsSelected = false;
      return;
    }

    this.serviceService.updateKeyPerformanceIndicators(this.KeyPerformanceIndicators).subscribe(result =>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.newKeyPerformanceIndicators();
      this.getAllKeyPerformanceIndicators();
    }, error=>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }


  getAllKeyPerformanceIndicators(){
    this.serviceService.getKeyPerformanceIndicatorsLoadAll().subscribe(async data=>{

      // this.KeyPerformanceIndicatorsList2 = [];
      // this.KeyPerformanceIndicatorsList = [];

      data = data.keyPerformanceIndicatorss;
      var TempKeyPerformanceIndicatorsList: KeyPerformanceIndicators[] = [];

      var temp : KeyPerformanceIndicators;
      for( var i = 0; i < data.length; i++ ){
        temp = Object.assign({},data[i]);
        var Perspectives;


      if(data[i].perspective_ID != undefined)
      Perspectives = await this.serviceService.getPerspectivesByPrimaryKey_Perspectives_ID(data[i].perspective_ID).toPromise();

      if(Perspectives != undefined){
        if(Perspectives.perspectivess.length > 0){
          temp.perspective_ID = Perspectives.perspectivess[0].perspective_Name;
        }else{
          temp.perspective_ID = "";
        }
      }else{
        temp.perspective_ID = "";
      }

      Perspectives = null;

      TempKeyPerformanceIndicatorsList.push(temp);
    }

    this.KeyPerformanceIndicatorsList2 = TempKeyPerformanceIndicatorsList;
    this.KeyPerformanceIndicatorsList = data;


    });
  }


 async saveKeyPerformanceIndicators(){
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
      this.serviceService.saveKeyPerformanceIndicators(this.KeyPerformanceIndicators).subscribe(result =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.success('Success', 'Saved');
        this.getAllKeyPerformanceIndicators();
        this.newKeyPerformanceIndicators();
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

  deleteKeyPerformanceIndicators(){
    if (this.selectedKeyPerformanceIndicatorsRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn2IsSelected = true;
    this.serviceService.deleteKeyPerformanceIndicators(this.KeyPerformanceIndicators.kpI_ID).subscribe(result =>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.getAllKeyPerformanceIndicators();
      this.newKeyPerformanceIndicators();
    }, error=>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
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

  getAllPerspectives(){
    this.serviceService.getPerspectivesLoadAll().subscribe(Perspectives=>{
      this.PerspectivesList = Perspectives.perspectivess;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  public selectKeyPerformanceIndicatorsTableRow(index) {
    this.selectedKeyPerformanceIndicatorsRowIndex = index;
    this.KeyPerformanceIndicators = new KeyPerformanceIndicators();
    this.KeyPerformanceIndicators = Object.assign({},this.KeyPerformanceIndicatorsList[index]);
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

class KeyPerformanceIndicators {
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
