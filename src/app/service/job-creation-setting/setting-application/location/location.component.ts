import { Component, OnInit,Input } from "@angular/core";

import { NotificationsService } from "angular2-notifications";

import { Guid } from "guid-typescript";

import { JobCreationSettingService } from "../../job-creation-setting.service";

import { LocationService } from "../../setting-application/location/location.service";

import {FormGroup, FormBuilder,Validators } from '@angular/forms'

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"]
})
export class LocationComponent implements OnInit {
  locationForBusOpp: LocationForBusOpp;
  locationFormGroup: FormGroup
  students: any;
  batches: any;
  locationForBusOpps: any;
  editForm = false;
  @Input() currentJobID
  guidID:any
  addisCityGUID = "4269AE66-A1F1-42E4-B0E6-75C34B798028"
  subCityList: any

  constructor(
    private jobCreationSettingService: JobCreationSettingService,
    private locationService: LocationService,
    private notificationsService: NotificationsService,
    private fb: FormBuilder
  ) {
    
  }

  ngOnInit() {
    this.createLocationForm()
    this.getLocationForBusOpps();
    this.getSubCity()

    this.jobCreationSettingService.currentData.subscribe(
      (res) => {
        console.log("Step-4 Success location share data:",res);
        this.createLocationForm()
        this.locationFormGroup.patchValue({
          buS_OPP_Loc_Code: this.guidID.value,
          buS_OPP_ID: res,
          region: this.addisCityGUID
        })
        
      },
      (err) => {

      }
    )
  }

  createLocationForm(){
    this.locationFormGroup = this.fb.group({
      buS_OPP_Loc_Code: [''],
      buS_OPP_ID: ['',Validators.required],
      region: [''],
      zone: ['',Validators.required],
      woreda: ['',Validators.required],
      jobOpen_For_ENT: ['',Validators.required],
      job_Open_For_Job_Seeker: ['',Validators.required],
      remark: ['',Validators.required]
    })

    this.guidID = Guid.create();
    this.locationFormGroup.patchValue({
      buS_OPP_Loc_Code: this.guidID.value,
      buS_OPP_ID: this.currentJobID,
      region: this.addisCityGUID
    })
  }
  getSubCity(){
    this.locationService.getSubCity().subscribe(
      (res) => {
        this.subCityList = res
      },
      (err) => {
        console.log("Error getSubCity: ",err);
        
      }
    )
  }

  getLocationForBusOpps() {
    this.jobCreationSettingService.getLocationForBusOpps().subscribe(
      response => {
        console.log("get-all", response);
        this.locationForBusOpps = response["procLocationforBusOPPs"];
      },
      error => {
        console.log("get-all-error", error);
      }
    );
  }

  registerLocationForBusOpp() {
    console.log(this.locationFormGroup.value);

    this.jobCreationSettingService
      .registerLocationForBusOpp(this.locationFormGroup.value)
      .subscribe(
        response => {
          const toast = this.notificationsService.success("Success", "Saved");
          console.log("post", response);
          this.getLocationForBusOpps();
          this.clearForm()
        },
        error => {
          this.notificationsService.error("Error",error.error)
          this.notificationsService.error("Error",error.error['Message'])
          this.notificationsService.error("Error",error.error['statusType'])
          console.log("post-error", error);
        }
      );
  }

  updateLocationForBusOpp() {
    console.log("Sent data: ",this.locationFormGroup.value);
    
    this.jobCreationSettingService
      .updateLocationForBusOpp(this.locationFormGroup.value)
      .subscribe(
        response => {
          const toast = this.notificationsService.success("Success", "updated");
          console.log("put", response);
          this.getLocationForBusOpps();
          this.clearForm()
          this.editForm = false
        },
        error => {
          this.notificationsService.error("Error",error.error)
          this.notificationsService.error("Error",error.error['Message'])
          this.notificationsService.error("Error",error.error['statusType'])
          console.log("put-error", error);
        }
      );
  }

  deleteLocationForBusOpp() {
    confirm("Are you sure !!");
    this.jobCreationSettingService
      .deleteLocationForBusOpp(this.locationFormGroup.value)
      .subscribe(
        response => {
          console.log("delete", response);
          const toast = this.notificationsService.success("Success", "deleted");
          this.getLocationForBusOpps();
          this.clearForm()
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

  initiateEdit(data) {
    this.locationForBusOpp = data;
    this.editForm = true;
    this.locationFormGroup.patchValue({
      buS_OPP_Loc_Code: data.buS_OPP_Loc_Code,
      buS_OPP_ID: data.buS_OPP_ID,
      region: data.region,
      zone: data.zone,
      woreda: data.woreda,
      jobOpen_For_ENT: data.jobOpen_For_ENT,
      job_Open_For_Job_Seeker: data.job_Open_For_Job_Seeker,
      remark: data.remark
    })
  }

  clearForm() {
    this.locationForBusOpp = new LocationForBusOpp();
    this.locationForBusOpp.buS_OPP_Loc_Code = Guid.create();
    this.locationForBusOpp.buS_OPP_Loc_Code = this.locationForBusOpp.buS_OPP_Loc_Code.value;
    this.editForm = false;
    //second mthd
    this.locationFormGroup.reset()
    this.guidID = Guid.create();

    this.locationFormGroup.patchValue({
      buS_OPP_Loc_Code: this.guidID.value,
      buS_OPP_ID: this.currentJobID,
      region: this.addisCityGUID
    })
  }

}

class LocationForBusOpp {
  public buS_OPP_Loc_Code: any;
  public buS_OPP_ID: any;
  public region: any;
  public zone: any;
  public woreda: any;
  public jobOpen_For_ENT: any;
  public job_Open_For_Job_Seeker: any;
  public remark: any;
}
