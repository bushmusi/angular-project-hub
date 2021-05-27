import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Budgetsummrazed } from '../budget'
import { ServiceService } from '../service.service'
import {FormGroup, FormBuilder,Validators } from '@angular/forms'

import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import { Budget } from '../budget'

import { NotificationsService } from 'angular2-notifications';

import { environment } from 'src/environments/environment';

import { ActivatedRoute } from "@angular/router";

import { ToastrService } from 'ngx-toastr';

import { Guid } from "guid-typescript"; //guid excuter


@Component({
  selector: 'app-budget-summraized',
  templateUrl: './budget-summraized.component.html',
  styleUrls: ['./budget-summraized.component.css']
})
export class BudgetSummraizedComponent implements OnInit {

  budgetsummaryss: Budgetsummrazed;

  codeIsReadOnly: boolean = false;



  listOfOrganization: any;

  isBudgetToEdit: boolean = false;

  isBudgetSummaryToEdit: boolean = false;

  isEditBtn: boolean = false;

  public urlParams: any;

  currentType: any

  guidSummaryID: any

  @Output() saveDataCompleted = new EventEmitter();

  @Input() licenceData;

  @Input() workingUser;

  @Input() MyAppNo;
  
  @Input() Service_Name;


  budgetss: Budget
  budgetSummaryFromGroup: FormGroup

  budgetTypes: any
  cunits: any


  constructor(
    private budgetservice: ServiceService,
    private fb: FormBuilder, private modalService: NgbModal,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService
  ) {

    this.activatedRoute.params.subscribe((params) => {
      this.urlParams = params;
    });

  }

  ngOnInit() {

    // below are bushra codes

    this.budgetSummaryFromGroup  = this.fb.group({
      budget_Summarized_ID: [''],
      budget_ID: ['',Validators.required],
      budget_Type: ['',Validators.required],
      organization_code: ['',Validators.required],
      unit: ['',Validators.required],
      is_Approved: [''],
      budget_Ammount_Birr: [''],
      applicationCode: [''],
      application_NO: [''],
      docNo: [''],
    })
    console.log("summary runnint");
    
    // End of bushra codes

    this.getListOfOrg()

    this.loadBudgets();

    this.loadBudgetSummaryList()

    this.loadBudgetTypes()

    this.getCUnits()

  }

  //Below are bushra codes
  sendClickCompleted(response){
    console.log("from summary code: ",response.node['organization_Code']);
    const temp = response.node['organization_Code']
    this.budgetSummaryFromGroup.patchValue({
      organization_code: response.node['organization_Code']
    })
    
    
  }
  // Budget Summary
  loadBudgets(){
    this.budgetservice.loadBudget().subscribe(
      (response) =>{
        
        this.budgetss = response["budgets"]
        console.log("List of budget: ",this.budgetss);
        
      },
      (error) => {

        console.log("error occured while fetching: ",error);
        
      }
    )
  }

  getCUnits(){
    this.budgetservice.getUnitList().subscribe(
      (res) => {
        this.cunits = res['proccUnits']
      },
      (err) => {

      }
    )
  }

  loadBudgetSummaryList() {

    this.budgetservice.loadBudgetSummary().subscribe(
      (response) => {

        this.budgetsummaryss = response['summarizeds']

        console.log('list of summary: ', response)
      },
      (error) => {

        console.log("error occured: ", error);

      }
    )
  }

  loadBudgetTypes(){
    
    this.budgetservice.loadBudgetType().subscribe(
      (res) => {
        this.budgetTypes = res['budgetTypes']
      },
      (err) => {
        console.log("budget type fetch error:"+err);
        
      }
    )
  }

  selectBudgetTypeforSummary(id) {

    console.log('id: ', id)
    this.budgetSummaryFromGroup.patchValue({
      budget_ID: id
    })

  }

  selectBudgetSummary(budgetSummary: Budgetsummrazed) {
    
    this.budgetSummaryFromGroup.patchValue({
      budget_Summarized_ID: budgetSummary.budget_Summarized_ID,
      budget_ID: budgetSummary.budget_ID,
      budget_Type: budgetSummary.budget_Type,
      organization_code: budgetSummary.organization_code,
      unit: budgetSummary.unit,
      is_Approved: budgetSummary.is_Approved,
      budget_Ammount_Birr: budgetSummary.budget_Ammount_Birr,
      docNo: budgetSummary.docNo,
    })

    this.isBudgetSummaryToEdit = true;

    this.codeIsReadOnly = true;

  }

  getListOfOrg() {


    this.budgetservice.getListOfOrg().subscribe(
      (response) => {

        this.listOfOrganization = response['procorganizationss']

      },
      (error) => {

        console.log("error while fetching org list");


      }
    )
  }

