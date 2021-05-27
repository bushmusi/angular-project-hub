import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import { ActivatedRoute, Params } from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-asp-with-perspective-goal',
  templateUrl: './asp-with-perspective-goal.component.html',
  styleUrls: ['./asp-with-perspective-goal.component.css']
})
export class ASPWithPerspectiveGoalComponent implements OnInit {
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


  StrategicThemesList: any;
  AnnualStrategyGoalsList: any;
  AnnualStrategyGoalsWithPerspectiveGoalsList: any;

  public AnnualStrategyGoalsWithPerspectiveGoals: AnnualStrategyGoalsWithPerspectiveGoals;
  AnnualStrategyGoals: AnnualStrategyGoals;

  PerspectivesList: any;
  AnnualStrategyGoalsSelectList: any;
  SelectedPerspectives: Perspectives;

  saveBtn1IsSelected: boolean = false;
  newBtn1IsSelected: boolean = false;
  deleteBtn1IsSelected: boolean = false;

  saveBtn2IsSelected: boolean = false;
  newBtn2IsSelected: boolean = false;
  deleteBtn2IsSelected: boolean = false;

  selectedAnnualStrategyGoalsWithPerspectiveGoalsRowIndex = -1;
  selectedAnnualStrategyGoalsRowIndex = -1;
  selectedStrategicThemesRowIndex = -1;

  loading: boolean = true;

