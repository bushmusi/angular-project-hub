import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServiceService } from '../../service.service';
import { Guid } from "guid-typescript"; //guid excuter
import { ArchiveComponent } from "../archive.component"
import { NotificationService } from '../../../notification.service';  //toaster

// newline
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-to',
  templateUrl: './send-to.component.html',
  styleUrls: ['./send-to.component.css']
})
export class SendToComponent implements OnInit {

  sendToForm: any
  displaySendToDialog: boolean = false
  orgList: any
  deptList: any
  emailID: any
  orgStrList: any
  sendToStatus: boolean = true
  emailIdList = []

  @Input() currentLetterID
  @Input() canAddCC
  // @Output() getDeptList = new EventEmitter()

  //neline
  dynamicForm: FormGroup;
  submitted = false;
  noOfData: number
  clearData: any
  tempArray = []
  strTempArray = []
  strClearData: any

  private temp1 = {
    cc: Boolean,
    email_ID: String,
    letter_ID: String,
    department_ID: String,
    org_ID: String,
    stracture_Role_ID: String,
  }




  constructor(
    private serviceService: ServiceService,
    public archiveComponent: ArchiveComponent,
    //newline
    private formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    this.sendToForm = new SendToForm()
    this.getDeptList()
    this.getOrganizationList()
    this.getOrgStrList()

    // this.currentLetterID = this.archiveComponent.currentID
    console.log("sendto cu let_id:", this.currentLetterID);


    //newLine
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['', Validators.required],
      tickets: new FormArray([])
    });
  }

  //newline
  // convenience getters for easy access to form fields
  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  fetchDeptList(id, no) {
    console.log("sent data:A" + id);
    console.log("sent no:", no);
    this.clearData = id.split(':')
    this.clearData = this.clearData[1].replace(/\s/g, "")
    console.log("split: A" + this.clearData + 'Z');
    this.tempArray[no] = []
    this.deptList.forEach(element => {
      if (element.organizations_Organization_Code == this.clearData) {
        this.tempArray[no].push(element)
      }
    });
    console.log('Current list is: ', this.tempArray[no]);


  }

  fetchStrList(id, no) {
    console.log("str id" + id);
    console.log("str sent no:", no);
    this.strClearData = id.split(':')
    this.strClearData = this.strClearData[1].replace(/\s/g, "")
    console.log(" str split: A" + this.strClearData + 'Z');
    this.strTempArray[no] = []

    this.serviceService.getStrRoleIdByDiv(this.strClearData).subscribe(
      (res) => {
        console.log('str return b4:', res['procOrganizationalStructures']);

        this.strTempArray[no] = res['procOrganizationalStructures']

        console.log("str return after: ", this.strTempArray[no]);

      },
      (err) => {
        console.log("error occured: ", err);

      }
    )
    // this.orgStrList.forEach(element => {
    //   if(element.organizations_Organization_Code == this.strClearData){
    //     this.strTempArray[no].push(element)
    //   }
    // });
    console.log('str Current list is: ', this.strTempArray[no]);

  }

  onChangeTickets(e) {
    const numberOfTickets = e.target.value || 0;
    this.noOfData = numberOfTickets
    console.log("No of Items: ", e.target.value);

    if (this.t.length < numberOfTickets) {
      for (let i = this.t.length; i < numberOfTickets; i++) {
        
        this.emailID = Guid.create();
        // this.emailIdList[i] = this.emailID['value']
        if (i == 0) {
          const myformGroup = this.formBuilder.group({
            email_ID: [this.emailID['value'], Validators.required],
            letter_ID: [this.currentLetterID, Validators.required],
            department_ID: ['', Validators.required],
            org_ID: ['', Validators.required],
            stracture_Role_ID: ['', Validators.required],
            cc: [{ value: '', disabled: true }]
            // cc: ['']
          })
          myformGroup.get('cc').disable()
          this.t.push(myformGroup);
        }
        else {
          this.t.push(this.formBuilder.group({
            email_ID: [this.emailID['value'], Validators.required],
            letter_ID: [this.currentLetterID, Validators.required],
            department_ID: ['', Validators.required],
            org_ID: ['', Validators.required],
            stracture_Role_ID: ['', Validators.required],
            cc: [{ value: true, disabled: true }]
          }));
        }

      }
    } else {
      for (let i = this.t.length; i >= numberOfTickets; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log("st-1 component: ", this.dynamicForm.value['tickets']);
    // stop here if form is invalid
    if (this.dynamicForm.invalid) {

      console.log("error dynamic: ", this.dynamicForm);
      this.notificationService.showError("Error","Might be letter id is empty")
      return;
    }
    
    
    for (let index = 0; index < this.noOfData; index++) {
      console.log("Array email id: A"+this.emailIdList[index]+'Z');
      console.log("current email id: A"+this.dynamicForm.value['tickets'][index]['email_ID']+'Z');
      if (index == 0) {
        this.dynamicForm.value['tickets'][index]['cc'] = false
        this.temp1.cc = this.dynamicForm.value['tickets'][index]['cc']
      }
      else {
        this.dynamicForm.value['tickets'][index]['cc'] = true
        this.temp1.cc = this.dynamicForm.value['tickets'][index]['cc']
      }
      
      this.temp1.email_ID = this.dynamicForm.value['tickets'][index]['email_ID']
      this.temp1.department_ID = this.dynamicForm.value['tickets'][index]['department_ID']
      this.temp1.org_ID = this.dynamicForm.value['tickets'][index]['org_ID']
      this.temp1.letter_ID = this.dynamicForm.value['tickets'][index]['letter_ID']
      this.temp1.stracture_Role_ID = this.dynamicForm.value['tickets'][index]['stracture_Role_ID']

      if(this.emailIdList.includes(this.dynamicForm.value['tickets'][index]['email_ID']))
      {
        
        this.serviceService.sendToFormUpdate(this.temp1).subscribe(
          (reponse) => {
            console.log("st-3 component:" + index, this.temp1);
            this.sendToStatus = true
            console.log(" success update --");
            
          },
          (error) => {
            console.log("st-3 component error: index:" + index, this.temp1);
            this.sendToStatus = false
            console.log("Error update--",error);
            this.notificationService.showError("Error", error.error['Message']);
            this.notificationService.showError("Error", error.error['statusType']);
            this.notificationService.showError("Error", error.error);
          }
        )

      }
      else{
        this.serviceService.sendToForm(this.temp1).subscribe(
          (reponse) => {
            console.log("st-3 component:" + index, this.temp1);
            this.sendToStatus = true
            this.emailIdList[index] = this.dynamicForm.value['tickets'][index]['email_ID']
            console.log('Success insert --');
            
          },
          (error) => {
            console.log("st-3 component error: index:" + index, this.temp1);
            this.sendToStatus = false
            console.log('Error insert --'+error);
          }
        )
      }

    }

    if(this.sendToStatus){
      console.log("st-4 conditional true");
      
      this.notificationService.showInfo("Success","CC submitted successfully successfully")
      this.displaySendToDialog = false
    }
    else if (!this.sendToStatus) {
      console.log("st-4 conditional false");
      this.notificationService.showError("Error","CC add error occured")
    } else {
      
    }


  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }



  showSendToDialog() {
    this.displaySendToDialog = true
    this.sendToForm.email_ID = Guid.create();
  }

  addFormField() {

  }

  getOrganizationList() {
    // console.log("org id: ",data);

    this.serviceService.getOrganizationList().subscribe(
      (response) => {
        console.log("org list: ", response);
        this.orgList = response["procorganizationss"]

      },
      (error) => {
        console.log("errro org fetch: ", error);

      }
    )
  }

  getOrgStrList() {
    this.serviceService.getOrgStrList().subscribe(
      (response) => {
        console.log("list str: ", response);
        this.orgStrList = response['procOrganizationalStructures']

      },
      (error) => {
        console.log("list str error: ", error);

      }
    )
  }

  getDeptList() {

    this.serviceService.getDeptList().subscribe(
      (response) => {
        console.log("result dept list: ", response['procdepartmentss']);
        this.deptList = response['procdepartmentss']
      },
      (error) => {
        console.log("error: ", error);

      }
    )

  }

}


class SendToForm {
  email_ID: string;
  letter_ID: string;
  org_ID: string;
  department_ID: string;
  stracture_Role_ID: string;
  cc: string

}