  saveBudgetSummary() {

    const userID = environment.username

    this.isBudgetToEdit = false

    this.budgetservice.saveBudgetData(

      "00000000-0000-0000-0000-000000000000",//app code

      this.urlParams.service_Code, //service code

      this.urlParams.TaskCode, //task code

      "00000000-0000-0000-0000-000000000000",//org id

      userID, //username

      null,//json

      "00000000-0000-0000-0000-000000000000",//doc id

      "00000000-0000-0000-0000-000000000000" //task id

    ).subscribe(

      (response) => {

        // console.log("trans-resp", response);

        console.log("step-1 saveform");


        this.getBudgetSummaryLicenceService(response);
      },
      (error) => {

        console.log("save-data-error", error);
        this.notificationsService.error('Error in save form',error.error['statusType'])
        this.notificationsService.error('Error in save form',error.error['Message'])
        this.notificationsService.error('Error in save form',error.error)

      }
    );

  }

  getBudgetSummaryLicenceService(saveDataResponse){

    this.budgetservice.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        let licenceData = response["list"][0]; //from returned data of object set to licenceData

        console.log("SaveData response b4: ", saveDataResponse[0]);
//setting the field app_code from saveData..
        
        this.budgetSummaryFromGroup.patchValue({
          applicationCode: saveDataResponse[0],
          application_NO: licenceData.Application_No
        })



        this.saveDataCompleted.emit(saveDataResponse); //It will send data to saveDataCompleted @output file

        this.registerBudgetSummary(); //This is main method to save

      },

      (error) => {

        console.log("all-error" + error);
        this.notificationsService.error('Error in save form',error.error['statusType'])
        this.notificationsService.error('Error in save form',error.error['Message'])
        this.notificationsService.error('Error in save form',error.error)

      }
    );

  }


  registerBudgetSummary() {


    console.log("step-3 register mtd");
    this.guidSummaryID=Guid.create();
    this.budgetSummaryFromGroup.patchValue({
      budget_Summarized_ID : this.guidSummaryID.value
    })
    this.budgetservice.registerBudgetSummary(this.budgetSummaryFromGroup.value).subscribe(
      (response) => {

        this.notificationsService.success("Success", "Added successfully")

        this.clearBudgetSummaryForm()

        this.loadBudgetSummaryList()

      },
      (error) => {
        console.log("Error",error);
        
        this.notificationsService.error('Error in save form',error.error['statusType'])
        this.notificationsService.error('Error in save form',error.error['Message'])
        this.notificationsService.error('Error in save form',error.error)


      }
    );

  }

  updateBudgetSummary() {

    console.log("upda data: ",this.budgetSummaryFromGroup);
    

    this.budgetservice.updateBudgetSummary(this.budgetSummaryFromGroup.value).subscribe(

      (response) => {

        console.log("update sumary called: ",response);

        this.isBudgetSummaryToEdit = false;
        
        this.loadBudgetSummaryList()

        this.clearBudgetSummaryForm()

        this.notificationsService.success('Success','Updated successfully')
      },
      (error) =>{

        console.log("Error occured: ",error);

        this.notificationsService.error('Error in save form',error.error['statusType'])
        this.notificationsService.error('Error in save form',error.error['Message'])
        this.notificationsService.error('Error in save form',error.error)
        
      }
    )
  }

  deleteBudgetsummary(){
    
    if (confirm("are you sure you want to delete")){

      this.budgetservice.deleteBudgetsummary(this.budgetSummaryFromGroup.value).subscribe(
        (response) => {
  
          this.loadBudgetSummaryList()
          this.clearBudgetSummaryForm()
          console.log("Deletin success: ",response)
          this.isBudgetSummaryToEdit = false
          this.notificationsService.success("Success","Deleted successfully")
          
        },
        (error) =>{
  
          console.log("Error","Deletion error occured");
          this.notificationsService.error('Error in save form',error.error['statusType'])
          this.notificationsService.error('Error in save form',error.error['Message'])
          this.notificationsService.error('Error in save form',error.error)
          
        } 
      )

    }

  }

  clearBudgetSummaryForm() {

    this.budgetSummaryFromGroup.reset()
  }


  // End Budget summary


}


class BudgetSummrazedForm {
  budget_Summarized_ID: string;
  budget_ID: string;
  budget_Type: string;
  organization_code: string;
  parentBuget_Sum_ID: string;
  unit: string;
  is_Approved: string;
  budget_Ammount_Birr: string;
  applicationCode: string;
  application_NO: string;
  docNo: string;
  log: string;

}