  constructor(private serviceService: ServiceService,
              private notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute) {
    this.AnnualStrategyGoalsWithPerspectiveGoals = new AnnualStrategyGoalsWithPerspectiveGoals();
    this.AnnualStrategyGoals = new AnnualStrategyGoals();
    this.SelectedPerspectives = new Perspectives();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getAnnualStrategyGoalsBy_ApplicationNumber();
      this.getAllAnnualStrategyGoalsWithPerspectiveGoals();
      this.getAllPerspectives();
      this.getAllStrategicThemes();
      this.getAllAnnualStrategyGoals();
      this.AnnualStrategyGoalsWithPerspectiveGoals.perspectiveGoal_ID = Guid.newGuid();
      // this.newAnnualStrategyGoalsPopup();
      // this.onFocus();
    });
  }

  newAnnualStrategyGoalsWithPerspectiveGoals(){
    this.selectedAnnualStrategyGoalsWithPerspectiveGoalsRowIndex = -1;
    this.selectedAnnualStrategyGoalsRowIndex = -1;
    this.AnnualStrategyGoalsWithPerspectiveGoals = new AnnualStrategyGoalsWithPerspectiveGoals();
    this.getAllPerspectives();
    // this.getAllAnnualStrategyGoals();
    this.AnnualStrategyGoalsWithPerspectiveGoals.perspectiveGoal_ID = Guid.newGuid();
  }

  async saveOrUpdateAnnualStrategyGoalsWithPerspectiveGoals(){
    this.saveBtn2IsSelected = true;

    if(this.selectedAnnualStrategyGoalsWithPerspectiveGoalsRowIndex == -1){
          this.saveAnnualStrategyGoalsWithPerspectiveGoals();
          return;
    }

    // var result = await (await this.serviceService.getAnnualStrategyGoalsWithPerspectiveGoalsByPrimaryKey_perspectiveGoal_ID(this.AnnualStrategyGoalsWithPerspectiveGoals.perspectiveGoal_ID)).toPromise();
    // if(result.annualStrategicGoalsWithPerspective.length <= 0){
    //       this.saveAnnualStrategyGoalsWithPerspectiveGoals();
    //       return;
    // }

    // if (this.selectedAnnualStrategyGoalsWithPerspectiveGoalsRowIndex == -1) {
    //   this.notificationsService.error('Error', 'Row has not selected');
    //   this.saveBtn2IsSelected = false;
    //   return;
    // }

    this.serviceService.updateAnnualStrategyGoalsWithPerspectiveGoals(this.AnnualStrategyGoalsWithPerspectiveGoals).subscribe(result =>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.newAnnualStrategyGoalsWithPerspectiveGoals();
      this.getAllAnnualStrategyGoalsWithPerspectiveGoals();
    }, error=>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
      this.getAllAnnualStrategyGoalsWithPerspectiveGoals();
      this.newAnnualStrategyGoalsWithPerspectiveGoals();
    });
  }


  getAllAnnualStrategyGoalsWithPerspectiveGoals(){
    this.serviceService.getAnnualStrategyGoalsWithPerspectiveGoalsLoadAll().subscribe(async data=>{
      var data = data.annualStrategicGoalsWithPerspective;
      var dataList :AnnualStrategyGoalsWithPerspectiveGoals[] = [];
      for(var i = 1; i < data.length; i++){
        var perspective_ID = data[i].perspective_ID;
        var Perspectives = await (await this.serviceService.getPerspectivesByPrimaryKey_Perspectives_ID(perspective_ID)).toPromise();
        var temp : AnnualStrategyGoalsWithPerspectiveGoals = new AnnualStrategyGoalsWithPerspectiveGoals();
        if(Perspectives['perspectivess'].length > 0){
          temp.annual_Strategic_GoalID = data[i].annual_Strategic_GoalID;
          temp.perspective_ID = data[i].perspective_ID;
          temp.perspective_Name = Perspectives['perspectivess'][0].perspective_Name;
          temp.perspectiveGoal_ID = data[i].perspectiveGoal_ID;
          temp.perspective_Value_IN_Per = data[i].perspective_Value_IN_Per;
        }else{
          temp.annual_Strategic_GoalID = data[i].annual_Strategic_GoalID;
          temp.perspective_ID = data[i].perspective_ID;
          temp.perspective_Name = "";
          temp.perspectiveGoal_ID = data[i].perspectiveGoal_ID;
          temp.perspective_Value_IN_Per = data[i].perspective_Value_IN_Per;
        }
        dataList.push(temp);

      }
      this.AnnualStrategyGoalsWithPerspectiveGoalsList = dataList;
      this.loading = false;
    }, error=>{
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
      this.loading = false;
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

  saveAnnualStrategyGoalsWithPerspectiveGoals(){
    this.saveBtn2IsSelected = true;

    if (this.selectedAnnualStrategyGoalsRowIndex == -1) {
      this.notificationsService.error('Error', 'Upper/Below grid row has not selected.');
      this.saveBtn2IsSelected = false;
      return;
    }

    this.serviceService.saveAnnualStrategyGoalsWithPerspectiveGoals(this.AnnualStrategyGoalsWithPerspectiveGoals).subscribe(result =>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Saved');
      this.getAllAnnualStrategyGoalsWithPerspectiveGoals();
      this.newAnnualStrategyGoalsWithPerspectiveGoals();
    }, error =>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  deleteAnnualStrategyGoalsWithPerspectiveGoals(){
    if (this.selectedAnnualStrategyGoalsWithPerspectiveGoalsRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn2IsSelected = true;
    this.serviceService.deleteAnnualStrategyGoalsWithPerspectiveGoals(this.AnnualStrategyGoalsWithPerspectiveGoals.perspectiveGoal_ID).subscribe(result =>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.getAllAnnualStrategyGoalsWithPerspectiveGoals();
      this.newAnnualStrategyGoalsWithPerspectiveGoals();
    }, error=>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public selectAnnualStrategyGoalsWithPerspectiveGoalsTableRow(index, perspectiveGoal_ID) {
    this.selectedAnnualStrategyGoalsRowIndex = -1;
    this.selectedAnnualStrategyGoalsWithPerspectiveGoalsRowIndex = index;
    // this.AnnualStrategyGoalsWithPerspectiveGoals = Object.assign({}, this.AnnualStrategyGoalsWithPerspectiveGoalsList[index]);

    var temp = this.AnnualStrategyGoalsWithPerspectiveGoalsList.filter(entity => entity.perspectiveGoal_ID === perspectiveGoal_ID);
    this.AnnualStrategyGoalsWithPerspectiveGoals = Object.assign({},temp[0]);
    // this.serviceService.getAnnualStrategyGoalsWithPerspectiveGoalsByPrimaryKey_perspectiveGoal_ID(perspectiveGoal_ID).subscribe(data=>{
    //   this.AnnualStrategyGoalsWithPerspectiveGoals = data.annualStrategicGoalsWithPerspective[0];
    // }, error=>{
    //
      // this.notificationsService.error('Error', JSON.stringify(error.error));
      // console.log('Error', JSON.stringify(error.error));
    // });
  }

  public selectStrategicThemesTableRow(index) {
    // this.selectedStrategicThemesRowIndex = -1;
    this.selectedStrategicThemesRowIndex = index;
    this.AnnualStrategyGoals.strategic_ThemeID =  this.StrategicThemesList[index].strategic_ThemeID;
    setTimeout(function(){
      document.getElementById('popup-input-values').style.display='none';
      document.getElementById('popup-input-values2').style.display='none';
      this.selectedStrategicThemesRowIndex = -1;

      // var temp = Object.assign({},this.StrategicThemesList);
      // this.StrategicThemesList = null;
      // console.log(this.StrategicThemesList )
      // // this.StrategicThemesList = temp;
      }, 500);
    // this.serviceService.getAnnualStrategyGoalsWithPerspectiveGoalsByPrimaryKey_perspectiveGoal_ID(perspectiveGoal_ID).subscribe(data=>{
    //   this.AnnualStrategyGoalsWithPerspectiveGoals = data.annualStrategicGoalsWithPerspective[0];
    // }, error=>{
    // //
    //   this.notificationsService.error('Error', JSON.stringify(error.error));
    //   console.log('Error', JSON.stringify(error.error));
    // });
  }

  // onannualStrategicGoalIDOptionsSelected(value:string){
  //   this.AnnualStrategyGoalsWithPerspectiveGoals.annual_Strategic_GoalID = value;
  // }
  // onperspectiveIDOptionsSelected(value:string){
  //   this.AnnualStrategyGoalsWithPerspectiveGoals.perspective_ID = value;
  // }

  newAnnualStrategyGoals(){
    this.selectedAnnualStrategyGoalsRowIndex = -1;
    this.AnnualStrategyGoals = new AnnualStrategyGoals();
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
      this.getAnnualStrategyGoalsBy_ApplicationNumber();
      this.newAnnualStrategyGoals();
      document.getElementById('SaveOrUpdate-popup').style.display='none';
    }, error=>{
      this.saveBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
      document.getElementById('SaveOrUpdate-popup').style.display='none';
      this.getAnnualStrategyGoalsBy_ApplicationNumber();
      this.newAnnualStrategyGoals();
    });
  }

  getAnnualStrategyGoalsBy_ApplicationNumber(){
    this.serviceService.getAnnualStrategyGoalsBy_ApplicationNumber(this.AppNo).subscribe(AnnualStrategyGoals=>{
      this.AnnualStrategyGoalsList = AnnualStrategyGoals.annualStrategicGoals;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  getAllAnnualStrategyGoals(){
    this.serviceService.getAnnualStrategyGoalsLoadAll().subscribe(AnnualStrategyGoals=>{
      this.AnnualStrategyGoalsSelectList = AnnualStrategyGoals.annualStrategicGoals;
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
        this.getAnnualStrategyGoalsBy_ApplicationNumber();
        this.newAnnualStrategyGoals();
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
      this.getAnnualStrategyGoalsBy_ApplicationNumber();
      this.newAnnualStrategyGoals();
    }, error=>{
      this.deleteBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public selectAnnualStrategyGoalsTableRow(index) {
    // this.selectedAnnualStrategyGoalsWithPerspectiveGoalsRowIndex = -1;
    this.selectedAnnualStrategyGoalsRowIndex = index;
    this.AnnualStrategyGoals =  Object.assign({},this.AnnualStrategyGoalsList[index]);
    this.AnnualStrategyGoalsWithPerspectiveGoals.annual_Strategic_GoalID =
    this.AnnualStrategyGoals.annual_Strategic_GoalID;
  }

  getAllStrategicThemes(){
    this.serviceService.getStrategicThemesLoadAll().subscribe(data=>{
      this.StrategicThemesList = data.strategicThemess;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  onFocus(){
    document.getElementById('popup-input-values').style.display='block';

  }
  onFocus2(){
    document.getElementById('popup-input-values2').style.display='block';

  }

  onBlur(){
    // console.log("Dddd")
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


class AnnualStrategyGoalsWithPerspectiveGoals_withPerspective  {
  public perspectiveGoal_ID: string;
  public perspective_ID: string;
  public annual_Strategic_GoalID: string;
  public perspective_Value_IN_Per: number;
}

class AnnualStrategyGoalsWithPerspectiveGoals{
  public perspectiveGoal_ID: string;
  public perspective_ID: string;
  public perspective_Name: string;
  public annual_Strategic_GoalID: string;
  public perspective_Value_IN_Per: number;
}

class AnnualStrategyGoals {
  public annual_Strategic_GoalID: string;
  public strategic_ThemeID: string;
  public created_Date: Date;
  public year: number;
  public result_In_Per: number;
  public applicationCode: string;
  public application_NO: string;
  public docNo: string;
  public log: string;
  public isActive: boolean;
}

class Perspectives {
  public Perspective_ID: string;
  public Perspective_Name: string;
  public ISactive: boolean;
}

class StrategicThemes{
  strategic_ThemeID: string;
  strategy_NO: string;
  strategic_Theme: string;
  strategic_Result: string;
  strategic_Theme_Description: string;
  log: string;
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
