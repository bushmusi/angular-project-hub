import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { CustomerPostingGroupService } from "./customer-posting-group.service";

@Component({
  selector: "app-customer-posting-group",
  templateUrl: "./customer-posting-group.component.html",
  styleUrls: ["./customer-posting-group.component.css"],
})
export class CustomerPostingGroupComponent implements OnInit {
  public customerPostingGroups: any;
  public interestAccounts: any;
  public customerPostingGroup: CustomerPostingGroup;
  public chartOfAccountSearchResult: any;
  public IsAddFormVisible = true;

  constructor(
    private customerPostingGroupService: CustomerPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.customerPostingGroup = new CustomerPostingGroup();
  }

  ngOnInit() {
    this.getInterestAccounts();
    this.getCustomerPostingGroups();
  }

  searchChartOfAccount(event): void {
    this.chartOfAccountSearchResult = this.interestAccounts.filter((c) =>
      c.account_ID.includes(event.query)
    );
  }

  getInterestAccounts() {
    this.customerPostingGroupService.getInterestAccounts().subscribe(
      (response) => {
        console.log("group", response);
        this.interestAccounts = response["chartOfAccounts"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  getCustomerPostingGroups() {
    this.customerPostingGroupService.getCustomerPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.customerPostingGroups = response["procCustomerPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerCustomerPostingGroup() {
    console.log(
      "refac",
      this.refactorCustomerObject(this.customerPostingGroup)
    );

    console.log("group", this.customerPostingGroup);
    this.customerPostingGroupService
      .addCustomerPostingGroups(
        this.refactorCustomerObject(this.customerPostingGroup)
      )
      .subscribe(
        (response) => {
          this.getCustomerPostingGroups();
          const toast = this.notificationsService.success("Success", "Saved");
          this.clearForm();
        },
        (error) => {
          console.log("group", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  updateCustomerPostingGroup(customerPostingGroup) {
    this.customerPostingGroupService
      .updateCustomerPostingGroups(customerPostingGroup)
      .subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "Saved");
        },
        (error) => {
          console.log("reroes", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  deleteCustomerPostingGroup(customerPostingGroup) {
    if (confirm("Are you sure!!!"))
      this.customerPostingGroupService
        .deleteCustomerPostingGroups(customerPostingGroup)
        .subscribe(
          (response) => {
            this.getCustomerPostingGroups();
            const toast = this.notificationsService.success("Success", "Saved");
          },
          (error) => {
            console.log("reroes", error);
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        );
  }

  //Extract the account id from the object
  refactorCustomerObject(object) {
    //check if the object value has a value
    if (object.payables_Account)
      //if the object values has a property 'account_ID' return the account id
      //else return the object value
      //this will extract the account_ID
      object.payables_Account =
        object.payables_Account.account_ID || object.payables_Account;

    if (object.service_Charge_Account)
      object.service_Charge_Account =
        object.service_Charge_Account.account_ID ||
        object.service_Charge_Account;

    if (object.payment_Disc_Credit_Account)
      object.payment_Disc_Credit_Account =
        object.payment_Disc_Credit_Account.account_ID ||
        object.payment_Disc_Credit_Account;

    if (object.payment_Disc_Debit_Account)
      object.payment_Disc_Debit_Account =
        object.payment_Disc_Debit_Account.account_ID ||
        object.payment_Disc_Debit_Account;

    if (object.interest_Account)
      object.interest_Account =
        object.interest_Account.account_ID || object.interest_Account;

    return object;
  }

  //handel change event
  performUpdate($event) {
    this.updateCustomerPostingGroup(
      this.refactorCustomerObject($event["data"])
    );
  }

  clearForm() {
    this.customerPostingGroup = new CustomerPostingGroup();
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class CustomerPostingGroup {
  public code: any;
  public interest_Account: any;
  public payables_Account: any;
  public service_Charge_Account: any;
  public payment_Disc_Debit_Account: any;
  public payment_Disc_Credit_Account: any;
  public payment_tolerances_InDay: any;
  public isActive: any;
}
