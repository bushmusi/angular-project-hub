import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { TabsetComponent } from "ngx-bootstrap";
import { BankReconciliationService } from "../bank-reconciliation/bank-reconciliation.service";
import { refactorDropdownArray } from "../helpers/helpers";
import { Guid } from "guid-typescript"; //guid excuter
import {FormGroup, FormBuilder,Validators } from '@angular/forms'

@Component({
  selector: "app-maintian-bank-reconciliation",
  templateUrl: "./maintian-bank-reconciliation.component.html",
  styleUrls: ["./maintian-bank-reconciliation.component.css"],
})
export class MaintianBankReconciliationComponent implements OnInit {
  public bankReconciliations: any;
  public reconciliationTypes: any;

  public bankReconciliationsSearchResult: any;
  isTransID:boolean=false
  bankReconTransactionList:any
  isThereTransRecord:boolean=false

  @ViewChild("tabset") tabset: TabsetComponent;
  @Input() bankReconciliation;
  @Input() edit_form;
  @Output() onclose = new EventEmitter();

  id: any

  userOrgId :any

  transIDFormGroup: FormGroup
  uuid:any

  goto(id) {
    this.tabset.tabs[id].active = true;
  }

  constructor(
    private bankReconciliationService: BankReconciliationService,
    private notificationsService: NotificationsService,
    private fb: FormBuilder
  ) {
    this.bankReconciliation = new BankReconciliation();
    this.getUserInfo()
    this.transIDFormGroup = this.fb.group({
      trans_ID: ['',Validators.required],
      statement_Date: ['',Validators.required],
      statement_No: ['',Validators.required],
      balance_Last_Statement:  ['',Validators.required],
      statement_Ending_Balance: ['',Validators.required],
    })

    this.uuid= Guid.create()
    this.transIDFormGroup.patchValue({
      trans_ID: this.uuid.value
    }) 
    
  }

  ngOnInit() {
    this.getBankReconciliations();
    this.getGetLookups();
    
    
  }

  addTransID(){

    this.bankReconciliationService.addTransID(this.transIDFormGroup.value).subscribe(
      (res) => {
        this.getBankReconTransactionID(this.uuid)
        this.isThereTransRecord = true
      },
      (err) =>{
        console.log("Error",err);
        
      }
    )
  }

  updateTransID(){
    this.bankReconciliationService.updateTransID(this.transIDFormGroup.value).subscribe(
      (res) => {
        this.getBankReconTransactionID(this.uuid)
      },
      (err) =>{
        console.log("Error",err);
        
      }
    )
  }





  getUserInfo(){

    this.bankReconciliationService.getUserInfo().subscribe(
      (res) => {
        console.log("user: ",res[0]);
        
        this.userOrgId = res[0]

        console.log('user org: ',this.userOrgId.organization_code);
        this.bankReconciliation.branch_ID = this.userOrgId.organization_code 
        
      },
      (err) => {
        console.log("Error user work info",err);
        
      }
    )
  }

  clearForm(){
    this.getUserInfo()
    this.bankReconciliation = new BankReconciliation();
    
    this.bankReconciliation.branch_ID = this.userOrgId.organization_code
  }

  ngOnChanges(changes): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (changes.bankReconciliation.currentValue) {
      this.bankReconciliation = changes.bankReconciliation.currentValue;
    }
  }

  getGetLookups() {
    this.bankReconciliationService.getLookup("type_Bank_Reconcilliation").subscribe((response) => {
      this.reconciliationTypes = refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      console.log("lookup", response);
    });
  }

  getBankReconciliations() {
    this.bankReconciliationService.getBankReconciliations().subscribe(
      (response) => {
        this.bankReconciliations = response["procBankReconciliations"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getBankReconTransactionID(id) {
    this.bankReconciliationService.getBankReconTransactionID(id).subscribe(
      (response) => {
        this.bankReconTransactionList = response["procJBankReconTransactions"];
        console.log("current trans list",this.bankReconTransactionList);
        
      },
      (error) => {
        console.log("error");
      }
    );
  }

  searchBankReconciliations(event): void {
      (c) => c.bankReconciliation_ID.includes(event.query)
  }

  selectTransID(){
    this.isTransID = true
    this.getBankReconTransactionID(this.bankReconciliation.trans_ID)
  }

  getBankReconTransaction(){
    this.bankReconciliationService.getBankReconTransaction().subscribe(
      (res) => {
        
        this.bankReconTransactionList = res['procJBankReconTransactions']
      },
      (err) => {

      }
    )
  }

  getTransID(data){
    this.bankReconciliation.trans_ID = data.trans_ID
    this.bankReconciliation.transaction_Date = data.statement_Date
    this.isTransID = false
  }


  registerBankReconciliation() {
    console.log(this.bankReconciliation);
    this.id = Guid.create()
    this.bankReconciliation.branch_ID = this.id.value
    this.bankReconciliationService
      .registerBankReconciliation(this.bankReconciliation)
      .subscribe(
        (response) => {
          this.getBankReconciliations();
          this.bankReconciliation = new BankReconciliation();
          this.bankReconciliation.branch_ID = this.userOrgId.organization_code 
          const toast = this.notificationsService.success("Success", "Saved");
          this.closeup();
        },
        (error) => {
          console.log("res", error);

          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  updateBankReconciliation() {

    this.bankReconciliationService
      .updateBankReconciliation(this.bankReconciliation)
      .subscribe(
        (response) => {
          this.getBankReconciliations();
          this.bankReconciliation.branch_ID = this.userOrgId.organization_code 
          const toast = this.notificationsService.success("Success", "Saved");
          this.edit_form = false
          this.clearForm()
          this.closeup();
        },
        (error) => {
          console.log("res", error);

          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  deleteBankReconciliation() {
    if (confirm("are you sure you went to delete the selected item"))
      this.bankReconciliationService
        .deleteBankReconciliation(this.bankReconciliation)
        .subscribe(
          (response) => {
            this.getBankReconciliations();
            this.bankReconciliation.branch_ID = this.userOrgId.organization_code 
            const toast = this.notificationsService.success("Success", "Saved");
            this.edit_form = false
            this.clearForm()
            this.closeup();
          },
          (error) => {
            console.log("res", error);

            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        );
  }

  cleanUp() {
    // this.edit_form = false;
  }
  closeup() {
    this.onclose.emit();
  }
}

class BankReconciliation {
  public name: String;
  public bankReconciliation_ID: string;
  public org_Code: String;
  public address: string;
  public website: String;
  public sales_Tax_Type: string;
  public bankReconciliation_Posting_Group: String;
  public gen_Bus_Posting_Group: string;
}
