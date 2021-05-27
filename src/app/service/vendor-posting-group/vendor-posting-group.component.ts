import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { VendorPostingGroupService } from "./vendor-posting-group.service";

@Component({
  selector: "app-vendor-posting-group",
  templateUrl: "./vendor-posting-group.component.html",
  styleUrls: ["./vendor-posting-group.component.css"],
})
export class VendorPostingGroupComponent implements OnInit {
  public vendorPostingGroups: any;
  public interestAccounts: any;
  public vendorPostingGroup: VendorPostingGroup;
  public chartOfAccountSearchResult: any;
  public IsAddFormVisible = true;

  constructor(
    private vendorPostingGroupService: VendorPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.vendorPostingGroup = new VendorPostingGroup();
  }

  ngOnInit() {
    this.getInterestAccounts();
    this.getVendorPostingGroups();
  }

  searchChartOfAccount(event): void {
    this.chartOfAccountSearchResult = this.interestAccounts.filter((c) =>
      c.account_ID.includes(event.query)
    );
  }

  getInterestAccounts() {
    this.vendorPostingGroupService.getInterestAccounts().subscribe(
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

  getVendorPostingGroups() {
    this.vendorPostingGroupService.getVendorPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.vendorPostingGroups = response["procVendorPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerVendorPostingGroup() {
    console.log("refac", this.refactorVendorObject(this.vendorPostingGroup));

    console.log("group", this.vendorPostingGroup);
    this.vendorPostingGroupService
      .addVendorPostingGroups(
        this.refactorVendorObject(this.vendorPostingGroup)
      )
      .subscribe(
        (response) => {
          this.getVendorPostingGroups();
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

  updateVendorPostingGroup(vendorPostingGroup) {
    this.vendorPostingGroupService
      .updateVendorPostingGroups(vendorPostingGroup)
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

  deleteVendorPostingGroup(vendorPostingGroup) {
    if (confirm("Are you sure!!!"))
      this.vendorPostingGroupService
        .deleteVendorPostingGroups(vendorPostingGroup)
        .subscribe(
          (response) => {
            this.getVendorPostingGroups();
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
  refactorVendorObject(object) {
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
    this.updateVendorPostingGroup(this.refactorVendorObject($event["data"]));
  }

  clearForm() {
    this.vendorPostingGroup = new VendorPostingGroup();
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class VendorPostingGroup {
  public code: any;
  public interest_Account: any;
  public payables_Account: any;
  public service_Charge_Account: any;
  public payment_Disc_Debit_Account: any;
  public payment_Disc_Credit_Account: any;
  public payment_tolerances_InDay: any;
  public isActive: any;
}
