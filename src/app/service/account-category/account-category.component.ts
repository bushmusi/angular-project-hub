import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { AccountCategoryService } from './account-category.service';

@Component({
  selector: 'app-account-category',
  templateUrl: './account-category.component.html',
  styleUrls: ['./account-category.component.css']
})
export class AccountCategoryComponent implements OnInit {

  public accountCategories: any;
  public accountCategory: AccountCategory;
  public IsAddFormVisible = false;

  constructor(
    private accountCategoryService: AccountCategoryService,
    private notificationsService: NotificationsService
  ) {
    this.accountCategory = new AccountCategory();
  }

  ngOnInit() {
    this.getAccountCategory();
  }

  getAccountCategory() {
    this.accountCategoryService.getAccountCategory().subscribe(
      (response) => {
        console.log("group", response);
        this.accountCategories =
          response["accountCats"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerAccountCategory() {
    this.accountCategoryService
      .addAccountCategory(
        this.refactorTaxProductionObject(this.accountCategory)
      )
      .subscribe(
        (response) => {
          this.getAccountCategory();
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

  updateAccountCategory(accountCategory) {
    console.log(accountCategory);

    this.accountCategoryService
      .updateAccountCategory(accountCategory)
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

  deleteAccountCategory(accountCategory) {
    
    if (confirm("Are you sure !!!"))
      this.accountCategoryService
        .deleteAccountCategory(accountCategory)
        .subscribe(
          (response) => {
            this.getAccountCategory();
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
    this.updateAccountCategory(this.refactorTaxProductionObject($event["data"]));

  }

  clearForm() {
    this.accountCategory = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class AccountCategory {}
