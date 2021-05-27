import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { AccountTypeService } from "./account-type.service";

@Component({
  selector: "app-account-type",
  templateUrl: "./account-type.component.html",
  styleUrls: ["./account-type.component.css"],
})
export class AccountTypeComponent implements OnInit {
  public accountTypes: any;
  public accountCategories: any;
  public accountType: AccountType;
  public IsAddFormVisible = false;

  constructor(
    private accountTypeService: AccountTypeService,
    private notificationsService: NotificationsService
  ) {
    this.accountType = new AccountType();
  }

  ngOnInit() {
    this.getAccountType();

    this.getAccountCategory();
  }

  getAccountCategory() {
    this.accountTypeService.getAccountCategory().subscribe(
      (response) => {
        console.log("group", response);
        this.accountCategories = response["accountCats"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  getAccountType() {
    this.accountTypeService.getAccountType().subscribe(
      (response) => {
        console.log("group", response);
        this.accountTypes = response["accountTypes"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerAccountType() {
    this.accountTypeService
      .addAccountType(this.refactorTaxProductionObject(this.accountType))
      .subscribe(
        (response) => {
          this.getAccountType();
          const toast = this.notificationsService.success("Success", "Saved");
          this.clearForm();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  updateAccountType(accountType) {
    console.log(accountType);

    this.accountTypeService.updateAccountType(accountType).subscribe(
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

  deleteAccountType(accountType) {
    if (confirm("Are you sure !!!"))
      this.accountTypeService.deleteAccountType(accountType).subscribe(
        (response) => {
          this.getAccountType();
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
  refactorTaxProductionObject(object) {
    //check if the object value has a value
    if (object.def_VAT_Prod_Posting_Group)
      //if the object values has a property 'code' return the code
      //else return the object value
      //this will extract the code
      object.def_VAT_Prod_Posting_Group =
        object.def_VAT_Prod_Posting_Group.code ||
        object.def_VAT_Prod_Posting_Group;

    return object;
  }

  performUpdate($event) {
    console.log("reroes", $event);
    this.updateAccountType(this.refactorTaxProductionObject($event["data"]));
  }

  clearForm() {
    this.accountType = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class AccountType {}
