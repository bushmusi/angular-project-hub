import { Component, Input, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { BankAccountPostingGroupService } from "./bank-account-posting-group.service";

@Component({
  selector: "app-bank-account-posting-group",
  templateUrl: "./bank-account-posting-group.component.html",
  styleUrls: ["./bank-account-posting-group.component.css"],
})
export class BankAccountPostingGroupComponent implements OnInit {
  @Input() workingUser;

  public bankAccountPostingGroups: any;
  public bankAccountPostingGroup: BankAccountPostingGroup;
  public IsAddFormVisible = false;
  public chartOfAccounts: any;
  public chartOfAccountResult: any;

  constructor(
    private bankAccountPostingGroupService: BankAccountPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.bankAccountPostingGroup = new BankAccountPostingGroup();
  }

  ngOnInit() {
    this.getBankAccountPostingGroups();
    this.getChartOfAccounts();
  }

  searchChartOfAccount(event): void {
    this.chartOfAccountResult = this.chartOfAccounts.filter((c) =>
      c.account_ID.includes(event.query)
    );
  }

  getChartOfAccounts() {
    this.bankAccountPostingGroupService.getChartOfAccounts().subscribe(
      (response) => {
        console.log("group", response);
        this.chartOfAccounts = response["chartOfAccounts"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  getBankAccountPostingGroups() {
    this.bankAccountPostingGroupService.getBankAccountPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.bankAccountPostingGroups =
          response["procBankAccountPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerBankAccountPostingGroup() {
    this.bankAccountPostingGroup.orgid = this.workingUser.organization_code;

    this.bankAccountPostingGroupService
      .addBankAccountPostingGroup(
        this.refactorChartOfAccountObject(this.bankAccountPostingGroup)
      )
      .subscribe(
        (response) => {
          this.getBankAccountPostingGroups();
          const toast = this.notificationsService.success("Success", "Saved");
          this.clearForm();
        },
        (error) => {
          console.log("post-error", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  updateBankAccountPostingGroup(bankAccountPostingGroup) {
    this.bankAccountPostingGroupService
      .updateBankAccountPostingGroup(bankAccountPostingGroup)
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

  deleteBankAccountPostingGroup(bankAccountPostingGroup) {
    if (confirm("Are you sure !!!"))
      this.bankAccountPostingGroupService
        .deleteBankAccountPostingGroup(bankAccountPostingGroup)
        .subscribe(
          (response) => {
            this.getBankAccountPostingGroups();
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

  //Extract the code from the object
  refactorChartOfAccountObject(object) {
    //check if the object value has a value
    if (object.account_ID)
      //if the object values has a property 'code' return the code
      //else return the object value
      //this will extract the code
      object.account_ID = object.account_ID.account_ID || object.account_ID;

    return object;
  }

  performUpdate($event) {
    console.log("reroes", $event);
    this.updateBankAccountPostingGroup(
      this.refactorChartOfAccountObject($event["data"])
    );
  }

  clearForm() {
    this.bankAccountPostingGroup = new BankAccountPostingGroup();
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class BankAccountPostingGroup {
  public code: any;
  public name: any;
  public address: any;
  public phoneNumber: any;
  public account_ID: any;
  public orgid: any;
  public branch: any;
  public dufault: any;
}
