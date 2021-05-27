import { Component, OnInit } from "@angular/core";
import { TaxPostingSetupService } from "./tax-posting-set-up-service.service";
import { TaxPosting } from "../models/TaxPosting";
import { NotificationsService } from "angular2-notifications";
import { refactorDropdownArray } from "../helpers/helpers";

@Component({
  selector: "app-tax-posting-set-up",
  templateUrl: "./tax-posting-set-up.component.html",
  styleUrls: ["./tax-posting-set-up.component.css"],
})
export class TaxPostingSetUpComponent implements OnInit {
  TaxPostingSetupList;
  newTaxPosting: TaxPosting;
  ChartOfAccounts;
  FilteredChartOfAccounts = [];
  isnew;
  cities1;

  public taxProdPostingGroups = [];
  public taxBusPostingGroups = [];

  constructor(
    private notificationsService: NotificationsService,
    private _TaxPostingSetupService: TaxPostingSetupService
  ) {}

  ngOnInit() {
    this.isnew = false;
    this.newTaxPosting = new TaxPosting();
    this.getTaxPostingSetupList();
    this.getChartOfAccount();
    this.getTaxProdPostingGroups();
    this.getTaxBusPostingGroups();
  }

  getTaxProdPostingGroups() {
    this._TaxPostingSetupService.getTaxProdPostingGroups().subscribe(
      (response) => {
        this.taxProdPostingGroups = refactorDropdownArray(response['procTAXProdPostingGroups'], 'description', 'code');
        console.log("getTaxProdPostingGroups-response", response['procTAXProdPostingGroups']);
      }, (error) => {
        console.log("getTaxProdPostingGroups-error", error);
        
      }
    )
  }

  getTaxBusPostingGroups() {
    this._TaxPostingSetupService.getTaxBusPostingGroups().subscribe(
      (response) => {
        this.taxBusPostingGroups = refactorDropdownArray(response['procTAXBusPostingGroups'], 'description', 'code');
        console.log("procTAXBusPostingGroups-response", response['procTAXBusPostingGroups']);
      }, (error) => {
        console.log("procTAXBusPostingGroups-error", error);
        
      }
    )
  }

  getTaxPostingSetupList() {
    this._TaxPostingSetupService.getTaxPostingSetupList().subscribe(
      (taxPostingSetupList) => {
        this.TaxPostingSetupList = taxPostingSetupList;
        this.TaxPostingSetupList = Object.assign(
          [],
          this.TaxPostingSetupList.proccTAXPostingSetupLoadAlls
        );
        console.log("getTaxPostingSetupList", this.TaxPostingSetupList);
      },
      (error) => {
        console.log("getTaxPostingSetupList error");
      }
    );
  }



  showAddnew() {
    this.isnew = true;
  }

  saveNewTaxPosting() {
    console.log(
      "newTaxPosting => ",
      this.refractorTaxPostingObj(this.newTaxPosting)
    );

    this._TaxPostingSetupService
      .saveNewTaxPosting(this.refractorTaxPostingObj(this.newTaxPosting))
      .subscribe(
        (result) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "New Tax Posting Saved"
          );
          this.getTaxPostingSetupList();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
          console.log("saveNewTaxPosting error", error);
        }
      );
  }

  cancelForm() {
    this.isnew = false;
  }

  searchChartOfAccount(event) {
    this.FilteredChartOfAccounts = this.ChartOfAccounts.filter((c) =>
      c.account_ID.includes(event.query)
    );
    console.log("FilteredChartOfAccounts " + this.FilteredChartOfAccounts);
  }

  getChartOfAccount() {
    this._TaxPostingSetupService.getChartOfAccount().subscribe(
      (chartOfAccounts) => {
        this.ChartOfAccounts = chartOfAccounts;
        this.ChartOfAccounts = Object.assign(
          [],
          this.ChartOfAccounts.chartOfAccounts
        );
        console.log("getChartOfAccount", this.ChartOfAccounts);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  updateTaxPosting(e) {
    console.log("TaxPosting UPDATE => ", this.refractorTaxPostingObj(e.data));
    this._TaxPostingSetupService
      .updateTaxPosting(this.refractorTaxPostingObj(e.data))
      .subscribe(
        (result) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "Tax Posting Updated"
          );
          this.getTaxPostingSetupList();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
          console.log("updateTaxPosting error", error);
        }
      );
  }

  deleteTaxPosting(e) {
    console.log("TaxPosting delete => ", e);
    this._TaxPostingSetupService.deleteTaxPosting(e).subscribe(
      (result) => {
        const toast = this.notificationsService.success(
          "Sucess",
          "Tax Posting Deleted"
        );
        this.getTaxPostingSetupList();
        this.clearForm();
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
        console.log("updateTaxPosting error", error);
      }
    );
  }

  clearForm() {
    this.newTaxPosting = new TaxPosting();
  }
  refractorTaxPostingObj(i: TaxPosting) {
    let taxPosting: TaxPosting;
    taxPosting = new TaxPosting();

    taxPosting.taX_BusPosting_Group = i.taX_BusPosting_Group;

    if (i.taX_Prod_Psting_Group) {
      if (i.taX_Prod_Psting_Group.account_ID) {
        taxPosting.taX_Prod_Psting_Group = i.taX_Prod_Psting_Group.account_ID;
      } else {
        taxPosting.taX_Prod_Psting_Group = i.taX_Prod_Psting_Group;
      }
    }

    if (i.taX_Prod_Psting_Group) {
      if (i.taX_Prod_Psting_Group.account_ID) {
        taxPosting.taX_Prod_Psting_Group = i.taX_Prod_Psting_Group.account_ID;
      } else {
        taxPosting.taX_Prod_Psting_Group = i.taX_Prod_Psting_Group;
      }
    }

    if (i.taX_Per) {
      if (i.taX_Per.account_ID) {
        taxPosting.taX_Per = i.taX_Per.account_ID;
      } else {
        taxPosting.taX_Per = i.taX_Per;
      }
    }

    if (i.sales_TAX_GL_Account) {
      if (i.sales_TAX_GL_Account.account_ID) {
        taxPosting.sales_TAX_GL_Account = i.sales_TAX_GL_Account.account_ID;
      } else {
        taxPosting.sales_TAX_GL_Account = i.taX_Per;
      }
    }

    if (i.purchase_TAX_Account) {
      if (i.purchase_TAX_Account.account_ID) {
        taxPosting.purchase_TAX_Account = i.purchase_TAX_Account.account_ID;
      } else {
        taxPosting.purchase_TAX_Account = i.taX_Per;
      }
    }

    if (i.reverse_Chrg_TAX_Account) {
      if (i.reverse_Chrg_TAX_Account.account_ID) {
        taxPosting.reverse_Chrg_TAX_Account =
          i.reverse_Chrg_TAX_Account.account_ID;
      } else {
        taxPosting.reverse_Chrg_TAX_Account = i.taX_Per;
      }
    }

    taxPosting.isActive = i.isActive;

    return taxPosting;
  }

  isNotNull(obj) {
    if (obj != null) {
      if (obj.account_ID != null) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
