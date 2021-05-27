import { Component, OnInit, EventEmitter, Input, Output , TemplateRef  } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {ServiceService} from './service.service';
import {TaskService} from '../task/task.service';
import {environment} from '../../environments/environment';
import { NotificationService } from '../notification.service';  //toaster
import { LayoutService } from './task-layout/layout.service'
// Below are for action footer
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

  

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  public data: any;
  @Input() MyAppNo;
  @Input() Service_Name;
  json

  _opened = false;
  public ID = 0;
  RequerdDocs;
  preAppID;

  AppNo;
  licenceData: any;
  //getData
  guidUserId: any;
  isPending: boolean;
  status: any;
  taskruleid: any; 
  username: any;
  ifAppNo = false;
  AppN;
  PriveLicence;
  AppNoList;
  PriveAppNoList;
  PreAppData;
  ifTask = false;
  TaskN;
  PreTaskData;
  selectedpreTask;
  selectedTask;
  ifTaskDetail = false;

  
  formcode;
  licenceService;
  Licence_Service_ID;
  Service_ID;
  SDP_ID;
  tskTyp;
  disablefins = true;
  loading = true;
  DocID;
  todoID;
  tskID;
  DropDownList;
  FormData;
  modalRef: BsModalRef;

  public workingUser: {
    organization_code: "00000000-0000-0000-0000-000000000000"
  };


  constructor(
    private modalService: BsModalService,
    private activatedRoute : ActivatedRoute, 
    private serviceService : ServiceService, 
    private layoutService: LayoutService,
    private router: Router, 
    private notifyService : NotificationService, //toast
    private taskService : TaskService) { 

    }

  ngOnInit(): void {
    console.log("from serc")
    
    
    this.activatedRoute.params.subscribe((params: Params) => {
      
      this.AppNo = params["AppNo"];

      this.tskID = params["TaskCode"];
      this.getRequiredDocs()

      if (this.tskTyp == "c800fb16-f961-e111-95d6-00e04c05559b") {
        this.getTaskRule(params["TaskCode"]);
      } 

      this.DocID = params["docId"];
      console.log("current docid: ",this.DocID);
      

      this.getFormData(params["docId"]);

      this.todoID = params["todoID"];

      this.formcode = params["Form_Code"];
      //this.AppNo, this.DocID, this.todoID,ruleid)

      this.dispalyForms();

      this.MyAppNo = '';

      this.Service_Name = '';

      
      this.isPending = false;

      this.guidUserId = '1895cf5b-c1aa-42e2-8630-ad4ca9b3d10f';

      this.getUserWorkInfo();

      this.AppNo = params["AppNo"];
      this.getAll(this.AppNo);
    });
  }



  //Let we say working info
  getUserWorkInfo() {
    this.serviceService
      .getUserWorkInfo()
      .subscribe(
        (response) => {
          this.workingUser = response[0];
          console.log("user-info-response", this.workingUser);
        },
        (error) => {
          console.log("user-info-error", error);
        }
      );
  }

  //Task rule
  getTaskRule(tasksId) {
    this.serviceService.getTaskRule(tasksId).subscribe(
      (DropDownList) => {
        this.DropDownList = DropDownList;
        this.DropDownList = Object.assign([], this.DropDownList);
        // console.log('DropDownList', DropDownList);
      },
      (error) => {
        console.log("error");
      }
    );
  }

