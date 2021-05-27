import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Archive } from '../archive';
import {ServiceService} from '../service.service';
import {ServiceComponent} from '../service.component';
import { ActivatedRoute } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Guid } from "guid-typescript"; //guid excuter
import { NotificationService } from '../../notification.service';  //toaster
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

   archives : Archive[];
   public dlTransaction: any;
   dlTransactionFormGroup: FormGroup
   public dlTransactionList: any;
   public editLetterForm = false;
   public current_user_id: any;
   public currentID: any;
   public isAppNo: any;
   public guidLetterId: any;
   public disableBtn: true;

   public procArchive: any;
   procArchiveFromGroup: FormGroup
   public procArchiveTypes: any;
   public procArchiveList: any;
   public temp: any;

   procArchiveTypelist;

   @Output() saveDataCompleted = new EventEmitter();
   @Input() licenceData;
   @Input() workingUser;
   @Input() current_letter_ID;
   @Input() MyAppNo;

   displayBasic: boolean;
   isThereRecord: boolean; //to list the leters
   ableToDelete: boolean; //Cos procArchive refrence letter transaction after proarchive added couldn't able to delete procArchive
   currentLetterID
   canAddCC: boolean = false



   public urlParams: any;


   showBasicDialog() {
    this.displayBasic = true;
    this.dlTransaction.recived_By = '1895cf5b-c1aa-42e2-8630-ad4ca9b3d10f';
    this.dlTransactionFormGroup.patchValue({
      recived_By: '1895cf5b-c1aa-42e2-8630-ad4ca9b3d10f'
    })
   }

   showNewBasicDialog(){
    this.displayBasic = true;
    this.clearForm();
    this.editLetterForm = false;
    this.dlTransaction.recived_By = '1895cf5b-c1aa-42e2-8630-ad4ca9b3d10f';
    this.dlTransactionFormGroup.patchValue({
      recived_By: '1895cf5b-c1aa-42e2-8630-ad4ca9b3d10f'
    })
   }

   HideBasicDialog(){
     this.displayBasic = false;
   }

  constructor(
          private archiveservice:ServiceService,
          private routerService: ActivatedRoute,
          private serviceComponent: ServiceComponent,
          private notifyService : NotificationService, //toast,
          private fb:FormBuilder,
          private fbProcArchive: FormBuilder
          )
    {
    this.clearForm();
    this.procArchiveClearForm();
    this.temp = false;
    this.routerService.params.subscribe((params) => {
      this.urlParams = params;
    });
   }




  //This is for feaching data of letter transaction
  getDLtransaction(current_user_id) {
    console.log('current user id is : ',current_user_id);
    this.archiveservice.getDLtransaction(current_user_id).subscribe(
      (response) => {
        console.log('get--:', response["procLetterTransactions"]);
        this.dlTransactionList = response["procLetterTransactions"];
      },
      (error) => {
        console.log("Get Doc Lett error");
      }
    );
  }

  // Edit letter transn
  initLetterEdit(dlTransactionForm) {

    this.dlTransaction = dlTransactionForm;
    this.dlTransactionFormGroup.patchValue({
      ref_No: dlTransactionForm.ref_No,
      from: dlTransactionForm.from,
      to: dlTransactionForm.to,
      subject: dlTransactionForm.subject,
      recived_By: dlTransactionForm.recived_By,
      recivedBy_Name: dlTransactionForm.recivedBy_Name

    })
    this.editLetterForm = true;
    this.showBasicDialog();
  }

  //Delete letter trans
  initLetterDelete(letterDeleteData){
    console.log(letterDeleteData);
    if (confirm("Are you sure"))
      this.archiveservice.deleteLetterTrans(letterDeleteData).subscribe(
        (response) => {
          this.serviceComponent.Service_Name = null;
          this.serviceComponent.MyAppNo = null;
          this.MyAppNo = null;
          this.isThereRecord = false;
          this.clearForm();
          this.getDLtransaction(letterDeleteData.letter_ID);
          this.notifyService.showInfo("Success", "Data removed successfully ");
          console.log("delete successfully =======", response);
        },
        (error) => {
          this.notifyService.showError("Error", "Unable to delete, try again please");
          this.notifyService.showError("Error", error.error);
          this.notifyService.showError("Error", error.error['Message']);
          this.notifyService.showError("Error", error.error['statusType']);
          console.log("delete-error", error);
        }
      );
  }

  ngOnInit(): void {
    this.archives = this.archiveservice.getArchiveInfo();
    this.procArchiveClearForm();
    this.isAppNo = true;
    this.isThereRecord = false;

    this.ableToDelete = true;
    this.getProcArchiveType();

  }


  // registe dltransaction
  registerDLTransaction(){
    console.log('What is sent to service daata: ',this.dlTransactionFormGroup.value)
    this.archiveservice.registerDLTransaction(this.dlTransactionFormGroup.value).subscribe(
      (response) => {
        // this.clearForm();
        this.HideBasicDialog();
        console.log('all response from archive: '+ response[0]);
        this.current_letter_ID = response[0].letter_ID;
        this.currentLetterID = this.current_letter_ID
        this.getDLtransaction(response[0].letter_ID);
        this.editLetterForm = false;
        this.isThereRecord = true;
        this.notifyService.showInfo("Success", "Data is successfully inserted");
        console.log('Registered successfully!!!');
      },
      (error) => {
        this.notifyService.showError("Error", error.error['Message']);
        this.notifyService.showError("Error", error.error['statusType']);
        this.notifyService.showError("Error", error.error);
        console.log('error',error.error);
      }
    )
  }


  //Updating the letter component updateDLTransaction
  updateDLTransaction(){
    console.log('Update console is called',this.dlTransactionFormGroup.value);
    this.currentID = this.dlTransaction.letter_ID
    this.archiveservice.UpdateDLTransaction(this.dlTransactionFormGroup.value).subscribe(
      (response) => {
        // this.clearForm();
        this.HideBasicDialog();
        console.log('to be updated : ',this.currentID);
        this.getDLtransaction(this.currentID);
        this.notifyService.showInfo("Success", "Data is successfully updated");
        console.log('Updated successfully!!!');
      },
      (error) => {
        this.notifyService.showError("Error", error.error['Message']);
        this.notifyService.showError("Error", error.error['statusType']);
        this.notifyService.showError("Error", error.error);
        console.log('error','Not Updated successfully');
      }
    )
  }

  //end of update letter componnent



  //Below will excute after add btn is clicked in letter transaction
  saveData() {
    const userID = environment.username;
    this.editLetterForm = false;
    this.archiveservice
      .saveForm(
         "00000000-0000-0000-0000-000000000000",//app code
        this.urlParams.service_Code, //service code
        this.urlParams.TaskCode, //task code
        "00000000-0000-0000-0000-000000000000",//org id
        userID, //username
        null,//json
        "00000000-0000-0000-0000-000000000000",//doc id
        "00000000-0000-0000-0000-000000000000" //task id
      )
      .subscribe(
        (response) => {
          console.log("trans-resp", response);
          this.getLicenceService(response);
        },
        (error) => {
          console.log("save-data-error", error);
          this.notifyService.showError("Error", error.error['Message']);
          this.notifyService.showError("Error", error.error['statusType']);
          this.notifyService.showError("Error", error.error);
        }
      );
  }
  // Letter transaction update data function ends



  // below will get those response sent from above method
  public getLicenceService(saveDataResponse) {

    this.archiveservice.getAll(saveDataResponse[0]).subscribe(
      (response) => {

        let licenceData = response["list"][0]; //from returned data of object set to licenceData

        this.dlTransaction.application_Code = saveDataResponse[0]; //setting the field app_code from saveData..

        this.dlTransaction.application_NO = licenceData.Application_No; //setting app_No from licenc...

        this.guidLetterId = Guid.create();

        this.dlTransaction.letter_ID = this.guidLetterId.value;

        this.dlTransactionFormGroup.patchValue({
          application_Code: saveDataResponse[0],
          application_NO: licenceData.Application_No,
          letter_ID: this.guidLetterId.value
        })

        this.MyAppNo = licenceData.Application_No;

        this.saveDataCompleted.emit(saveDataResponse); //It will send data to saveDataCompleted @output file

        this.registerDLTransaction(); //This is main method to save

      },

      (error) => {

        console.log("all-error" + error);
        this.notifyService.showError("Error", error.error['Message']);
        this.notifyService.showError("Error", error.error['statusType']);
        this.notifyService.showError("Error", error.error);

      }
    );
  }
  // End of gete....



  clearForm() {
    this.dlTransaction = new DLTransaction();

    this.dlTransactionFormGroup = this.fb.group({
       letter_ID : [''],
       application_Code : [''],
       application_NO : [''],
       ref_No : ['', Validators.required],
       from : ['', Validators.required],
       to : ['', Validators.required],
       is_IN : [''],
       iS_Out : [''],
       subject : ['', Validators.required],
       number_Of_Page : [''],
       number_Of_Attachment : [''],
       letter_written_Date : [''],
       document_Details : [''],
       recived_By : [''],
       recivedBy_Name : ['', Validators.required],
    })
  }

  /* Below codes are for Document Archive */
  //save new doc archive
  saveDocumentArchive(){
    this.procArchive.letter_ID = this.current_letter_ID;
    this.procArchiveFromGroup.patchValue({
      letter_ID: this.current_letter_ID
    })
    console.log('sent data: ',this.procArchiveFromGroup.value);
    if(this.temp==false)
    {
      this.archiveservice.saveDocumentArchive(this.procArchiveFromGroup.value).subscribe(
        (response) => {
          this.canAddCC = true
          this.ableToDelete = false;
          this.notifyService.showInfo("Success", "Data is successfully Saved");
          this.getProArchiveList(this.procArchiveFromGroup.controls['letter_ID'].value);

        },
        (error) => {
          console.log("error:",error.error);

          this.notifyService.showError("Error", error.error['Message']);
          this.notifyService.showError("Error", error.error['statusType']);
          this.notifyService.showError("Error", error.error);
        }
      )
    }
    else if (this.temp == this.procArchiveFromGroup.controls["folderNO"].value){
      console.log("Local: ", this.procArchiveFromGroup.controls["folderNO"].value,"remote: ",this.temp);
      this.archiveservice.updateDocumentArchive(this.procArchiveFromGroup.value).subscribe(
        (message) => {
          this.getProArchiveList(this.procArchiveFromGroup.controls['letter_ID'].value);
          this.notifyService.showInfo('Success','Document archive updated!!!')
        },
        (error) => {
          this.notifyService.showError("Error", error.error['Message']);
          this.notifyService.showError("Error", error.error['statusType']);
          this.notifyService.showError("Error", error.error);
        }
      )
    }
    else{
      console.log("Local: ", this.procArchiveFromGroup.controls["folderNO"].value,"remote: ",this.temp);
      this.notifyService.showError("Error", "Folder number should be same");
    }

  }
  //end of update letter componnent

  getProcArchiveType(){
    this.archiveservice.getProcArchiveType().subscribe(
      (procArchiveTypelist) => {
        this.procArchiveTypelist = procArchiveTypelist["procArchiveTypes"];
        this.procArchiveTypelist = Object.assign([], this.procArchiveTypelist);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getProArchiveList(current_user_id){
    console.log("Current doc archve leter id: ",current_user_id);
    this.archiveservice.getProArchiveList(current_user_id).subscribe(
      (response) => {
        console.log("archive list: ",response["procArchives"]);
        this.procArchiveList = response["procArchives"];
        this.temp = this.procArchiveList[0].folderNO;

      },
      (error) =>{
        console.log("archive error: ",error);
        this.temp = false;

      }
    );


  }

  procArchiveClearForm(){
    this.procArchive = new procArchive();

    this.procArchiveFromGroup = this.fbProcArchive.group({
       folderNO : ['',Validators.required],
       name : [''],
       archive_Type : ['',Validators.required],
       shelf_Raw : ['',Validators.required],
       shelf_Column : ['',Validators.required],
       letter_ID : ['']

    })
  }


 /* Above codes are for Document Archive */



}

class DLTransaction {
  public letter_ID : any;
  public application_Code : any;
  public application_NO : any;
  public ref_No : any;
  public from : any;
  public to : any;
  public is_IN : true;
  public iS_Out : true;
  public subject : any;
  public number_Of_Page : 0;
  public number_Of_Attachment : 0;
  public letter_written_Date : any;
  public document_Details : any;
  public recived_By : any;
  public recivedBy_Name : any;
}

class procArchive {
  public folderNO : any;
  public name : any;
  public archive_Type : any;
  public shelf_Raw : any;
  public shelf_Column : any;
  public letter_ID : any;
}
