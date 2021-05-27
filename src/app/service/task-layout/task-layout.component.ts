import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TaskService } from '../../task/task.service';
import {Mytask} from '../../task/task'
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Survey from 'survey-angular';
import {ServiceService} from '../service.service'
import {NotificationsService} from 'angular2-notifications';
import {environment} from 'src/environments/environment';



@Component({
  selector: 'app-task-layout',
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.scss']
})
export class TaskLayoutComponent implements OnInit {

  json
  FormData
  id
  _opened = false;
  RequerdDocs;
  preAppID;
  AppNo;
  licenceService;
  public ID = 0;
  loading = true;
  licenceData
  disablefins = true;
  Licence_Service_ID;
  tskID;
  SDP_ID;
  Service_ID
  DocID;
  todoID;
  AppN;
  PriveLicence
  AppNoList
  ifAppNo=false
  PriveAppNoList

  constructor(private taskService : TaskService, private activatedRoute : ActivatedRoute, private serviceService : ServiceService, private router: Router, private notificationsService: NotificationsService) { }

  ngOnInit(): void {

   this.activatedRoute.params.subscribe( (params: Params) =>

   {
    
     const id = params['appCode']
     let formcode = params['formcode']
     this.Service_ID = params['service_Code'];
     this.tskID = params['tskId']
     this.DocID = params['docId'] 
     this.AppNo = params['appCode'];
     this.todoID = params['toDoId']
     
     this.getAll(this.AppNo);
     switch(formcode)
      {
        case "6de7ae19-5e1a-450c-83a4-3511c448d3d6" :
          this.id = 1;
          break;
        
        case  "cc337279-697c-420d-a46e-8fdf5df13fdc" :
          this.id = 2;
          break;  

        case  "2ea50f68-0ea0-416f-ab89-cd4a04a65705" :
          this.id = 3;
          break;     

        case  "2ea50f68-0ea0-416f-ab89-cd4a04a65707" :
          this.id = 4;
          break;     
  
        case  "5b506707-c4fc-4e4d-81c9-348c5da3d476" :
          this.id = 5;
          break; 

        default:
          this.displayFormData(formcode)
          this.id = 6
        

      }

      this.getFormData(params['docId'])
   
   })
  
  

  }
  
 
  displayFormData(formcode : string)
  {
    
     console.log("display form data formcode::"+formcode);
     
     this.taskService.getFormData(formcode).subscribe( (data:any) =>
       {
        this.json = data
        console.log("json::"+this.json)

       }
     )

    

  }

  _toggleOpened(): void {
    this._opened = !this._opened;
  }


  upload(event, RequiredDoc) {
    const File = event.files[0];
    let base64file;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener('loadend', (e) => {
      base64file = reader.result;
      this.serviceService.saveFile(base64file, File.type, this.AppNo, RequiredDoc.requirement_code,
        'tasktype', RequiredDoc.description_en).subscribe(message => {
        // console.log('message', message);
      }, error => {
        console.log('error');
      });
    });
  }


  Close() {
    this.router.navigate(['/task/MyTask']);
  }


  getFormData(DocID) {
    this.serviceService.GetForm(DocID).subscribe(FormData => {
      this.FormData = FormData;

      this.FormData = JSON.parse(this.FormData);
      // this.FormData = (Object.assign({}, this.FormData));
      // console.log('FormData', FormData);
    }, error => {
      console.log('error');
    });

  }
  

  public getAll(AppNo) {
    console.log("layout service getall called appNo:"+AppNo);
    
    this.serviceService.getAll(AppNo).subscribe(licenceService => {
      this.licenceService = licenceService;
      console.log('Licence Service', this.licenceService);
      this.licenceData = this.licenceService.list[0];
      this.SDP_ID = this.licenceData.SDP_ID;
      this.Service_ID = this.licenceData.Service_ID;
      this.Licence_Service_ID = this.licenceData.Licence_Service_ID;


      if (this.licenceData.Certificate_Code > 0) {
        this.getPriveysLicence();
      }

      if (this.ID == 2) {
        this.disablefins = false;
        // this.getPlotManagement();
      } else if (this.ID == 3) {
        this.disablefins = false;
        // this.getPlotManagement();
      } else if (this.ID == 4) {
        this.disablefins = false;
        // this.getDeed();
      }
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }

  
  getPriveysLicence() { 
    this.AppN = null;
    this.serviceService.getPriveys(this.licenceData.Certificate_Code).subscribe(PriveLicence => {
      this.PriveLicence = PriveLicence;
      this.PriveLicence = (Object.assign([], this.PriveLicence.list));
      this.AppNoList = [];
      for (let i = 0; i < this.PriveLicence.length; i++) {
        this.AppNoList[i] = {};
        this.AppNoList[i].Application_No = this.PriveLicence[i].Application_No;

      }


      this.PriveAppNoList = (Object.assign([], this.AppNo));
      // console.log('this.AppNoList', this.AppNoList);
      // console.log('PriveLicence', PriveLicence);
      this.ifAppNo = true;
    }, error => {
      console.log('error');
    });
  }



  async saveForm(formData) {
    console.log('am called bro::', formData);

    if(this.Licence_Service_ID == undefined){
      this.Licence_Service_ID = '00000000-0000-0000-0000-000000000000';
      this.DocID = '00000000-0000-0000-0000-000000000000';
      this.todoID = '00000000-0000-0000-0000-000000000000';
      this.Service_ID = this.AppNo;
    }

    var userInfo = await this.serviceService.getUserWorkInfo().toPromise();
    this.SDP_ID = userInfo[0].organization_code;


    this.serviceService.saveForm(
      this.Licence_Service_ID, 
      this.Service_ID, 
      this.tskID, 
      this.SDP_ID, 
      JSON.stringify(formData), 
      this.DocID, 
      this.todoID
      ).subscribe(message => {

      this.disablefins = false;
      this.AppNo = message[0];
      this.DocID = message[1];
      this.todoID = message[2];
      const toast = this.notificationsService.success('Sucess', 'Saved');
    }, error => {
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
  }
  
}
  