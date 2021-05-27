import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { TaxProdPostingGroupService } from "./tax-prod-posting-group.service";

@Component({
  selector: "app-tax-prod-posting-group",
  templateUrl: "./tax-prod-posting-group.component.html",
  styleUrls: ["./tax-prod-posting-group.component.css"],
})
export class TaxProdPostingGroupComponent implements OnInit {
  public taxPostPostingGroups: any;
  public taxPostPostingGroup: TaxPostPostingGroup;
  public IsAddFormVisible = false;

  constructor(
    private taxProdPostingGroupService: TaxProdPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.taxPostPostingGroup = new TaxPostPostingGroup();
  }

  ngOnInit() {
    this.getTaxProdPostingGroups();
  }
  getTaxProdPostingGroups() {
    this.taxProdPostingGroupService.getTaxProdPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.taxPostPostingGroups = response["procTAXProdPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerTaxProdPostingGroup() {
    this.taxProdPostingGroupService
      .addTaxProdPostingGroups(this.taxPostPostingGroup)
      .subscribe(
        (response) => {
          this.getTaxProdPostingGroups();
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

  updateTaxProdPostingGroup(taxPostPostingGroup) {
    this.taxProdPostingGroupService
      .updateTaxProdPostingGroups(taxPostPostingGroup)
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

  deleteTaxProdPostingGroup(taxPostPostingGroup) {
    this.taxProdPostingGroupService
      .deleteTaxProdPostingGroups(taxPostPostingGroup)
      .subscribe(
        (response) => {
          this.getTaxProdPostingGroups();
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
    this.updateTaxProdPostingGroup($event["data"]);
  }

  clearForm() {
    this.taxPostPostingGroup = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class TaxPostPostingGroup {}
