import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { TaxBusPostingGroupService } from "./tax-bus-posting-group.service";

@Component({
  selector: "app-tax-bus-posting-group",
  templateUrl: "./tax-bus-posting-group.component.html",
  styleUrls: ["./tax-bus-posting-group.component.css"],
})
export class TaxBusPostingGroupComponent implements OnInit {
  public taxBusPostingGroups: any;
  public taxBusPostingGroup: TaxBusPostingGroup;
  public IsAddFormVisible = false;

  constructor(
    private taxBusPostingGroupService: TaxBusPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.taxBusPostingGroup = new TaxBusPostingGroup();
  }

  ngOnInit() {
    this.getTaxBusPostingGroups();
  }
  getTaxBusPostingGroups() {
    this.taxBusPostingGroupService.getTaxBusPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.taxBusPostingGroups = response["procTAXBusPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerTaxBusPostingGroup() {
    this.taxBusPostingGroupService
      .addTaxBusPostingGroups(this.taxBusPostingGroup)
      .subscribe(
        (response) => {
          this.getTaxBusPostingGroups();
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

  updateTaxBusPostingGroup(taxBusPostingGroup) {
    this.taxBusPostingGroupService
      .updateTaxBusPostingGroups(taxBusPostingGroup)
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

  deleteTaxBusPostingGroup(taxBusPostingGroup) {
    if (confirm("Are you sure !!!"))
      this.taxBusPostingGroupService
        .deleteTaxBusPostingGroups(taxBusPostingGroup)
        .subscribe(
          (response) => {
            this.getTaxBusPostingGroups();
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

  performUpdate($event) {
    console.log("reroes", $event);
    this.updateTaxBusPostingGroup($event["data"]);
  }

  clearForm() {
    this.taxBusPostingGroup = new TaxBusPostingGroup();
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class TaxBusPostingGroup {}
