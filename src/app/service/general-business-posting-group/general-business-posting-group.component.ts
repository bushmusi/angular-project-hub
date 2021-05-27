import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { GeneralBusinessPostingGroupService } from "./general-business-posting-group.service";

@Component({
  selector: "app-general-business-posting-group",
  templateUrl: "./general-business-posting-group.component.html",
  styleUrls: ["./general-business-posting-group.component.css"],
})
export class GeneralBusinessPostingGroupComponent implements OnInit {
  public genBusinessPostingGroups: any;
  public genBusinessPostingGroup: GenBusinessPostingGroup;
  public IsAddFormVisible = false;
  public productionTaxes: any;
  public taxBusinessionSearchResult: any;

  constructor(
    private genBusinessPostingGroupService: GeneralBusinessPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.genBusinessPostingGroup = new GenBusinessPostingGroup();
  }

  ngOnInit() {
    this.getGenBusinessPostingGroups();
    this.getBusinessionTaxes();
  }

  searchTaxBusinession(event): void {
    this.taxBusinessionSearchResult = this.productionTaxes.filter((c) =>
      c.code.includes(event.query)
    );
  }

  getBusinessionTaxes() {
    this.genBusinessPostingGroupService.getBusinessionTaxes().subscribe(
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

  getGenBusinessPostingGroups() {
    this.genBusinessPostingGroupService.getGenBusinessPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.genBusinessPostingGroups =
          response["procGenBusPostingGroupss"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerGenBusinessPostingGroup() {
    this.genBusinessPostingGroupService
      .addGenBusinessPostingGroups(
        this.refactorTaxBusinessionObject(this.genBusinessPostingGroup)
      )
      .subscribe(
        (response) => {
          this.getGenBusinessPostingGroups();
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

  updateGenBusinessPostingGroup(genBusinessPostingGroup) {
    this.genBusinessPostingGroupService
      .updateGenBusinessPostingGroups(genBusinessPostingGroup)
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

  deleteGenBusinessPostingGroup(genBusinessPostingGroup) {
    if (confirm("Are you sure !!!"))
      this.genBusinessPostingGroupService
        .deleteGenBusinessPostingGroups(genBusinessPostingGroup)
        .subscribe(
          (response) => {
            this.getGenBusinessPostingGroups();
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
  refactorTaxBusinessionObject(object) {
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
    this.updateGenBusinessPostingGroup(
      this.refactorTaxBusinessionObject($event["data"])
    );
  }

  clearForm() {
    this.genBusinessPostingGroup = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class GenBusinessPostingGroup {}
