import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { ServiceService } from '../service.service';
import {environment} from '../../../environments/environment';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-perspectives',
  templateUrl: './perspectives.component.html',
  styleUrls: ['./perspectives.component.css']
})
export class PerspectivesComponent implements OnInit {

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
  PerspectivesList: Perspectives[] = [];
  PerspectivesList2: Perspectives[] = [];

  public Perspectives: Perspectives;

  saveBtn1IsSelected: boolean = false;
  newBtn1IsSelected: boolean = false;
  deleteBtn1IsSelected: boolean = false;

  saveBtn2IsSelected: boolean = false;
  newBtn2IsSelected: boolean = false;
  deleteBtn2IsSelected: boolean = false;

  selectedPerspectivesRowIndex = -1;
  selectedStrategicInnitiativeRowIndex = -1;


  constructor(private serviceService: ServiceService,
              private notificationsService: NotificationsService,
              private activatedRoute: ActivatedRoute) {
    this.Perspectives = new Perspectives();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.getAllPerspectives();
      // this.Perspectives.ipA_ID = Guid.newGuid();
    });
  }

  newPerspectives(){
    this.selectedPerspectivesRowIndex = -1;
    this.Perspectives = new Perspectives();
    this.getAllPerspectives();
    // this.Perspectives.ipA_ID = Guid.newGuid();
  }

  async saveOrUpdatePerspectives(){
    this.saveBtn2IsSelected = true;
    var result = await this.serviceService.getPerspectivesByPrimaryKey_Perspectives_ID(this.Perspectives.perspective_ID).toPromise();
    if(result.perspectivess.length <= 0){
          this.savePerspectives();
          return;
    }

    if (this.selectedPerspectivesRowIndex == -1 && result.Perspectivess.length <= 0) {
      this.notificationsService.error('Error', 'Row has not selected');
      this.saveBtn2IsSelected = false;
      return;
    }

    this.serviceService.updatePerspectives(this.Perspectives).subscribe(result =>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Updated');
      this.newPerspectives();
      this.getAllPerspectives();
    }, error=>{
      this.saveBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
      this.getAllPerspectives();
      this.newPerspectives();
    });
  }


  getAllPerspectives(){
    this.serviceService.getPerspectivesLoadAll().subscribe(async data=>{
      this.PerspectivesList = data.perspectivess;
    }, error=>{
      this.notificationsService.error('Error', JSON.stringify(error.message));
      console.log('Error', JSON.stringify(error.error));
    });
  }


 async savePerspectives(){
  try{

    this.saveBtn2IsSelected = true;
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

    this.serviceService.savePerspectives(this.Perspectives).subscribe(result =>{
    this.saveBtn2IsSelected = false;
    this.notificationsService.success('Success', 'Saved');
    this.getAllPerspectives();
    this.newPerspectives();
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

  deletePerspectives(){
    if (this.selectedPerspectivesRowIndex == -1) {
      this.notificationsService.error('Error', 'Row has not selected');
      return;
    }
    if(!confirm("Are you sure to want to delete?"))
    return;
    this.deleteBtn2IsSelected = true;
    this.serviceService.deletePerspectives(this.Perspectives.perspective_ID).subscribe(result =>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.success('Success', 'Deleted');
      this.getAllPerspectives();
      this.newPerspectives();
    }, error=>{
      this.deleteBtn2IsSelected = false;
      this.notificationsService.error('Error', JSON.stringify(error.error));
      console.log('Error', JSON.stringify(error.error));
    });
  }

  public selectPerspectivesTableRow(index) {
    this.selectedStrategicInnitiativeRowIndex = -1;
    this.selectedPerspectivesRowIndex = index;
    this.Perspectives = new Perspectives();
    this.Perspectives = Object.assign({},this.PerspectivesList[index]);
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

class Perspectives {
  public perspective_ID: string;
  public perspective_Name: string;
  public iSactive: boolean;
}
