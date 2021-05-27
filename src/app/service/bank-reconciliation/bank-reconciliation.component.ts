import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { BankReconciliationService } from './bank-reconciliation.service';

@Component({
  selector: 'app-bank-reconciliation',
  templateUrl: './bank-reconciliation.component.html',
  styleUrls: ['./bank-reconciliation.component.css']
})
export class BankReconciliationComponent implements OnInit {

  @ViewChild("tabset") tabset: TabsetComponent;
  @Input() workingUser;

  public bankReconciliations: any;

  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  bankReconciliation: BankReconciliation;
  public edit_form = false;
  userOrgId: any

  constructor(private bankReconciliationService: BankReconciliationService) {
    this.bankReconciliation = new BankReconciliation();
  }

  ngOnInit() {
    // this.goto(1);
    this.getBankReconciliations();
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

  getBankReconciliations() {
    this.bankReconciliationService.getBankReconciliations().subscribe(
      (response) => {
        this.bankReconciliations = response["procJBankAccReconciliations"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  selectBankReconciliation($event, bankReconciliation) {
    console.log(bankReconciliation)
    $event.preventDefault();
    this.edit_form = true;
    this.bankReconciliation = bankReconciliation;
    this.goto(0);
  }

  addNewBankReconciliation() {
    this.bankReconciliation = new BankReconciliation();
    this.getUserInfo()
    this.edit_form = false;
    this.goto(0);
  }
  
  closeup() {
    this.goto(1);
    // this.bankReconciliation = new BankReconciliation();
    this.getBankReconciliations();
  }
}

class BankReconciliation {
  branch_ID: any
}
