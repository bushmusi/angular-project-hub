import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import {environment} from '../../../environments/environment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-data-collection',
  templateUrl: './data-collection.component.html',
  styleUrls: ['./data-collection.component.css']
})
export class DataCollectionComponent implements OnInit {

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

  BacDataCollectionTransactionList: any;
  BSCValuesList: BSCValues[] = [];

  saveBtn1IsSelected: boolean = false;

  saveBtn2IsSelected: boolean = false;
  newBtn2IsSelected: boolean = false;
  deleteBtn2IsSelected: boolean = false;

  selectedBSCValuesRowIndex = -1;


  constructor(private serviceService: ServiceService,
              private notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getAllBSCValues();
      this.getAllBacDataCollectionTransaction();
      // this.BSCValues.ipA_ID = Guid.newGuid();
    });
  }

  getAllBSCValues(){
    this.serviceService.getBSCValuesLoadAll().subscribe(data=>{
      this.BSCValuesList = data.procBSCValuess;
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
  }

  getAllBacDataCollectionTransaction(){
    this.serviceService.getBacDataCollectionTransactionLoadAll().subscribe(data=>{
      var temp = data.procBacDataCollectionTransactions;
      this.BacDataCollectionTransactionList = temp.filter(entity => entity.application_NO === this.AppNo);
    },error => {
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error));
    });
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



 async UpdateBSCValues(data){
   try{
      var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
      data.user_ID =  userInfo[0].userId;
      data.user_Name =  userInfo[0].userName;
      data.update_Date = formatDate(new Date(), 'yyyy/MM/dd hh:mm a', 'en');
      await this.serviceService.updateBSCValues(data).subscribe(result =>{
        console.log("updated");
      }, error=>{
        this.saveBtn1IsSelected = false;
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error.error));
        this.BSCValuesList[this.id][this.property] = this.temp;
      });
    }catch(error){
      this.saveBtn1IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
      this.BSCValuesList[this.id][this.property] = this.temp;
    }

  }

  temp;
  id;
  property;
  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.property =property;
    this.id = id;
    this.temp = this.BSCValuesList[id][property];
    this.BSCValuesList[id][property]  =  editField;
    this.UpdateBSCValues(this.BSCValuesList[id]);
  }

  remove(id: any) {
    this.serviceService.deleteBSCValues(this.BSCValuesList[id].bsC_Value_ID).subscribe(result =>{
      this.notificationsService.success('Success', 'Deleted');
      this.getAllBSCValues();
    }, error=>{
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

 async  add() {

  try{
    this.newBtn2IsSelected = true;
    var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
    var bscValue : BSCValues = new BSCValues();
    bscValue.bsC_Value_ID = Guid.newGuid();
    bscValue.user_ID =  userInfo[0].userId;
    bscValue.user_Name =  userInfo[0].userName;
    bscValue.created_Date = formatDate(new Date(), 'yyyy/MM/dd hh:mm a', 'en');
    bscValue.update_Date = formatDate(new Date(), 'yyyy/MM/dd hh:mm a', 'en');
    this.serviceService.saveBSCValues(bscValue).subscribe(data =>{
      this.serviceService.getBSCValuesByPrimaryKey_BSCValueID(bscValue.bsC_Value_ID).subscribe(data =>{
        data = data.procBSCValuess[0];
        this.BSCValuesList.push(data);
        this.newBtn2IsSelected = false;
      }, error=>{
        this.notificationsService.error('Error', JSON.stringify(error.error));
        console.log('Error', JSON.stringify(error.error));
        this.newBtn2IsSelected = false;
      });
    }, error=>{
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
      this.newBtn2IsSelected = false;
    });
  }catch(error){
    this.notificationsService.error('Error', JSON.stringify(error.message));
    console.log('Error', JSON.stringify(error.error));
    this.newBtn2IsSelected = false;
  }

  }


  editField
  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}

class BSCValues {
   public bsC_Value_ID: string;
   public bsC_Tran_ID: string;
   public kpiMapping_ID: string = "cbda8698-4a14-415a-8bbd-000acceca030";
   public kpI_ID: string;
   public performance_Indicator: string = "";
   public period: string = "";
   public start_Date: Date;
   public end_Date: Date;
   public unit: string;
   public value: number;
   public remark: string;
   public user_Name: string;
   public user_ID: string;
   public created_Date: any;
   public update_Date: any
}

class BacDataCollectionTransaction{
  public bsC_Tran_ID: string;
  public innitiative_ID: string;
  public strategic_Goal: string;
  public unit: string;
  public value: number;
  public applicationCode: string;
  public application_NO: string;
  public docNo: string;
  public created_Date: Date;
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

