import { Component, OnInit } from '@angular/core';
import { BudgetType } from '../budget'
import { ServiceService } from '../service.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Budget } from '../budget'
import { NotificationsService } from 'angular2-notifications';
import { Title } from '@angular/platform-browser';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms'; 


@Component({
  selector: 'app-budget-type',
  templateUrl: './budget-type.component.html',
  styleUrls: ['./budget-type.component.css']
})
export class BudgetTypeComponent implements OnInit {
 
  budgettypess: BudgetType
  title: any
  // Below are bushra codes

  budgetTypeForm: any;

  listOfOrganization: any;

  // Above are bushra codes
  chartOfAccountList: any;

  budgetss: Budget

  budgetForm: FormGroup

  public budgetTypeFormGroup: FormGroup


  codeIsReadOnly: boolean = false;

  currentType: any


  constructor(private titleService: Title,private budgetservice: ServiceService, private fb: FormBuilder, private modalService: NgbModal, private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    //Below are bushra codes
    this.title = "Budget Type"

    this.budgetTypeForm = new BudgetTypeForm();

    this.getListOfOrg()

    // Above are bushra codes

    // budget type form group
    this.intilizeBudgetTypeForm();
    // budget form group
    this.intilizeBudgetForm();
    this.loadBudgetTypes();
    this.loadBudgets();
    this.setTitle(this.title)

    // this.getChartOfAccount();
    

  }

  saveDataCompleted(response) {
    
    // this.budgetTypeForm.parent = response.node['code']
    console.log("::code:",response.node['code']);
    
    this.budgetTypeFormGroup.patchValue({
      parent: response.node['code']
   });
  //  this.budgetTypeFormGroup.controls.parent.setValue('abc');
    
    
  }

  public setTitle(newTitle: any) {
    console.log("title: ",newTitle);
    
    this.titleService.setTitle(newTitle);
  }
  // crud for Budget Type
  loadBudgetTypes() {
    this.budgetservice.loadBudgetType().subscribe((budgetT: any) => {
      this.budgettypess = budgetT;
      this.budgettypess = (Object.assign([], budgetT.budgetTypes));
      //  this.updateBudgetTypeForm(this.budgettypess)
      console.log(budgetT)
      console.log(this.budgettypess)
      console.log(budgetT.accountCode)
    },
      (err: any) => console.log(err)
    )

  }


  saveBudgetType(budgetTypeFormGroup) {

    if (this.budgetTypeFormGroup.valid) {

      if (this.budgetTypeFormGroup.dirty) {

        const b = { ...this.budgettypess, ...this.budgetTypeFormGroup.value };

        this.budgetservice.updateBugetType(b)
          .subscribe((budgettype: BudgetType) => {

            if (budgettype) {
              const toast = this.notificationsService.success('Success', 'Saved');
              console.log('saved' + JSON.stringify(budgettype))
              this.loadBudgetTypes();
              this.intilizeBudgetTypeForm();
              this.onSaveComplete()

            }

            else {
              console.log('unable to save budget type')
              const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
            }

          }, (err: any) => {
            console.log('The error is: ', err)
            const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
          })

      }
      else {
        this.onSaveComplete();
      }

    }
    else {
      console.log("please correct the validation error")
    }
    console.log(this.budgetTypeFormGroup)
    //console.log('saved' + JSON.stringify(this.budgetTypeFormGroup.value))
  }

  // crud for Budget 

  loadBudgets() {
    this.budgetservice.loadBudget().subscribe((budgett: any) => {
      this.budgetss = budgett;
      this.budgetss = (Object.assign([], budgett.budgets));
      console.log(budgett)
      console.log(this.budgetss)
      console.log(budgett.bank_Name)
    },
      (err: any) => console.log(err)
    )

  }

  createBudget(budgetForm) {

    if (this.budgetForm.valid) {
      if (this.budgetForm.dirty) {
        const b = { ...this.budgetss, ...this.budgetForm.value };

        console.log(this.budgetForm.value)

        this.budgetservice.createBudget(b)
          .subscribe((budgett: Budget) => {

            if (budgett) {
              const toast = this.notificationsService.success('Success', 'Saved');
              console.log('saved' + JSON.stringify(budgett));

              this.loadBudgetTypes();
              this.intilizeBudgetTypeForm();
              this.onSaveComplete();

            }

            else {
              console.log('unable to add budget type')

            }

          }, (err: any) => console.log(err))


      }

      else {
        this.onSaveComplete();

      }

    }
    else {
      console.log("please correct the validation error")
    }
    // console.log(this.budgetTypeFormGroup)

  }

  // Below are bushra codes

  getListOfOrg(){
    

    this.budgetservice.getListOfOrg().subscribe(
      (response) => {

        this.listOfOrganization = response['procorganizationss']
        
      },
      (error) =>{

        console.log("error while fetching org list");
        

      }
    )
  }

