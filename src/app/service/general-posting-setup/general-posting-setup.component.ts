import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { refactorDropdownArray } from "../helpers/helpers";
import { GeneralPosting } from "../models/generalPosting";
import { GenaeralPostingSetupService } from "./general-posting-setup-service.service";

@Component({
  selector: "app-general-posting-setup",
  templateUrl: "./general-posting-setup.component.html",
  styleUrls: ["./general-posting-setup.component.css"],
})
export class GeneralPostingSetupComponent implements OnInit {
  GeneralPostingSetupList;
  newGeneralPosting: GeneralPosting;
  ChartOfAccounts;
  FilteredChartOfAccounts;
  isnew;
  public businessGroupPostings;
  public productPostingGroups;

  constructor(
    private notificationsService: NotificationsService,
    private _GeneralPostingSetupService: GenaeralPostingSetupService
  ) {}

  ngOnInit() {
    this.isnew = false;
    this.newGeneralPosting = new GeneralPosting();
    this.getGeneralPostingSetupList();
    this.getChartOfAccount();
    this.getBusinessPostingGroups();
    this.getProductPostingGroups();
  }

  getBusinessPostingGroups() {
    this._GeneralPostingSetupService.getBusinessPostings().subscribe(
      (response) => {
        this.businessGroupPostings = refactorDropdownArray(
          response["procGenBusPostingGroupss"],
          "description",
          "code"
        );
      },
      (error) => {
        console.log("getGeneralPostingSetupList error");
      }
    );
  }

  getProductPostingGroups() {
    this._GeneralPostingSetupService.getProductPostings().subscribe(
      (response) => {
        this.productPostingGroups = refactorDropdownArray(
          response["procGenProductPostingGroupLoadAlls"],
          "description",
          "code"
        );
      },
      (error) => {
        console.log("getGeneralPostingSetupList error");
      }
    );
  }

  getGeneralPostingSetupList() {
    this._GeneralPostingSetupService.getGeneralPostingSetupList().subscribe(
      (GeneralPostingSetupList) => {
        this.GeneralPostingSetupList = GeneralPostingSetupList;
        this.GeneralPostingSetupList = Object.assign(
          [],
          this.GeneralPostingSetupList.procGeneralPostingSetupss
        );
        console.log(
          "getGeneralPostingSetupList" , this.GeneralPostingSetupList
        );
      },
      (error) => {
        console.log("getGeneralPostingSetupList error");
      }
    );
  }

  showAddnew() {
    this.isnew = true;
  }

  saveNewGeneralPosting() {
    console.log(
      "newGeneralPosting => " +
        this.refractorGeneralPostingObj(this.newGeneralPosting)
    );

    this._GeneralPostingSetupService
      .saveNewGeneralPosting(
        this.refractorGeneralPostingObj(this.newGeneralPosting)
      )
      .subscribe(
        (result) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "New General Posting Saved"
          );
          this.getGeneralPostingSetupList();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
          console.log("saveNewGeneralPosting error" , error);
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
    console.log("FilteredChartOfAccounts " , this.FilteredChartOfAccounts);
  }

  getChartOfAccount() {
    this._GeneralPostingSetupService.getChartOfAccount().subscribe(
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

  updateGeneralPosting(e) {
    console.log(
      "GeneralPosting UPDATE => " , this.refractorGeneralPostingObj(e.data)
    );
    this._GeneralPostingSetupService
      .updateGeneralPosting(this.refractorGeneralPostingObj(e.data))
      .subscribe(
        (result) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "General Posting Updated"
          );
          this.getGeneralPostingSetupList();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
          console.log("updateGeneralPosting error" , error);
        }
      );
  }

  deleteGeneralPosting(e) {
    console.log("GeneralPosting delete => " + e);
    this._GeneralPostingSetupService.deleteGeneralPosting(e).subscribe(
      (result) => {
        const toast = this.notificationsService.success(
          "Sucess",
          "General Posting Deleted"
        );
        this.getGeneralPostingSetupList();
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
        console.log("updateGeneralPosting error" , error);
      }
    );
  }

