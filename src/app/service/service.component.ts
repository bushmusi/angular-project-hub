import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ServiceService } from './service.service'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task/task.service';
import { NotificationsService } from 'angular2-notifications';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  title: any

  @Input() MyAppNo;
  @Input() Service_Name;

  json
  FormData
  formcode
  _opened = false;
  RequerdDocs;
  preAppID;
  AppNo;
  Licence_Service_ID;
  tskID;
  todoID;
  SDP_ID;
  Service_ID;
  disablefins = true;
  DocID;
  licenceService;
  public ID = 0;
  loading = true;
  licenceData
  public workingUser: {
    organization_code: "00000000-0000-0000-0000-000000000000"
  };
  AppCode
  DropDownList

  modalRef: BsModalRef;
  
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

  constructor(private activatedRoute: ActivatedRoute, 
    private serviceService: ServiceService, 
    private router: Router, 
    private modalService: BsModalService,
    private taskService: TaskService, 
    private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    console.log("Service comp running");

    this.dispalyForms()

    this.MyAppNo = '';

    this.Service_Name = '';
    this.getUserWorkInfo()
    this.getRequiredDocs()
  }

  // below bush codes

  getRequiredDocs() {
    this.serviceService.getRequerdDocs(this.tskID).subscribe(RequerdDocs => {
      this.RequerdDocs = RequerdDocs;

      console.log('RequerdDocs', this.RequerdDocs);
    }, error => {
      console.log('error');
    });
  }

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

  Submit(ruleid) {
    this.disablefins = true;
    this.serviceService
      .Submit(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message) => {
          const toast = this.notificationsService.success("Sucess", "sucesss");
          this.Close();
        },
        (error) => {
          const toast = this.notificationsService.error(
            error.error['Message'],
            "Error"
          );
        }
      );
  }
  
  SubmitAR(ruleid) {
    this.disablefins = true;
    this.serviceService
      .SubmitAR(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        (message) => {
          if (message) {
            const toast = this.notificationsService.success(
              "Sucess",
              "sucesss"
            );
          } else {
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
          this.Close();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  onTitleChange(value: string) {
    this.title = value;
  }

  saveDataCompleted(response) {
    this.disablefins = false;
    this.MyAppNo = response[0]
    this.AppNo = response[0];
    this.DocID = response[1];
    this.todoID = response[2];
    console.log("save data completed called: ",response);
    
    this.getAll(this.AppNo);
  }

  public getAll(AppNo) {
    console.log('get all called appNo:'+AppNo);
    
    this.serviceService.getAll(AppNo).subscribe(

      (licenceService) => {

        this.licenceService = licenceService;

        this.licenceData = this.licenceService.list[0];

        if (this.licenceData) {

          console.log("Licence data1 from server", this.licenceData);

          this.MyAppNo = this.licenceData.Application_No;

          this.Licence_Service_ID = this.licenceData.Licence_Service_ID;

          this.Service_ID = this.licenceData.Service_ID;

          this.SDP_ID = this.licenceData.SDP_ID;

          this.Service_Name = this.licenceData.Service_Name;
          
          if (this.licenceData.Certificate_Code > 0) {
            this.getPriveysLicencef();
          
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

        console.log("GetAll error: ", error);


      }

    )
  }

  getPriveysLicencef(){
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
        this.PreTaskData.push(this.PreAppData[i]);
      }
    }
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

  // Above bush codes


  dispalyForms() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let formcode = params['Form_Code'].toLowerCase()
      this.Service_ID = params['service_Code']
      this.tskID = params['TaskCode']
      this.todoID = params['toDoId'];
      this.AppNo = '00000000-0000-0000-0000-000000000000'
      this.getAll(this.AppNo)
      console.log("you are checking service: formcode = ",formcode);
      
      switch (formcode) {
        case "6de7ae19-5e1a-450c-83a4-3511c448d3d6":
          //budget type
          this.disablefins = false
          this.preAppID = 1; 
          break;

        case "cc337279-697c-420d-a46e-8fdf5df13fdc":
          //summary
          this.preAppID = 2;
          break;

        case "2ea50f68-0ea0-416f-ab89-cd4a04a65707":
          //detail
          this.preAppID = 3;
          break;

        case "5b506707-c4fc-4e4d-81c9-348c5da3d476":
          //actual budget
          this.disablefins = false
          this.preAppID = 4;
          break;

        default:
          this.taskService.getFormData(formcode).subscribe(
            (data) => {
              this.json = data
              this.preAppID = 5
            },
            (err) => {
              console.log("Couldn't fetch");
              this.disablefins = false
              this.preAppID = 6
            }
          )


      }

      this.DocID = '00000000-0000-0000-0000-000000000000'
      this.getFormData(this.DocID)


    })
  }

  displayFormData(formcode: string) {

    console.log("dynamic:: FormCode: "+formcode);
    
    this.taskService.getFormData(formcode).subscribe(
      (data) => {
        this.json = data
        console.log("got form data",this.json)
      },
      (err) => {
        console.log("Couldn't fetch");
        
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
          this.notificationsService.success("Success","Uploaded success")
        }, error => {
          console.log('error',error);
          this.notificationsService.error("Error",error.error['Message'])
        });
    });
  }

  Close() {
    this.router.navigate(['/task/MyTask']);
  }


  saveForm(formData) {
    console.log('formData', formData);
    
    console.log("user-info-response", this.workingUser);

    if(this.Licence_Service_ID == undefined){
      
      this.Licence_Service_ID = '00000000-0000-0000-0000-000000000000';
      this.DocID = '00000000-0000-0000-0000-000000000000';
      this.todoID = '00000000-0000-0000-0000-000000000000';
      this.Service_ID = this.AppNo;

    }
    if(this.todoID == null){
      this.todoID = "00000000-0000-0000-0000-000000000000"
    }

    this.serviceService.saveForm(
        this.Licence_Service_ID, 
        this.Service_ID, 
        this.tskID, 
        this.workingUser.organization_code, 
        JSON.stringify(formData), 
        this.DocID, 
        this.todoID
      ).subscribe(message => {

      this.disablefins = false;
      this.AppCode = message[0];
      this.DocID = message[1];
      this.todoID = message[2];
      this.getAll(message[0]);
      const toast = this.notificationsService.success('Sucess', 'Saved');
    }, error => {
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
  }


  getFormData(DocID) {
    this.serviceService.GetForm(DocID).subscribe(FormData => {
      this.FormData = FormData;
      console.log('Form Data: ',FormData)
      if(FormData!=="No Data")
      {
        this.FormData = JSON.parse(this.FormData);
      }
      
      // this.FormData = (Object.assign({}, this.FormData));
      // console.log('FormData', FormData);
    }, error => {
      console.log('error');
    });

  }

  closeModal() {
    // console.log('closeing.....');
    this.modalRef.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: 'gray modal-lg'}));
  }






}
