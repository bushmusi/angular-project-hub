import { Component, OnInit,Input } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms'; 
import { ActualBudgetService } from '../actual-budget/actual-budget.service'
import { ToastrService } from 'ngx-toastr';
import { ServiceService } from '../service.service'

@Component({
  selector: 'app-actual-budget',
  templateUrl: './actual-budget.component.html',
  styleUrls: ['./actual-budget.component.css']
})
export class ActualBudgetComponent implements OnInit {

  actualBudgetFormGroup: FormGroup
  @Input() licenceData
  @Input() workingUser
  listItems: any
  isSelected: boolean = false
  listBudgetDetail: any

  constructor(
    private fb: FormBuilder,
    private actualBudgetService: ActualBudgetService,
    private serviceService: ServiceService,
    private notice: ToastrService
  ) { 
    this.createForm()
  }

  ngOnInit(): void {
    // this.listItems = [
    //   {
    //     'budget_ActualID' : 20025,
    //     'budget_DetailID' : "299e48db-8d37-24b4-f3af-6dbf4f3057b2",
    //     'account_ID' : 12,
    //     'actual_Cost' : 23
    //   }
    // ]
    this.getBudgetDetail()
    this.getActualBudget()
  }

  getBudgetDetail(){
    this.serviceService.loadBudgetDetail().subscribe(
      (res) => {
        this.listBudgetDetail = res['budgetDetailByDIVs']
      },
      (err) => {
        this.notice.error('Error getBudgetDetail',err.error)
        this.notice.error('Error getBudgetDetail',err.error['Message'])
        this.notice.error('Error getBudgetDetail',err.error['statusType'])
      }
    )
  }

  getActualBudget(){
    this.actualBudgetService.getActualBudget().subscribe(
      (res) => {
        this.listBudgetDetail = res['budgetDetailByDIVs']
      },
      (err) => {
        this.notice.error('Error getBudgetDetail',err.error)
        this.notice.error('Error getBudgetDetail',err.error['Message'])
        this.notice.error('Error getBudgetDetail',err.error['statusType'])
      }
    )
  }

  createForm(){
    this.actualBudgetFormGroup = this.fb.group({ 
      'budget_ActualID' : [''],
      'budget_DetailID' : [''],
      'account_ID' : ['',Validators.required],
      'actual_Cost' : ['',Validators.required]
    })
  }

  addActualBudget(data){

    this.actualBudgetService.addActualBudget(data.value).subscribe(
      (res) => {
        console.log("Successfully added: ",res);
        this.actualBudgetFormGroup.reset()
        this.notice.info('Success','Data added successfully')
      },
      (err) => {
        console.log("Error occured error: ",err);
        this.notice.error('Error',err.error)
        this.notice.error('Error',err.error['Message'])
        this.notice.error('Error',err.error['statusType'])
        
      }
    )
  }

  updateActualBudget(data){

    this.actualBudgetService.updateActualBudget(data.value).subscribe(
      (res) => {
        console.log("update success: ",res);
        this.actualBudgetFormGroup.reset()
        this.isSelected = false
        this.notice.info("Success","Successfully updated")
      },
      (err) => {
        console.log("Error update",err);
        this.notice.error('Error',err.error)
        this.notice.error('Error',err.error['Message'])
        this.notice.error('Error',err.error['statusType'])
        
      }
    )
  }

  deleteActualBudget(data){

    if (confirm("Are you sure")){
      this.actualBudgetService.deleteActualBudget(data.value).subscribe(
        (res) => {
          console.log("Delete success: ",res);
          this.notice.info("Success","Successfully Deleted")
          this.actualBudgetFormGroup.reset()
          this.isSelected = false
        },
        (err) => {
          console.log("Error Delete",err);
          this.notice.error('Error',err.error)
          this.notice.error('Error',err.error['Message'])
          this.notice.error('Error',err.error['statusType'])
          
        }
      )
    }

  }

  selectActualBudget(data){
    this.isSelected = true
    this.actualBudgetFormGroup.setValue({
      budget_ActualID: data.budget_ActualID,
      budget_DetailID: data.budget_DetailID,
      account_ID: data.account_ID,
      actual_Cost: data.actual_Cost
    })    
    
    
  }

}