  refractorGeneralPostingObj(i: GeneralPosting) {
    let generalPosting: GeneralPosting;
    generalPosting = new GeneralPosting();

    generalPosting.gen_Bus_Posting_Group = i.gen_Bus_Posting_Group;

    if (i.gen_Pord_Posting_Group) {
      if (i.gen_Pord_Posting_Group.account_ID) {
        generalPosting.gen_Pord_Posting_Group =
          i.gen_Pord_Posting_Group.account_ID;
      } else {
        generalPosting.gen_Pord_Posting_Group = i.gen_Pord_Posting_Group;
      }
    }

    if (i.sales_Account) {
      if (i.sales_Account.account_ID) {
        generalPosting.sales_Account = i.sales_Account.account_ID;
      } else {
        generalPosting.sales_Account = i.sales_Account;
      }
    }

    if (i.sales_Credit_Memo_Account) {
      if (i.sales_Credit_Memo_Account.account_ID) {
        generalPosting.sales_Credit_Memo_Account =
          i.sales_Credit_Memo_Account.account_ID;
      } else {
        generalPosting.sales_Credit_Memo_Account = i.sales_Credit_Memo_Account;
      }
    }

    if (i.sales_Line_Disc_Account) {
      if (i.sales_Line_Disc_Account.account_ID) {
        generalPosting.sales_Line_Disc_Account =
          i.sales_Line_Disc_Account.account_ID;
      } else {
        generalPosting.sales_Line_Disc_Account = i.sales_Line_Disc_Account;
      }
    }

    if (i.sales_Inv_Disc_Account) {
      if (i.sales_Inv_Disc_Account.account_ID) {
        generalPosting.sales_Inv_Disc_Account =
          i.sales_Inv_Disc_Account.account_ID;
      } else {
        generalPosting.sales_Inv_Disc_Account = i.sales_Inv_Disc_Account;
      }
    }

    if (i.sales_pmt_Disc_Debit_Account) {
      if (i.sales_pmt_Disc_Debit_Account.account_ID) {
        generalPosting.sales_pmt_Disc_Debit_Account =
          i.sales_pmt_Disc_Debit_Account.account_ID;
      } else {
        generalPosting.sales_pmt_Disc_Debit_Account =
          i.sales_pmt_Disc_Debit_Account;
      }
    }

    if (i.sales_pmt_tol_debit_Account) {
      if (i.sales_pmt_tol_debit_Account.account_ID) {
        generalPosting.sales_pmt_tol_debit_Account =
          i.sales_pmt_tol_debit_Account.account_ID;
      } else {
        generalPosting.sales_pmt_tol_debit_Account =
          i.sales_pmt_tol_debit_Account;
      }
    }

    if (i.sales_pmt_Tol_credit_Account) {
      if (i.sales_pmt_Tol_credit_Account.account_ID) {
        generalPosting.sales_pmt_Tol_credit_Account =
          i.sales_pmt_Tol_credit_Account.account_ID;
      } else {
        generalPosting.sales_pmt_Tol_credit_Account =
          i.sales_pmt_Tol_credit_Account;
      }
    }

    if (i.sales_Prepayment_Account) {
      if (i.sales_Prepayment_Account.account_ID) {
        generalPosting.sales_Prepayment_Account =
          i.sales_Prepayment_Account.account_ID;
      } else {
        generalPosting.sales_Prepayment_Account = i.sales_Prepayment_Account;
      }
    }

    if (i.purch_Account) {
      if (i.purch_Account.account_ID) {
        generalPosting.purch_Account = i.purch_Account.account_ID;
      } else {
        generalPosting.purch_Account = i.purch_Account;
      }
    }

    if (i.purch_credit_Memo_Account) {
      if (i.purch_credit_Memo_Account.account_ID) {
        generalPosting.purch_credit_Memo_Account =
          i.purch_credit_Memo_Account.account_ID;
      } else {
        generalPosting.purch_credit_Memo_Account = i.purch_credit_Memo_Account;
      }
    }

    if (i.purch_Line_Disc_Account) {
      if (i.purch_Line_Disc_Account.account_ID) {
        generalPosting.purch_Line_Disc_Account =
          i.purch_Line_Disc_Account.account_ID;
      } else {
        generalPosting.purch_Line_Disc_Account = i.purch_Line_Disc_Account;
      }
    }

    if (i.purch_pmt_Disc_debit_Account) {
      if (i.purch_pmt_Disc_debit_Account.account_ID) {
        generalPosting.purch_pmt_Disc_debit_Account =
          i.purch_pmt_Disc_debit_Account.account_ID;
      } else {
        generalPosting.purch_pmt_Disc_debit_Account =
          i.purch_pmt_Disc_debit_Account;
      }
    }

    if (i.purch_FA_Disc_Account) {
      if (i.purch_FA_Disc_Account.account_ID) {
        generalPosting.purch_FA_Disc_Account =
          i.purch_FA_Disc_Account.account_ID;
      } else {
        generalPosting.purch_FA_Disc_Account = i.purch_FA_Disc_Account;
      }
    }

    if (i.purch_pmt_tol_debit_Account) {
      if (i.purch_pmt_tol_debit_Account.account_ID) {
        generalPosting.purch_pmt_tol_debit_Account =
          i.purch_pmt_tol_debit_Account.account_ID;
      } else {
        generalPosting.purch_pmt_tol_debit_Account =
          i.purch_pmt_tol_debit_Account;
      }
    }

    if (i.purch_pmt_tol_Credit_Account) {
      if (i.purch_pmt_tol_Credit_Account.account_ID) {
        generalPosting.purch_pmt_tol_Credit_Account =
          i.purch_pmt_tol_Credit_Account.account_ID;
      } else {
        generalPosting.purch_pmt_tol_Credit_Account =
          i.purch_pmt_tol_Credit_Account;
      }
    }

    if (i.purch_prepayments_Account) {
      if (i.purch_prepayments_Account.account_ID) {
        generalPosting.purch_prepayments_Account =
          i.purch_prepayments_Account.account_ID;
      } else {
        generalPosting.purch_prepayments_Account = i.purch_prepayments_Account;
      }
    }

    if (i.inV_COGS_Account) {
      if (i.inV_COGS_Account.account_ID) {
        generalPosting.inV_COGS_Account = i.inV_COGS_Account.account_ID;
      } else {
        generalPosting.inV_COGS_Account = i.inV_COGS_Account;
      }
    }

    if (i.inV_COGS_Account_Interim) {
      if (i.inV_COGS_Account_Interim.account_ID) {
        generalPosting.inV_COGS_Account_Interim =
          i.inV_COGS_Account_Interim.account_ID;
      } else {
        generalPosting.inV_COGS_Account_Interim = i.inV_COGS_Account_Interim;
      }
    }

    if (i.inV_Adjmt_Account) {
      if (i.inV_Adjmt_Account.account_ID) {
        generalPosting.inV_Adjmt_Account = i.inV_Adjmt_Account.account_ID;
      } else {
        generalPosting.inV_Adjmt_Account = i.inV_Adjmt_Account;
      }
    }

    if (i.inV_Accrual_Account_Interim) {
      if (i.inV_Accrual_Account_Interim.account_ID) {
        generalPosting.inV_Accrual_Account_Interim =
          i.inV_Accrual_Account_Interim.account_ID;
      } else {
        generalPosting.inV_Accrual_Account_Interim =
          i.inV_Accrual_Account_Interim;
      }
    }

    if (i.direct_Cost_Applied_Account) {
      if (i.direct_Cost_Applied_Account.account_ID) {
        generalPosting.direct_Cost_Applied_Account =
          i.direct_Cost_Applied_Account.account_ID;
      } else {
        generalPosting.direct_Cost_Applied_Account =
          i.direct_Cost_Applied_Account;
      }
    }

    if (i.overhead_Applied_Account) {
      if (i.overhead_Applied_Account.account_ID) {
        generalPosting.overhead_Applied_Account =
          i.overhead_Applied_Account.account_ID;
      } else {
        generalPosting.overhead_Applied_Account = i.overhead_Applied_Account;
      }
    }

    if (i.purchase_Variance_Account) {
      if (i.purchase_Variance_Account.account_ID) {
        generalPosting.purchase_Variance_Account =
          i.purchase_Variance_Account.account_ID;
      } else {
        generalPosting.purchase_Variance_Account = i.purchase_Variance_Account;
      }
    }

    return generalPosting;
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
