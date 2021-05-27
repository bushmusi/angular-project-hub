import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { PayFrequencyTypeService } from "./pay-frequency-type.service";

@Component({
  selector: "app-pay-frequency-type",
  templateUrl: "./pay-frequency-type.component.html",
  styleUrls: ["./pay-frequency-type.component.css"],
})
export class PayFrequencyTypeComponent implements OnInit {
  public payFrequencyTypes: any;
  public payFrequencyType: PayFrequencyType;
  public IsAddFormVisible = false;
  public editForm = false;

  constructor(
    private payFrequencyTypeService: PayFrequencyTypeService,
    private notificationsService: NotificationsService
  ) {
    this.payFrequencyType = new PayFrequencyType();
  }

  ngOnInit() {
    this.getPayFrequencyType();
  }

  getPayFrequencyType() {
    this.payFrequencyTypeService.getPayFrequencyType().subscribe(
      (response) => {
        console.log("group", response);
        this.payFrequencyTypes = response["proccPayFrequencyTypes"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerPayFrequencyType() {
    this.payFrequencyTypeService
      .addPayFrequencyType(this.payFrequencyType)
      .subscribe(
        (response) => {
          this.getPayFrequencyType();
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

  updatePayFrequencyType() {
    console.log(this.payFrequencyType);

    this.payFrequencyTypeService
      .updatePayFrequencyType(this.payFrequencyType)
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

  deletePayFrequencyType(payFrequencyType) {
    if (confirm("Are you sure !!!"))
      this.payFrequencyTypeService
        .deletePayFrequencyType(payFrequencyType)
        .subscribe(
          (response) => {
            this.getPayFrequencyType();
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

  initiateEdit(payFrequencyType) {
    this.payFrequencyType = payFrequencyType;
    this.editForm = true;
    this.IsAddFormVisible = true;
  }

  clearForm() {
    this.payFrequencyType = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class PayFrequencyType {}
