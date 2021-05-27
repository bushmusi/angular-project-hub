import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { TransactionSalesTypeService } from "./transaction-sales-type.service";

@Component({
  selector: "app-transaction-sales-type",
  templateUrl: "./transaction-sales-type.component.html",
  styleUrls: ["./transaction-sales-type.component.css"],
})
export class TransactionSalesTypeComponent implements OnInit {
  public transactionSalesTypes: any;
  public busPostingGroups: any;
  public transactionSalesType: TransactionSalesType;
  public IsAddFormVisible = false;
  public edit_form = false;

  constructor(
    private transactionSalesTypeService: TransactionSalesTypeService,
    private notificationsService: NotificationsService
  ) {
    this.transactionSalesType = new TransactionSalesType();
  }

  ngOnInit() {
    this.getTransactionSalesType();

    this.getBusPostingGroups();
  }

  getBusPostingGroups() {
    this.transactionSalesTypeService.getBusPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.busPostingGroups = response["procGenBusPostingGroupss"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  getTransactionSalesType() {
    this.transactionSalesTypeService.getTransactionSalesType().subscribe(
      (response) => {
        console.log("group", response);
        this.transactionSalesTypes = response["procSTransactionSalesTypes"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerTransactionSalesType() {
    this.transactionSalesTypeService
      .addTransactionSalesType(this.transactionSalesType)
      .subscribe(
        (response) => {
          this.getTransactionSalesType();
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

  updateTransactionSalesType() {
    console.log(this.transactionSalesType);

    this.transactionSalesTypeService
      .updateTransactionSalesType(this.transactionSalesType)
      .subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "Saved");
          this.clearForm();
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

  deleteTransactionSalesType() {
    if (confirm("Are you sure !!!"))
      this.transactionSalesTypeService
        .deleteTransactionSalesType(this.transactionSalesType)
        .subscribe(
          (response) => {
            this.getTransactionSalesType();
            const toast = this.notificationsService.success("Success", "Saved");
            this.clearForm();
          },
          (error) => {
            console.log("reroes", error);
            const toast = this.notificationsService.error(
              "Error",
              error
            );
            this.notificationsService.error('Error',error.error)
            this.notificationsService.error('Error',error.error['Message'])
            this.notificationsService.error('Error',error.error['statusType'])
          }
        );
  }

  initiateEdit(transactionSalesType) {
    this.transactionSalesType = transactionSalesType;
    this.edit_form = true;
  }

  clearForm() {
    this.transactionSalesType = new TransactionSalesType();
    this.edit_form = false;
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class TransactionSalesType {
  public code: any;
  public description: any;
  public starting_No: any;
  public ending_No: any;
  public last_Date_Used: any;
  public last_No_Used: any;
  public default_Nos: any;
  public manual_Nos: any;
  public date_Order: any;
  public gen_Bus_Posting_Group: any;
  public service_Code: any;
}
