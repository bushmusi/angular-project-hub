import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { Guid } from "guid-typescript";
import { ServiceService } from "src/app/service/service.service";
import { SingleWinService } from "src/app/service/single-win.service";
import { MseService } from "../../mse.service";

@Component({
  selector: "app-mse-registration",
  templateUrl: "./mse-registration.component.html",
  styleUrls: ["./mse-registration.component.css"]
})
export class MseRegistrationComponent implements OnInit {
  @Output() saveDataCompleted = new EventEmitter();
  @Input() licenceData;
  @Input() singleWin;

  enterpriseRegistration: EnterpriseRegistration;
  students: any;
  batches: any;
  urlParams: any;
  enterpriseRegistrations: any;
  editForm = false;

  public sectors: any;
  public regions: any;
  public zones: any;
  public woredas: any;
  public enterpriseLevels: any;
  public enterpriseTypes: any;
  public businessCodes: any;

  constructor(
    private mseService: MseService,
    private notificationsService: NotificationsService,
    private serviceService: ServiceService,
    private routerService: ActivatedRoute,
    private singleWinService: SingleWinService
  ) {
    this.clearForm();
  }

  ngOnInit() {
    this.getEnterpriseLevel();
    this.getBusinessCode();
    this.getGetLookups();
    this.getBusinessLocation();

    this.routerService.params.subscribe(params => {
      this.urlParams = params;
    });
  }

  ngOnChanges(changes) {
    console.log("changes", changes);

    if (changes.singleWin) {
      this.enterpriseRegistration.tin = changes.singleWin.currentValue.tin;
      this.getEnterpriseRegistrations();
    }
  }

  getBusinessCode() {
    this.mseService.getBusinessCode().subscribe(
      response => {
        console.log("get-code", response);
        this.sectors = this.refactorDropdownArray(
          response["procBusinessCodes"],
          "name_EN",
          "code"
        );
      },
      error => {
        console.log("get-code-error", error);
      }
    );
  }

  getBusinessLocation() {
    this.mseService.getBusinessLocation().subscribe(
      response => {
        console.log("get-location", response);
        this.businessCodes = this.refactorDropdownArray(
          response["procLocationforBusOPPs"],
          "region",
          "buS_OPP_Loc_Code"
        );
      },
      error => {
        console.log("get-location-error", error);
      }
    );
  }

  getEnterpriseLevel() {
    this.mseService.getEnterpriseLevel().subscribe(
      response => {
        console.log("get-level", response);
        this.enterpriseLevels = this.refactorDropdownArray(
          response["procEnterpriseLevels"],
          "name",
          "code"
        );
      },
      error => {
        console.log("get-level-error", error);
      }
    );
  }

  getGetLookups() {
    this.mseService.getLookup("ent_type").subscribe(response => {
      this.enterpriseTypes = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      console.log("lookup-ent-type", response);
    });

    this.mseService.getLookup("region").subscribe(response => {
      this.regions = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      console.log("regions", response);
    });

    this.mseService.getLookup("Zone").subscribe(response => {
      this.zones = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      console.log("lookup-zone", response);
    });

    this.mseService.getLookup("Woreda").subscribe(response => {
      this.woredas = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      console.log("lookup-woreda", response);
    });
  }

  getEnterpriseRegistrations() {
    this.mseService
      .getEnterpriseRegistration(this.singleWin.tin)
      .subscribe(
        response => {
          console.log("get-all", response);
          this.enterpriseRegistrations =
            response["procEnterpriseRegistrations"];
        },
        error => {
          console.log("get-all-error", error);
        }
      );
  }

  saveData() {
    console.log("response-urls", this.urlParams);
    this.serviceService
      .saveForm(
        this.licenceData
          ? this.licenceData.Licence_Service_ID
          : "00000000-0000-0000-0000-000000000000",
        this.licenceData ? this.licenceData.Service_ID : this.urlParams.id,
        this.urlParams.tskID,
        "00000000-0000-0000-0000-000000000000",
        JSON.stringify({}),
        this.urlParams.docid || "00000000-0000-0000-0000-000000000000",
        this.urlParams.todoID || "00000000-0000-0000-0000-000000000000"
      )
      .subscribe(
        response => {
          console.log("trans-resp", response);

          this.enterpriseRegistration.licence_ID = response[0];
          this.registerEnterpriseRegistration();
          this.saveDataCompleted.emit(response);
        },
        error => {
          console.log("save-data-error", error);

          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  registerEnterpriseRegistration() {
    console.log(this.enterpriseRegistration);

    this.mseService
      .registerEnterpriseRegistration(this.enterpriseRegistration)
      .subscribe(
        response => {
          console.log("register-response", response);
          this.updateSingleWin({
            licence_Id: this.enterpriseRegistration.licence_ID,
            msE_Cdoe: this.enterpriseRegistration.msE_Code
          });
          const toast = this.notificationsService.success("Success", "Saved");
          console.log("post", response);
          this.getEnterpriseRegistrations();
        },
        error => {
          const toast = this.notificationsService.error("error", error.error);
          console.log("post-error", error);
        }
      );
  }

  updateSingleWin(licence_object) {
    this.singleWinService.updateSingleWin(licence_object).subscribe(
      response => {
        console.log("update-single-win", response);
      },
      error => {
        console.log("update-single-win-error", error);
      }
    );
  }

  updateEnterpriseRegistration() {
    console.log(this.enterpriseRegistration);

    this.mseService
      .updateEnterpriseRegistration(this.enterpriseRegistration)
      .subscribe(
        response => {
          const toast = this.notificationsService.success("Success", "updated");
          console.log("put", response);
          this.getEnterpriseRegistrations();
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

  deleteEnterpriseRegistration() {
    confirm("Are you sure !!");
    this.mseService
      .deleteEnterpriseRegistration(this.enterpriseRegistration)
      .subscribe(
        response => {
          console.log("delete", response);
          const toast = this.notificationsService.success("Success", "deleted");
          this.getEnterpriseRegistrations();
          this.clearForm();
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

  initiateEdit(enterpriseRegistration) {
    this.enterpriseRegistration = enterpriseRegistration;
    this.editForm = true;
  }

  refactorDropdownArray(array, label, value) {
    let newArray = [];
    if (array)
      array.forEach(element => {
        newArray.push({ label: element[label], value: element[value] });
      });
    return newArray;
  }

  clearForm() {
    this.enterpriseRegistration = new EnterpriseRegistration();

    // this.enterpriseRegistration.tin = Guid.create();
    // this.enterpriseRegistration.tin = this.enterpriseRegistration.tin.value;
    // console.log(this.enterpriseRegistration);

    this.editForm = false;
  }
}

class EnterpriseRegistration {
  public tin: any;
  public msE_Code: any;
  public name: any;
  public buS_OPP_Loc_Code: any;
  public enT_Type: any;
  public capital_In_Birr: any;
  public ent_Level: any;
  public number_of_Emplyee_Need: any;
  public vat: any;
  public sector_ID: any;
  public region: any;
  public zone: any;
  public woreda: any;
  public hous_No: any;
  public gM_Name: any;
  public phone1: any;
  public phone2: any;
  public email: any;
  public website: any;
  public licence_ID: any;
  public location_x: any;
  public location_y: any;
  public enterprises_grading_levels: any;
}
