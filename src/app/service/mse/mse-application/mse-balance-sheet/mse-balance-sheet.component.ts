import { Component, Input, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { MseService } from "../../mse.service";

@Component({
  selector: "app-mse-balance-sheet",
  templateUrl: "./mse-balance-sheet.component.html",
  styleUrls: ["./mse-balance-sheet.component.css"]
})
export class MseBalanceSheetComponent implements OnInit {
  @Input() singleWin;

  mSEBalanceSheet: MSEBalanceSheet;
  students: any;
  batches: any;
  mSEBalanceSheets: any;
  editForm = false;

  constructor(
    private mseService: MseService,
    private notificationsService: NotificationsService
  ) {
    this.clearForm();
  }

  ngOnInit() {
    this.getMSEBalanceSheets();
  }

  ngOnChanges(changes) {
    console.log("changes", changes);

    if (changes.singleWin) {
      this.mSEBalanceSheet.tin = changes.singleWin.currentValue.tin;
    }
  }

  getMSEBalanceSheets() {
    this.mseService.getMSEBalanceSheets().subscribe(
      response => {
        console.log("get-all", response);
        this.mSEBalanceSheets = response["procMSEBalanceSheets"];
      },
      error => {
        console.log("get-all-error", error);
      }
    );
  }

  registerMSEBalanceSheet() {
    console.log(this.mSEBalanceSheet);

    this.mseService.registerMSEBalanceSheet(this.mSEBalanceSheet).subscribe(
      response => {
        const toast = this.notificationsService.success("Success", "Saved");
        console.log("post", response);
        this.getMSEBalanceSheets();
      },
      error => {
        const toast = this.notificationsService.error(
          "error",
          "Something went wrong"
        );
        console.log("post-error", error);
      }
    );
  }

  updateMSEBalanceSheet() {
    console.log(this.mSEBalanceSheet);

    this.mseService.updateMSEBalanceSheet(this.mSEBalanceSheet).subscribe(
      response => {
        const toast = this.notificationsService.success("Success", "updated");
        console.log("put", response);
        this.getMSEBalanceSheets();
      },
      error => {
        const toast = this.notificationsService.error(
          "error",
          "Something went wrong"
        );
        console.log("put-error", error);
      }
    );
  }

  deleteMSEBalanceSheet() {
    confirm("Are you sure !!");
    this.mseService.deleteMSEBalanceSheet(this.mSEBalanceSheet).subscribe(
      response => {
        console.log("delete", response);
        const toast = this.notificationsService.success("Success", "deleted");
        this.getMSEBalanceSheets();
      },
      error => {
        const toast = this.notificationsService.error(
          "error",
          "Something went wrong"
        );
        console.log("delete-error", error);
      }
    );
  }

  initiateEdit(mSEBalanceSheet) {
    this.mSEBalanceSheet = mSEBalanceSheet;
    this.editForm = true;
  }

  clearForm() {
    this.mSEBalanceSheet = new MSEBalanceSheet();
    this.editForm = false;
  }
}

class MSEBalanceSheet {
  public year: any;
  public tin: any;
  public asset_Value_Birr: any;
  public liability_Value_birr: any;
  public owners_Equity_Value_Birr: any;
  public turn_Over_Birr: any;
  public taxable_Income: any;
  public profit_Income: any;
  public net_Income: any;
  public audited: any;
  public remark: any;
}
