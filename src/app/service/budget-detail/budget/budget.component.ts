import { Component, OnInit,EventEmitter,Input,Output } from '@angular/core'

import { environment } from 'src/environments/environment';

import { ServiceService } from '../../service.service'

import { ActivatedRoute } from "@angular/router";

import { NotificationsService } from 'angular2-notifications'

import { BudgetDetailComponent } from 'src/app/service/budget-detail/budget-detail.component';

import {FormGroup, FormBuilder,Validators } from '@angular/forms'

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budgetss: BudgetForm

  isBudgetFormDialog: boolean = false

  budgetFormField: any

  budgetFormGroup: FormGroup

  isEditBtn: boolean = false

  urlParams:any

  statusTypeList: any

  @Output() saveDataCompleted = new EventEmitter();

  @Output() sendCurrentBudget = new EventEmitter()
  
  @Input() licenceData;

  @Input() workingUser;

  @Input() currentOrg

  @Input() budgetYear


  constructor(
    private budgetservice: ServiceService,

    private activatedRoute: ActivatedRoute,

    private notificationsService: NotificationsService,

    private budgetDetailComponent: BudgetDetailComponent,
    
    private fb: FormBuilder
  ) { 
    this.activatedRoute.params.subscribe((params) => {
      this.urlParams = params;
    });
  }

  ngOnInit(): void {

    this.getBudgetList()

    this.getStatustype()

    this.budgetFormField = new BudgetForm()

    this.budgetFormGroup = this.fb.group(
      {
        budget_ID: [''],
        organization_code: ['', Validators.required],
        year: ['', Validators.required],
        total_Budget_Amount_In_Birr: ['', Validators.required],
        statusType: ['', Validators.required],
        applicationCode: [''],
        application_NO: [''],
        docNo: ['']
      }
    )

    this.budgetFormField.organization_code = this.currentOrg
    
    this.budgetFormGroup.patchValue({
      organization_code: this.currentOrg
    })

  }
  getStatustype(){
    const type = "Budget Request Type"
    this.budgetservice.getStatustype(type).subscribe(
      (res) => {
        this.statusTypeList = res
      },
      (err) => {
        console.log("Error occured at look up api",err);
        
      }
    )
  }

  getBudgetList() {
    this.budgetservice.loadBudget().subscribe(
      (budgett) => {

        this.budgetss = budgett['budgets']
        console.log("xxx: ", this.budgetss);
      },
      (error) => {
        console.log("errror fetching: ", error);
      }
    )
  }

  saveBudgetData() {

    const userID = environment.username

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

        console.log("trans-resp", response);

        this.getBudgetLicenceService(response);
      },
      (error) => {

        console.log("save-data-error", error);

      }
    );

  }

  getBudgetLicenceService(saveDataResponse){

    this.budgetservice.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        let licenceData = response["list"][0]; //from returned data of object set to licenceData

        console.log("SaveData response b4: ", saveDataResponse[0]);

        console.log("SaveData response after: ", this.budgetFormField.application_Code);

        this.budgetFormField.application_NO = licenceData.Application_No; 

        this.budgetFormField.applicationCode = saveDataResponse[0]; //setting the field app_code from saveData..

        this.budgetFormGroup.patchValue({
          application_NO: licenceData.Application_No,
          applicationCode: saveDataResponse[0]
        })

//setting app_No from licenc...

        this.saveDataCompleted.emit(saveDataResponse); //It will send data to saveDataCompleted @output file

        this.registerBudget(); //This is main method to save

      },

      (error) => {

        console.log("all-error" + error);

      }
    );

  }

  registerBudget(){
    //Relplace budgerFormField with group
    this.budgetservice.registerBudget(this.budgetFormGroup.value).subscribe(
      (response) => {

        console.log('Saved success from component: ', response);


        this.notificationsService.success("Success", "Added successfully")

        this.budgetFormField = new BudgetForm()

        this.budgetFormGroup.reset()

        this.isBudgetFormDialog = false

        this.getBudgetList()

      },
      (error) => {

        console.log("Save-error",error);

        this.notificationsService.error("Error", error.error['statusType'])
        this.notificationsService.error("Error", error.error['Message'])
        this.notificationsService.error("Error", error.error['year'][0])
        this.notificationsService.error("Error", error.error)


      }
    );

  }

  updateBudgetData() {
    //Update budgetForm field with grop
    this.budgetservice.updateBudgetData(this.budgetFormGroup.value).subscribe(
      (response) => {

        console.log("updated success component data: ", this.budgetFormField);

        console.log("updated success component response: ", response);

        this.notificationsService.success("Success", "Updated successfully")

        this.budgetFormField = new BudgetForm()

        this.budgetFormGroup.reset()

        this.isBudgetFormDialog = false

        this.getBudgetList()


      },
      (error) => {

        console.log("Sth went wrong error: ", error);

        this.notificationsService.error("Error", error.error['statusType'])
        this.notificationsService.error("Error", error.error['Message'])


      }
    )

  }

  showBudgetFormDialog() {

    this.budgetFormField = new BudgetForm()

    this.budgetFormGroup.reset()

    this.budgetFormGroup.patchValue({
      organization_code: this.currentOrg
    })

    this.budgetFormField.organization_code = this.currentOrg
    
    this.isEditBtn = false
    
    this.isBudgetFormDialog = true

  }

  selectBudget(id,year) {

    this.budgetDetailComponent.budgetDetailForm.budget_ID = id
    const temp = []
    temp[0] = id
    temp[1] = year
    this.sendCurrentBudget.emit(temp)

  }

  editBudget(data) {

    this.budgetFormField = data

    this.budgetFormGroup.patchValue({
      budget_ID: data.budget_ID,
      organization_code: data.organization_code,
      year: data.year,
      total_Budget_Amount_In_Birr: data.total_Budget_Amount_In_Birr,
      statusType: data.statusType,
      docNo: data.docNo
    })

    this.isBudgetFormDialog = true

    this.isEditBtn = true

  }

  deleteBudget(id) {

    if (confirm("Are you sure")) {

      this.budgetservice.deleteBudget(id).subscribe(
        (response) => {

          console.log("success", response);

          this.notificationsService.success("Success", "Delete successfully")

          this.getBudgetList()

        },
        (error) => {

          console.log("Error", error);

        this.notificationsService.error("Error", error.error['statusType'])
        this.notificationsService.error("Error", error.error['Message'])

        }
      )


    }

  }
}


class BudgetForm {
  budget_ID?: string;
  organization_code: string;
  year: string;
  total_Budget_Amount_In_Birr: string;
  statusType: string;
  applicationCode?: string;
  application_NO?: string;
  docNo?: string;
  log?: string;
}
