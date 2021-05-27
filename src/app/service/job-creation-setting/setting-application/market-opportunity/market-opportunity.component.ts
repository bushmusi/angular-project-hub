import { ServiceService } from 'src/app/service/service.service';
import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { Guid } from "guid-typescript";
import { JobCreationSettingService } from "../../job-creation-setting.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-market-opportunity",
  templateUrl: "./market-opportunity.component.html",
  styleUrls: ["./market-opportunity.component.css"]
})
export class MarketOpportunityComponent implements OnInit {
  public marketOpportunity: MarketOpportunity;
  public editMode = false;
  public marketOpportunities: any;
  public regions: any;
  public zones: any;
  public woredas: any;
  public kebeles: any;
  public operationTypes: any;
  public editForm = false;
  licence_ID: any
  selectedTab = 0;
  ercaTinNos: any;
  guidID: any
  urlParams: any

  constructor(
    private jobCreationSettingService: JobCreationSettingService,
    private notificationsService: NotificationsService,
    private serviceService: ServiceService,
    private routerService: ActivatedRoute,
  ) {
    this.clearForm();
  }

  ngOnInit() {
    this.getMarketOpportunities();
    this.getErcaTinNos();
    this.getGetLookups();
    
    this.routerService.params.subscribe((params) => {
      
      this.urlParams = params;
    });
    this.saveData()
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // this.marketOpportunity.photo = reader.result;
      console.log(reader.result);
    };
  }

  getErcaTinNos() {
    this.jobCreationSettingService.getErcaTin().subscribe(
      response => {
        // this.ercaTinNos = this.refactorDropdownArray(
        //   response["procTINERCAs"],
        //   "tin",
        //   "tin"
        // );
        this.ercaTinNos = response['procTINERCAs']
        console.log("tins: ",this.ercaTinNos);
        
      },
      error => {
        console.log("get-erca-error", error);
      }
    );
  }

  getGetLookups() {
    this.jobCreationSettingService
      .getLookup("employment_Type")
      .subscribe(response => {
        this.operationTypes = this.refactorDropdownArray(
          response,
          "english_description",
          "lkdetail_code"
        );
        this.operationTypes =response
        console.log("lookup employment type Market oportunity", response);
      });

    this.jobCreationSettingService.getLookup("Region").subscribe(response => {
      this.regions = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      this.regions =response
      console.log("lookup Reagion Market oportunity", response);
    });

    this.jobCreationSettingService.getLookup("city").subscribe(response => {
      this.zones = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      this.zones = response
      console.log("lookup zone Market oportunity", response);
    });

    this.jobCreationSettingService.getLookup("city").subscribe(response => {
      this.woredas = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      this.woredas = response
      console.log("lookup  Woreda Market oportunity", response);
    });
  }

  getMarketOpportunities() {
    this.jobCreationSettingService.getMarketOpportunitys().subscribe(
      response => {
        this.marketOpportunities = response["procMarketOPPs"];
        console.log("get-all-response", this.marketOpportunities);
      },
      error => {
        console.log("register-error", error);
      }
    );
  }

  registerMarketOpportunity() {
    console.log("post", this.marketOpportunity);
    this.marketOpportunity.licence_ID = this.licence_ID
    this.guidID =  Guid.create()
    this.marketOpportunity.opP_ID = this.guidID.value
    this.jobCreationSettingService
      .registerMarketOpportunity(this.marketOpportunity)
      .subscribe(
        response => {
          const toast = this.notificationsService.success(
            "Success",
            "registered"
          );
          this.clearForm();
          this.getMarketOpportunities()
          console.log("register-response", response);
        },
        error => {
          const toast = this.notificationsService.error(
            "error",
            "Something went wrong"
          );
          this.getMarketOpportunities()
          console.log("register-error", error);
        }
      );
  }

  updateMarketOpportunity() {
    console.log("update", this.marketOpportunity);

    this.jobCreationSettingService
      .updateMarketOpportunity(this.marketOpportunity)
      .subscribe(
        response => {
          const toast = this.notificationsService.success("Success", "updated");
          console.log("update-response", response);
          this.clearForm();
          this.getMarketOpportunities()
        },
        error => {
          const toast = this.notificationsService.error(
            "error",
            "Something went wrong"
          );
          this.getMarketOpportunities()
          console.log("update-error", error);
        }
      );
  }

  deleteMarketOpportunity($opP_ID) {
    if (confirm("Are you sure!!")) {
      this.jobCreationSettingService
        .deleteMarketOpportunity(this.marketOpportunity)
        .subscribe(
          response => {
            const toast = this.notificationsService.success(
              "Success",
              "deleted"
            );
            this.clearForm();
            this.getMarketOpportunities()
            console.log("delete-response", response);
          },
          error => {
            const toast = this.notificationsService.error(
              "error",
              "Something went wrong"
            );
            this.getMarketOpportunities()
            console.log("delete-error", error);
          }
        );
    }
  }

  refactorDropdownArray(array, label, value) {
    let newArray = [];
  }

  initiateEdit(marketOpportunity) {
    this.marketOpportunity = marketOpportunity;
    this.editForm = true;
  }

  clearForm() {
    this.selectedTab = 0;
    this.marketOpportunity = new MarketOpportunity();

    this.marketOpportunity.opP_ID = Guid.create();
    this.marketOpportunity.opP_ID = this.marketOpportunity.opP_ID.value;
    console.log(this.marketOpportunity);

    this.editForm = false;
  }

 
  saveData() {
    console.log("URL PARAMS: ",this.urlParams);
    
    this.jobCreationSettingService
      .saveForm(
        "00000000-0000-0000-0000-000000000000",//app code
        this.urlParams.AppNo, //service code
        this.urlParams.id, //task code
        "00000000-0000-0000-0000-000000000000",//org id
        null,//json
        "00000000-0000-0000-0000-000000000000",//doc id
        "00000000-0000-0000-0000-000000000000" //task id
      )
      .subscribe(
        (response) => {
          this.licence_ID = response[0]
        },
        (error) => {
          console.log("save-data-error", error);
          this.notificationsService.error("Error", error.error['Message']);
          this.notificationsService.error("Error", error.error['statusType']);
          this.notificationsService.error("Error", error.error);
        }
      );
    }


}
class MarketOpportunity {
  public opP_ID: any;
  public tin: any;
  public opp_Type: any;
  public name: any;
  public address: any;
  public phone: any;
  public email: any;
  public contact_Person: any;
  public region: any;
  public zone: any;
  public woreda: any;
  public hous_No: any;
  public jobOpen_For_ENT: any;
  public job_Open_For_Job_Seeker: any;
  public licence_ID: any;
}
