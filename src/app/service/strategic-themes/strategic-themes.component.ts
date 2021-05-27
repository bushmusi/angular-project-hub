import { Component, OnInit, HostListener, Output, Input, EventEmitter } from '@angular/core';
import { ServiceService } from '../service.service';
import { NotificationsService } from 'angular2-notifications';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-strategic-themes',
  templateUrl: './strategic-themes.component.html',
  styleUrls: ['./strategic-themes.component.css']
})
export class StrategicThemesComponent implements OnInit {
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

  CompanyStrategyList: any;
  CompanyStrategyByApplicationNumberList: any = [];
  StrategicThemesList: any;

  StrategicThemes: StrategicThemes;
  CompanyStrategy: CompanyStrategy;

  saveBtn1IsSelected: boolean = false;
  newBtn1IsSelected: boolean = false;
  deleteBtn1IsSelected: boolean = false;

  saveBtn2IsSelected: boolean = false;
  newBtn2IsSelected: boolean = false;
  deleteBtn2IsSelected: boolean = false;

  selectedStrategicThemesRowIndex = -1;
  selectedCompanyStrategyRowIndex = -1;

  is_strategicThemeID_Disable: boolean = false;


  constructor(private serviceService: ServiceService, private notificationsService: NotificationsService) {
    this.StrategicThemes = new StrategicThemes();
    this.CompanyStrategy = new CompanyStrategy();
  }

  ngOnInit() {
    this.getAllCompanyStrategy();
    this.getAllStrategicThemes();
  }

  newStrategicThemes(){
    this.selectedStrategicThemesRowIndex = -1;
    this.StrategicThemes = new StrategicThemes();
    this.is_strategicThemeID_Disable = false;
    this.newCompanyStrategy();
  }

