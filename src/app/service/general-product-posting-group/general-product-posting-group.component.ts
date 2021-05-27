import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { GeneralProductPostingGroupService } from "./general-product-posting-group.service";

@Component({
  selector: "app-general-product-posting-group",
  templateUrl: "./general-product-posting-group.component.html",
  styleUrls: ["./general-product-posting-group.component.css"],
})
export class GeneralProductPostingGroupComponent implements OnInit {
  public genProductPostingGroups: any;
  public genProductPostingGroup: GenProductPostingGroup;
  public IsAddFormVisible = false;
  public productionTaxes: any;
  public taxProductionSearchResult: any;

  constructor(
    private genProductPostingGroupService: GeneralProductPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.genProductPostingGroup = new GenProductPostingGroup();
  }

  ngOnInit() {
    this.getGenProductPostingGroups();
    this.getProductionTaxes();
  }

  searchTaxProduction(event): void {
    this.taxProductionSearchResult = this.productionTaxes.filter((c) =>
      c.code.includes(event.query)
    );
  }

  getProductionTaxes() {
    this.genProductPostingGroupService.getProductionTaxes().subscribe(
      (response) => {
        console.log("group", response);
        this.productionTaxes = response["procTAXProdPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  getGenProductPostingGroups() {
    this.genProductPostingGroupService.getGenProductPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.genProductPostingGroups =
          response["procGenProductPostingGroupLoadAlls"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerGenProductPostingGroup() {
    this.genProductPostingGroupService
      .addGenProductPostingGroups(
        this.refactorTaxProductionObject(this.genProductPostingGroup)
      )
      .subscribe(
        (response) => {
          this.getGenProductPostingGroups();
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

  updateGenProductPostingGroup(genProductPostingGroup) {
    this.genProductPostingGroupService
      .updateGenProductPostingGroups(genProductPostingGroup)
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

  deleteGenProductPostingGroup(genProductPostingGroup) {
    if (confirm("Are you sure !!!"))
      this.genProductPostingGroupService
        .deleteGenProductPostingGroups(genProductPostingGroup)
        .subscribe(
          (response) => {
            this.getGenProductPostingGroups();
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
    this.updateGenProductPostingGroup(this.refactorTaxProductionObject($event["data"]));

  }

  clearForm() {
    this.genProductPostingGroup = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class GenProductPostingGroup {}