// Below code is for submit action button
  public SubmitDocArchive(ruleid){
    
    this.serviceService.SubmitDocArchive(this.AppNo, this.DocID, this.todoID,ruleid)
    .subscribe(
      (message) => {
        this.disablefins = true;
        console.log('message', message);
        console.log('Success',"Success from action footer");
        this.Close();
      },
      (error) => {
        console.log('error', error);
        this.notifyService.showError(error.error['Message'],"Error")
        
      }
    );
  }
  
  //second option for submit AR
  SubmitAR(ruleid) {
    
    this.serviceService
      .SubmitAR(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message) => {
          console.log('message',message);
          this.disablefins = true;
          console.log('Success',"Success from action footer");
          this.Close();
          
        },
        (error) => {
          console.log('Error',error);
          
        }
      );
  }

  // By document archive
  public getAll(AppNo) {
    console.log('My App No from getall: ', AppNo);
    this.serviceService.getAll(AppNo).subscribe(
      (licenceService) => {
        console.log("get-all-response", licenceService);
        // this.MyAppNo = AppNo;
        this.licenceService = licenceService;
        this.licenceData = this.licenceService.list[0];
        if (this.licenceData) {
          console.log("Licence data1 from server", this.licenceData);
          this.MyAppNo = this.licenceData.Application_No;
          this.Licence_Service_ID = this.licenceData.Licence_Service_ID;
          this.Service_ID = this.licenceData.Service_ID;
          this.SDP_ID = this.licenceData.SDP_ID;
          this.Service_Name = this.licenceData.Service_Name;
          console.log('Task Code: A'+this.Service_ID+'Z');

          if (this.licenceData.Certificate_Code > 0) {
            this.getPriveysLicence();
          }
          
        } else {
          console.log("Licence data1 local", this.licenceData);
          this.Licence_Service_ID = "95664a26-d518-4854-a3b9-53df2cf1aa9c";
          this.Service_ID = "81f8770b-2c1e-4255-8be1-341089703fa1";
          this.SDP_ID = "89eb1aec-c875-4a08-aaf6-2c36c0864979";
        }
     
        this.loading = false;
      },
      (error) => {
        console.log("get-all-error" + error);
      }
    );
  }
  // bushra 
  saveDataCompleted(response) {
    this.disablefins = false;
    this.AppNo = response[0];
    this.DocID = response[1];
    this.todoID = response[2];
    this.getAll(this.AppNo);
  }

   
  dispalyForms()
  {
    
    
    this.activatedRoute.params.subscribe( (params: Params) =>

    {
      let formcode = params['Form_Code'].toLowerCase()
      
      switch(formcode)
      {
        case "1ef26e12-00c6-466c-8e12-0217f940c167" :
          console.log("In case check");
          // Document transaction
          this.ID = 1;
          break;  
        
        case  "1ef26e12-00c6-466c-8e12-0217f940c464" : 
          // Archive Type
          this.disablefins = false
          this.ID = 2;
          break;  

        default:
          this.tskID = params["TaskCode"];
          console.log("current task id:",this.tskID);
          this.layoutService.getFormData(params["Form_Code"]).subscribe(
            (data) => {
              console.log('formddd:',this.formcode);
              this.ID = 3;
            },
            (error) => {
              console.log("error-form", error);
              this.disablefins = false;
              this.ID = 4;
            }
          );
        
      }
      
    })
  }

   getFormData(DocId)
  {
    
    console.log("form Doc ID: ",DocId);
     this.serviceService.GetForm(DocId).subscribe(
      (FormData) => {

        this.json = FormData;
        this.FormData = FormData;
        this.FormData = JSON.parse(this.FormData);
        // this.FormData = (Object.assign({}, this.FormData));
        // console.log('FormData', FormData);
      },
      (error) => {
        console.log("error");
      }
    );

    

  }


  saveForm(formData) {
    
    if(this.DocID == "null"){
      console.log('Doc ID: A'+this.DocID+'z')  
      this.DocID = "00000000-0000-0000-0000-000000000000"
    }
    if(this.DocID == null){
      console.log('Doc ID: A'+this.DocID+'z')  
      this.DocID = "00000000-0000-0000-0000-000000000000"
    }
    this.serviceService
      .saveForm(
        this.licenceData ? this.licenceData.Licence_Service_ID : "00000000-0000-0000-0000-000000000000",
        this.Service_ID,
        this.tskID,
        this.workingUser.organization_code,
        environment.username,
        JSON.stringify(formData),
        // this.DocID || "00000000-0000-0000-0000-000000000000", 
        this.DocID ,
        this.todoID || "00000000-0000-0000-0000-000000000000"
      )
      .subscribe(
        (response) => {
          console.log("save-from-response", response);
          console.log("Success fully from save form");
          
          this.disablefins = false;
          this.AppNo = response[0];
          this.DocID = response[1];
          this.todoID = response[2];
          console.log('from saveform calling getall() method');
          this.getAll(this.AppNo);
          this.notifyService.showInfo("Success","Succesfully submitted")
        },
        (error) => {
          console.log("save-form-error as", error.error['Message']);
          this.notifyService.showError("Error",error.error['Message'])
        }
      );
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
        'start', RequiredDoc.description_en,this.DocID).subscribe(message => {

        console.log('message success', message);
        this.notifyService.showInfo('Success',"Successfully Uploaded")

      }, error => {
        console.log('error',error);
        this.notifyService.showError("Error", error.error['Message']);
        this.notifyService.showError("Error", error.error['statusType']);
        this.notifyService.showError("Error", error.error);
        
      });
    });
  }

 Close() {
    this.router.navigate(['/task/MyTask']);
  }

  // Below codes for action footer
  // openModal(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(
  //     template,
  //     Object.assign({}, { class: "gray modal-lg" })
  //   );
  // }

  // closeModal() {

  //   this.modalRef.hide();
  // }

  getPriveysLicence() {
    this.AppN = null;
    this.serviceService.getPriveys(this.licenceData.Certificate_Code).subscribe(
      (PriveLicence) => {
        this.PriveLicence = PriveLicence;
        this.PriveLicence = Object.assign([], this.PriveLicence.list);
        this.AppNoList = [];
        for (let i = 0; i < this.PriveLicence.length; i++) {
          this.AppNoList[i] = {};
          this.AppNoList[i].Application_No = this.PriveLicence[
            i
          ].Application_No;
        }

        this.PriveAppNoList = Object.assign([], this.AppNo);
        // console.log('this.AppNoList', this.AppNoList);
        // console.log('PriveLicence', PriveLicence);
        this.ifAppNo = true;
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getAppData(appNO) {
    this.preAppID = 0;
    this.serviceService.getTodandAppNo(appNO).subscribe(
      (PreAppData) => {
        this.PreAppData = PreAppData;
        // this.PreAppData = PreAppData;
        this.PreAppData = Object.assign([], this.PreAppData.Table);
        // this.PreAppData = (Object.assign({}, this.PreAppData.Table));
        // console.log('PreAppData', this.PreAppData);
        this.ifTask = true;
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getTaskData(task) {
    this.preAppID = 0;
    this.PreTaskData = [];
    for (let i = 0; i < this.PreAppData.length; i++) {
      if (this.PreAppData[i].tasks_task_code == task) {
        // console.log('this.PreAppData[i]', this.PreAppData[i]);
        this.PreTaskData.push(this.PreAppData[i]);
      }
    }
    // console.log('PreTaskData', this.PreTaskData);
  }

  SelectTask(task) {
    // console.log('task', task);
    this.selectedpreTask = task;
    this.selectedTask = task;
    if (task.form_code == "a7a1e05e-32c2-4f44-ad58-306572c64593") {
      this.preAppID = 2;
      // console.log('to', 2);
    } else if (task.form_code == "da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff") {
      this.preAppID = 3;
      // console.log('to', 3);
    } else if (task.form_code == "9e0834e9-7ec2-460c-a5ed-7ade1204c7ee") {
      this.preAppID = 4;
      // console.log('to', 4);
    } else {
      this.preAppID = 1;
      // console.log('to', 1);
    }
    this.ifTaskDetail = true;
  }

  // Below are action footer

  closeModal() {
    // console.log('closeing.....');
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: 'gray modal-lg'}));
  }

  // Above are action footer

  //upload file

  getRequiredDocs() {
    this.serviceService.getRequerdDocs(this.tskID).subscribe(RequerdDocs => {
      this.RequerdDocs = RequerdDocs;

      console.log('RequerdDocs success', this.RequerdDocs);
    }, error => {
      console.log('error RequerdDocs',error);
    });
  }

  // end of upload


}