  async saveOrUpdateStrategicThemes(){
    this.saveBtn2IsSelected = true;
    // var result = await this.serviceService.getStrategicThemesByPrimaryKey_Strategic_ThemeID(this.StrategicThemes.strategic_ThemeID).toPromise();
    // if( result.strategicThemess.length <= 0 ){
          // this.saveStrategicThemes();
          // return;
    // }

    if(this.is_strategicThemeID_Disable != true){
      if(this.selectedCompanyStrategyRowIndex != -1){
        this.saveStrategicThemes();
          return;
      }else{
        this.notificationsService.error('Error', 'Upper/Below grid row has not selected.');
        this.saveBtn2IsSelected = false;
        return;
      }
    }

    if (this.selectedStrategicThemesRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      this.saveBtn2IsSelected = false;
      return;
    }

    this.serviceService.updateStrategicThemes(this.StrategicThemes).subscribe(result =>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.getAllStrategicThemes();
      this.newStrategicThemes();
      this.newCompanyStrategy();
    }, error=>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
      this.getAllStrategicThemes();
      this.newStrategicThemes();
      this.newCompanyStrategy();
    });
  }

  getAllStrategicThemes(){
    this.serviceService.getStrategicThemesLoadAll().subscribe(StrategicThemes=>{
      this.StrategicThemesList = StrategicThemes.strategicThemess;
    }, error=>{
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  async saveStrategicThemes(){
    this.saveBtn2IsSelected = true;
    try{
      if(this.AppCode == undefined || this.DocID == undefined || this.todoID == undefined){
        // if(this.CompanyStrategyList.length > 0){
        //   this.AppCode  = this.CompanyStrategyList[0].applicationCode;
        //   this.AppNo = this.CompanyStrategyList[0].application_NO;
        //   this.DocID = this.CompanyStrategyList[0].docNo;
        //   this.SDP_ID = this.CompanyStrategyList[0].Organization_code;
        //   this.completed.emit(this.AppCode);
        //   this.updateSaveformMethod.emit([ this.AppCode, this.DocID, this.AppNo]);
        // }else{
          var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
          this.SDP_ID = userInfo[0].Organization_code;
          var message = await this.saveForm(null).toPromise();
          this.AppCode = message[0];
          this.DocID = message[1];
          this.todoID = message[2];
          this.completed.emit(message[0]);
          this.updateSaveformMethod.emit(message);
        // }
      }
      this.serviceService.saveStrategicThemes(this.StrategicThemes).subscribe(result =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.success('Success', 'Saved');
        this.getAllStrategicThemes();
        this.newStrategicThemes();
        this.newCompanyStrategy();
      }, error =>{
        this.saveBtn2IsSelected = false;
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error.error));
      });
    } catch(error){
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    }
  }

  deleteStrategicThemes(){
    if (this.selectedStrategicThemesRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn2IsSelected = true;
    this.serviceService.deleteStrategicThemes(this.StrategicThemes.strategic_ThemeID).subscribe(result =>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.getAllStrategicThemes();
      this.newStrategicThemes();
    }, error=>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public selectStrategicThemesTableRow(index) {
    this.is_strategicThemeID_Disable = true;
    this.newCompanyStrategy();
    // this.selectedCompanyStrategyRowIndex = -1;
    this.selectedStrategicThemesRowIndex = index;
    this.StrategicThemes = Object.assign({}, this.StrategicThemesList[index]);
  }

  newCompanyStrategy(){
    this.selectedCompanyStrategyRowIndex = -1;
    this.CompanyStrategy = new CompanyStrategy();
  }

  newCompanyStrategyPopup(){
    this.newCompanyStrategy();
    document.getElementById('new-popup').style.display='block';
  }

  getCompanyStrategy(){
    if (this.selectedCompanyStrategyRowIndex == -1)
    {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    document.getElementById('SaveOrUpdate-popup').style.display='block';
  }

   saveOrUpdateCompanyStrategy(){
    this.saveBtn1IsSelected = true;
    this.serviceService.updateCompanyStrategy(this.CompanyStrategy).subscribe(result =>{
      this.saveBtn1IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.getAllCompanyStrategy();
      this.newCompanyStrategy();
      document.getElementById('SaveOrUpdate-popup').style.display='none';
    }, error=>{
      this.saveBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
      document.getElementById('SaveOrUpdate-popup').style.display='none';
      this.getAllCompanyStrategy();
      this.newCompanyStrategy();
    });
  }

  getAllCompanyStrategy(){
    this.serviceService.getCompanyStrategyLoadAll().subscribe(CompanyStrategy=>{
      this.CompanyStrategyList = CompanyStrategy.companyStrategies;
      this.CompanyStrategyList = this.CompanyStrategyList.filter(entity => entity.application_NO === this.AppNo);
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  async saveCompanyStrategy(){
    this.newBtn1IsSelected = true;
    try{
      if(this.AppCode == undefined || this.DocID == undefined || this.todoID == undefined){
        if(this.CompanyStrategyList.length > 0){
          this.AppCode  = this.CompanyStrategyList[0].applicationCode;
          this.AppNo = this.CompanyStrategyList[0].application_NO;
          this.DocID = this.CompanyStrategyList[0].docNo;
          this.SDP_ID = this.CompanyStrategyList[0].Organization_code;
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
      this.CompanyStrategy.applicationCode = this.AppCode;
      this.CompanyStrategy.application_NO = this.AppNo;
      this.CompanyStrategy.docNo = this.DocID;
      this.CompanyStrategy.Organization_code = this.SDP_ID;

      this.serviceService.saveCompanyStrategy(this.CompanyStrategy).subscribe(result =>{
        this.newBtn1IsSelected = false;
        this.notificationsService.success('Success', 'Saved');
        this.getAllCompanyStrategy();
        this.newCompanyStrategy();
        document.getElementById('new-popup').style.display='none';
      }, error=>{
        this.newBtn1IsSelected = false;
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error.error));
      });
    } catch(error){
      this.newBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    }

  }

  deleteCompanyStrategy(){
    if (this.selectedCompanyStrategyRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn1IsSelected = true;
    this.serviceService.deleteCompanyStrategy(this.CompanyStrategy.strategy_NO).subscribe(result =>{
      this.deleteBtn1IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.getAllCompanyStrategy();
      this.newCompanyStrategy();
    }, error=>{
      this.deleteBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public selectCompanyStrategyTableRow(index) {
    // this.selectedStrategicThemesRowIndex = -1;
    this.selectedCompanyStrategyRowIndex = index;
    this.CompanyStrategy = Object.assign({},this.CompanyStrategyList[index]);
    this.StrategicThemes.strategy_NO = this.CompanyStrategy.strategy_NO;
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        var a= reader.result.toString().split(',');
        this.CompanyStrategy.file = a[1];
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


class StrategicThemes {
  public strategic_ThemeID: string;
  public strategy_NO: string;
  public strategic_Theme: string;
  public strategic_Result: string;
  public strategic_Theme_Description: string;
  public log : string  ;
}

class CompanyStrategy {
  public strategy_NO: string;
  public Organization_code: string;
  public title: string;
  public version: string;
  public vision: string;
  public mission: string;
  public values: string;
  public file: string = '';
  public start_Year: number;
  public end_Year: number;
  public applicationCode: string;
  public application_NO: string;
  public docNo: string;
  public log: string;
}