  getChartOfAccount() {

    this.budgetservice.getChartOfAccount().subscribe(
      (response) => {

        console.log('List of chart acc is: ', response["chartOfAccounts"])

        this.chartOfAccountList = response;
      },
      (error) => {

        console.log("Error fetching chart of acc");

      }
    )
  }

  createBudgetType() {

    console.log("Current send form is: ", this.budgetTypeFormGroup.value);

    this.budgetservice.createBudgetType(this.budgetTypeFormGroup.value).subscribe(
      (response) => {

        console.log("save success");

        const toast = this.notificationsService.success('Success', 'Saved successfuly');

        this.loadBudgetTypes();

        this.onSaveComplete()

      },
      (error) => {

        console.log("save error: ", error);

        this.notificationsService.error('Error in save form',error.error['statusType'])
        this.notificationsService.error('Error in save form',error.error['Message'])
        this.notificationsService.error('Error in save form',error.error)

      }
    )

  }

  updateBudgetType() {
    console.log('update is called')

    this.budgetservice.updateBudgetType(this.budgetTypeFormGroup.value).subscribe(
      (response) => {

        console.log('updated succesfuly')

        const toast = this.notificationsService.success('Success', 'Updated')

        this.loadBudgetTypes()

        this.onSaveComplete()

        this.codeIsReadOnly = false

      },
      (error) => {

        console.log('Error occured while update: ', error)

        this.notificationsService.error('Error in save form',error.error['statusType'])
        this.notificationsService.error('Error in save form',error.error['Message'])
        this.notificationsService.error('Error in save form',error.error)

      }
    )
  }

  deleteBudgetType(budgetTypeCode) {
    console.log('To be deleted id: ',budgetTypeCode)
    if (confirm("are you sure you want to delete")) {

      this.budgetservice.deleteBudgetType(budgetTypeCode).subscribe(
        (response) => {

          console.log('Deleted success',response)

          this.loadBudgetTypes()

          this.onSaveComplete()

          const toast = this.notificationsService.success("Success","Deleted successfully")

        },

        (error) => {

          console.log('Error while deleting',error)
          this.notificationsService.error('Error in save form',error.error['statusType'])
          this.notificationsService.error('Error in save form',error.error['Message'])
          this.notificationsService.error('Error in save form',error.error)
        }

      )
    }

  }

  // Above are bushra codes


  saveBudget(budgetForm) {

    if (this.budgetForm.valid) {
      if (this.budgetForm.dirty) {
        const b = { ...this.budgetss, ...this.budgetForm.value };

        console.log(this.budgetForm.value)


        this.budgetservice.updateBuget(b)
          .subscribe((budget: Budget) => {

            if (budget) {
              console.log('saved' + JSON.stringify(budget))
              this.loadBudgetTypes();
              this.intilizeBudgetTypeForm();
              this.onSaveComplete()

            }

            else {
              console.log('unable to save budget type')

            }

          }, (err: any) => console.log(err))








      }

      else {
        this.onSaveComplete();

      }

    }
    else {
      console.log("please correct the validation error")
    }
    console.log(this.budgetTypeFormGroup)
    //console.log('saved' + JSON.stringify(this.budgetTypeFormGroup.value))


  }

  // end of crud for budget


  openModal(targetModal) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

  }

  editBudgetType(data) {

    this.codeIsReadOnly = true;

    this.budgetTypeFormGroup.setValue({
      code: data.code,
      expenditure: data.expenditure,
      description: data.description,
      accountCode: data.accountCode,
      parent: data.parent,
      for_organization: data.for_organization,
      is_Account: data.is_Account
    })

    // this.budgetTypeForm = data
  }

  selectBudget(budget: Budget) {
    this.budgetForm.patchValue(
      {
        budgetID: budget.budget_ID,
        organizationcode: budget.organization_code,
        year: budget.year,
        totalBudgetAmountInBirr: budget.total_Budget_Amount_In_Birr,
        statusType: budget.statusType
      }
    )


  }

  onSaveComplete() {
    this.budgetTypeFormGroup.reset()
  }


  intilizeBudgetTypeForm() {
    this.codeIsReadOnly = false;
    this.budgetTypeFormGroup = this.fb.group(
      {
        code: ['',Validators.required],
        expenditure: ['',Validators.required],
        description: ['',Validators.required],
        accountCode: ['',Validators.required],
        parent: [null,],
        for_organization: ['',Validators.required],
        is_Account: '',
      }
    );


  }


  intilizeBudgetForm() {
    this.budgetForm = this.fb.group
      (
        {
          budgetID: '',
          organizationcode: '',
          year: '',
          totalBudgetAmountInBirr: '',
          statusType: ''


        }
      );

  }

}


class BudgetTypeForm {

  code: any;
  expenditure: any;
  description: any;
  accountCode: any;
  parent: any;
  for_organization: any;
  is_Account: any;



}