import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { Guid } from "guid-typescript";
import { JobCreationSettingService } from "src/app/service/job-creation-setting/job-creation-setting.service";
import { MseService } from "../../mse.service";

@Component({
  selector: "app-market-input",
  templateUrl: "./market-input.component.html",
  styleUrls: ["./market-input.component.css"]
})
export class MarketInputComponent implements OnInit {
  marketInput: MarketInput;
  students: any;
  batches: any;
  marketInputs: any;
  marketOpportunities: any;
  editForm = false;
  SupportTabActive = false;
  ApplicationTabActive = true;

  constructor(
    private mseService: MseService,
    private jobCreationSettingService: JobCreationSettingService,
    private notificationsService: NotificationsService
  ) {
    this.clearForm();
  }

  ngOnInit() {
    this.getMarketInputs();
    this.getMarketOpportunities();
  }

  getMarketOpportunities() {
    this.jobCreationSettingService.getMarketOpportunitys().subscribe(
      response => {
        this.marketOpportunities = response["procMarketOPPs"];
        console.log("get-opp", this.marketOpportunities);
        this.marketOpportunities = this.refactorDropdownArray(
          response["procMarketOPPs"],
          "opP_ID",
          "opP_ID"
        );
      },
      error => {
        console.log("register-error", error);
      }
    );
  }

  getMarketInputs() {
    this.mseService.getMarketInputs().subscribe(
      response => {
        console.log("get-all", response);
        this.marketInputs = response["procBussRelationInputs"];
      },
      error => {
        console.log("get-all-error", error);
      }
    );
  }

  registerMarketInput() {
    console.log(this.marketInput);

    this.mseService.registerMarketInput(this.marketInput).subscribe(
      response => {
        const toast = this.notificationsService.success("Success", "Saved");
        console.log("post", response);
        this.clearForm();
        this.getMarketInputs();
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

  updateMarketInput() {
    console.log(this.marketInput);

    this.mseService.updateMarketInput(this.marketInput).subscribe(
      response => {
        const toast = this.notificationsService.success("Success", "updated");
        console.log("put", response);
        this.clearForm();
        this.getMarketInputs();
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

  deleteMarketInput() {
    confirm("Are you sure !!");
    this.mseService.deleteMarketInput(this.marketInput).subscribe(
      response => {
        console.log("delete", response);
        const toast = this.notificationsService.success("Success", "deleted");
        this.clearForm();
        this.getMarketInputs();
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

  initiateEdit(marketInput) {
    this.marketInput = marketInput;
    this.editForm = true;
  }

  clearForm() {
    this.marketInput = new MarketInput();

    this.marketInput.id = Guid.create();
    this.marketInput.id = this.marketInput.id.value;
    console.log(this.marketInput);

    this.editForm = false;
  }

  refactorDropdownArray(array, label, value) {
    let newArray = [];
    array.forEach(element => {
      newArray.push({ label: element[label], value: element[value] });
    });
    return newArray;
  }
}

class MarketInput {
  public id: any;
  public buyer_ID: any;
  public supplier: any;
  public contract_DOC: any;
  public date: any;
  public amount_Contract_Birr: any;
  public expire_Date: any;
  public is_Active: any;
  public remark: any;
  public created_By: any;
  public updated_By: any;
  public updated_Date: any;
}
