import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { Guid } from "guid-typescript";
import { JobCreationSettingService } from "src/app/service/job-creation-setting/job-creation-setting.service";
import { MseService } from "../../mse.service";

@Component({
  selector: "app-market-output",
  templateUrl: "./market-output.component.html",
  styleUrls: ["./market-output.component.css"]
})
export class MarketOutputComponent implements OnInit {
  marketOutput: MarketOutput;
  students: any;
  batches: any;
  marketOutputs: any;
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
    this.getMarketOutputs();
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

  getMarketOutputs() {
    this.mseService.getMarketOutputs().subscribe(
      response => {
        console.log("get-all", response);
        this.marketOutputs = response["procbussinessRelationMKTs"];
      },
      error => {
        console.log("get-all-error", error);
      }
    );
  }

  registerMarketOutput() {
    console.log(this.marketOutput);

    this.mseService.registerMarketOutput(this.marketOutput).subscribe(
      response => {
        const toast = this.notificationsService.success("Success", "Saved");
        console.log("post", response);
        this.clearForm();
        this.getMarketOutputs();
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

  updateMarketOutput() {
    console.log(this.marketOutput);

    this.mseService.updateMarketOutput(this.marketOutput).subscribe(
      response => {
        const toast = this.notificationsService.success("Success", "updated");
        console.log("put", response);
        this.clearForm();
        this.getMarketOutputs();
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

  deleteMarketOutput() {
    confirm("Are you sure !!");
    this.mseService.deleteMarketOutput(this.marketOutput).subscribe(
      response => {
        console.log("delete", response);
        const toast = this.notificationsService.success("Success", "deleted");
        this.clearForm();
        this.getMarketOutputs();
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

  initiateEdit(marketOutput) {
    this.marketOutput = marketOutput;
    this.editForm = true;
  }

  clearForm() {
    this.marketOutput = new MarketOutput();

    this.marketOutput.id = Guid.create();
    this.marketOutput.id = this.marketOutput.id.value;
    console.log(this.marketOutput);

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

class MarketOutput {
  public id: any;
  public supplier: any;
  public buyer_ID: any;
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
