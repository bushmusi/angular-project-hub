import { Component, OnInit } from "@angular/core";
import { InventoryPostingSetupService } from "./Inventory-posting-setup-service.service";
import { InventoryPosting } from "../models/InventoryPosting";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-inventory-posting-setup",
  templateUrl: "./inventory-posting-setup.component.html",
  styleUrls: ["./inventory-posting-setup.component.css"],
})
export class InventoryPostingSetupComponent implements OnInit {
  InventoryPostingSetupList;
  newInventoryPosting: InventoryPosting;
  ChartOfAccounts;
  FilteredChartOfAccounts;
  isnew;
  cities1;
  public inventoryPostingGroups: any;

  constructor(
    private notificationsService: NotificationsService,
    private _InventoryPostingSetupService: InventoryPostingSetupService
  ) {}

  ngOnInit() {
    this.isnew = false;
    this.newInventoryPosting = new InventoryPosting();
    this.getInventoryPostingSetupList();
    this.getChartOfAccount();
    this.getInventoryPostingPostingGroups();
  }

  getInventoryPostingPostingGroups() {
    this._InventoryPostingSetupService.getInventoryPostingGroups().subscribe(
      (response) => {
        this.inventoryPostingGroups = response["procInventoryPostingGroups"];

        console.log(
          "inventoryPostingGroups",
          response
        );
      },
      (error) => {
        console.log("getInventoryPostingSetupList error");
      }
    );
  }

  getInventoryPostingSetupList() {
    this._InventoryPostingSetupService.getInventoryPostingSetupList().subscribe(
      (inventoryPostingSetupList) => {
        this.InventoryPostingSetupList = inventoryPostingSetupList;
        this.InventoryPostingSetupList = Object.assign(
          [],
          this.InventoryPostingSetupList.procInventoryPostingSetupLoadAlls
        );
        console.log(
          "getInventoryPostingSetupList",
          this.InventoryPostingSetupList
        );
      },
      (error) => {
        console.log("getInventoryPostingSetupList error");
      }
    );
  }

  showAddnew() {
    this.isnew = true;
  }

  saveNewInventoryPosting() {
    console.log(
      "newInventoryPosting => ",
      this.refractorInventoryPostingObj(this.newInventoryPosting)
    );

    this._InventoryPostingSetupService
      .saveNewInventoryPosting(
        this.refractorInventoryPostingObj(this.newInventoryPosting)
      )
      .subscribe(
        (result) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "New Inventory Posting Saved"
          );
          this.getInventoryPostingSetupList();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
          console.log("saveNewInventoryPosting error", error);
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
    // console.log("FilteredChartOfAccounts " + this.FilteredChartOfAccounts);
  }

  getChartOfAccount() {
    this._InventoryPostingSetupService.getChartOfAccount().subscribe(
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

  updateInventoryPosting(e) {
    console.log(
      "inventoryPosting UPDATE => ",
      this.refractorInventoryPostingObj(e.data)
    );
    this._InventoryPostingSetupService
      .updateInventoryPosting(this.refractorInventoryPostingObj(e.data))
      .subscribe(
        (result) => {
          const toast = this.notificationsService.success(
            "Sucess",
            "Inventory Posting Updated"
          );
          this.getInventoryPostingSetupList();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
          console.log("updateInventoryPosting error", error);
        }
      );
  }

  deleteInventoryPosting(e) {
    console.log("inventoryPosting delete => ", e);
    this._InventoryPostingSetupService.deleteInventoryPosting(e).subscribe(
      (result) => {
        const toast = this.notificationsService.success(
          "Sucess",
          "Inventory Posting Deleted"
        );
        this.getInventoryPostingSetupList();
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
        console.log("updateInventoryPosting error", error);
      }
    );
  }

  refractorInventoryPostingObj(i: InventoryPosting) {
    let inventoryPosting: InventoryPosting;
    inventoryPosting = new InventoryPosting();

    inventoryPosting.store_Code = i.store_Code;

    if (i.invt_Posting_Group_Code) {
      if (i.invt_Posting_Group_Code.account_ID) {
        inventoryPosting.invt_Posting_Group_Code =
          i.invt_Posting_Group_Code.account_ID;
      } else {
        inventoryPosting.invt_Posting_Group_Code = i.invt_Posting_Group_Code;
      }
    }

    if (i.sales_Account) {
      if (i.sales_Account.account_ID) {
        inventoryPosting.sales_Account = i.sales_Account.account_ID;
      } else {
        inventoryPosting.sales_Account = i.sales_Account;
      }
    }

    if (i.cost_of_Sales_Account) {
      if (i.cost_of_Sales_Account.account_ID) {
        inventoryPosting.cost_of_Sales_Account =
          i.cost_of_Sales_Account.account_ID;
      } else {
        inventoryPosting.cost_of_Sales_Account = i.cost_of_Sales_Account;
      }
    }

    if (i.cost_of_good_Sold) {
      if (i.cost_of_good_Sold.account_ID) {
        inventoryPosting.cost_of_good_Sold = i.cost_of_good_Sold.account_ID;
      } else {
        inventoryPosting.cost_of_good_Sold = i.cost_of_good_Sold;
      }
    }

    if (i.inventory_Account) {
      if (i.inventory_Account.account_ID) {
        inventoryPosting.inventory_Account = i.inventory_Account.account_ID;
      } else {
        inventoryPosting.inventory_Account = i.inventory_Account;
      }
    }

    if (i.wiP_Account) {
      if (i.wiP_Account.account_ID) {
        inventoryPosting.wiP_Account = i.wiP_Account.account_ID;
      } else {
        inventoryPosting.wiP_Account = i.wiP_Account;
      }
    }

    if (i.material_Varicance_Account) {
      if (i.material_Varicance_Account.account_ID) {
        inventoryPosting.material_Varicance_Account =
          i.material_Varicance_Account.account_ID;
      } else {
        inventoryPosting.material_Varicance_Account =
          i.material_Varicance_Account;
      }
    }

    if (i.capacity_Varicance_Account) {
      if (i.capacity_Varicance_Account.account_ID) {
        inventoryPosting.capacity_Varicance_Account =
          i.capacity_Varicance_Account.account_ID;
      } else {
        inventoryPosting.capacity_Varicance_Account =
          i.capacity_Varicance_Account;
      }
    }

    if (i.sub_Contractor_Varicance_Account) {
      if (i.sub_Contractor_Varicance_Account.account_ID) {
        inventoryPosting.sub_Contractor_Varicance_Account =
          i.sub_Contractor_Varicance_Account.account_ID;
      } else {
        inventoryPosting.sub_Contractor_Varicance_Account =
          i.sub_Contractor_Varicance_Account;
      }
    }

    if (i.cap_Overhead_Varance_Account) {
      if (i.cap_Overhead_Varance_Account.account_ID) {
        inventoryPosting.cap_Overhead_Varance_Account =
          i.cap_Overhead_Varance_Account.account_ID;
      } else {
        inventoryPosting.cap_Overhead_Varance_Account =
          i.cap_Overhead_Varance_Account;
      }
    }

    return inventoryPosting;
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
