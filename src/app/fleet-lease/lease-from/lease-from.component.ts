import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { LeaseFromService } from "./lease-from.service";
import { NotificationsService } from "angular2-notifications";
import { ServiceService } from "src/app/service/service.service";
import { ActivatedRoute } from "@angular/router";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-lease-from",
  templateUrl: "./lease-from.component.html",
  styleUrls: ["./lease-from.component.css"],
})
export class LeaseFromComponent implements OnInit {
  @Output() saveDataCompleted = new EventEmitter();
  @Input() licenceData;
  @Input() workingUser;

  public leaseFrom: any;
  public vehicle: Vehicle;
  public leases: any;
  public vendors: any;
  public fleetContracts: any;
  public fleetDispatches: any;
  public editForm = false;
  public urlParams: any;

  constructor(
    private leaseFromService: LeaseFromService,
    private notificationsService: NotificationsService,
    private routerService: ActivatedRoute,
    public serviceService: ServiceService
  ) {
    this.cleanup();
    this.routerService.params.subscribe((params) => {
      this.urlParams = params;
    });
  }

  ngOnInit() {
    this.getLeases();
    this.getVendors();
    this.getFleetContracts();
  }

  getFleetContracts() {
    this.leaseFromService.getFleetContracts().subscribe(
      (response) => {
        this.fleetContracts = response["procFleetContracts"];
        console.log("res", this.fleetContracts);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getVendors() {
    this.leaseFromService.getVendors().subscribe(
      (response) => {
        this.vendors = response["procCVendors"];
        console.log("res", this.vendors);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getLeases() {
    this.leaseFromService.getLeasFrom().subscribe(
      (response) => {
        this.leases = response["procVehicleLeases"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  newLease() {
    this.editForm = false;
    this.leaseFrom = new LeaseFrom();
  }

  initEdit(leaseFrom) {
    console.log(leaseFrom);

    this.leaseFrom = leaseFrom;
    this.editForm = true;
  }

  onSelectVehicle(vehicle) {
    this.leaseFrom.vehicle_ID = vehicle.vehicle_ID;
    this.vehicle = vehicle;
    console.log("emited", vehicle);
  }

  saveData() {
    this.serviceService
      .saveForm(
        this.licenceData
          ? this.licenceData.Licence_Service_ID
          : "00000000-0000-0000-0000-000000000000",
        this.licenceData ? this.licenceData.Service_ID : this.urlParams.id,
        this.urlParams.tskID,
        this.workingUser.organization_code,
        null,
        this.urlParams.docid || "00000000-0000-0000-0000-000000000000",
        this.urlParams.todoID || "00000000-0000-0000-0000-000000000000"
      )
      .subscribe(
        (response) => {
          console.log("trans-resp", response);
          this.getLicenceService(response);
        },
        (error) => {
          console.log("save-data-error", error);

          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  public getLicenceService(saveDataResponse) {
    this.serviceService.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        console.log("all-response", response);
        let licenceData = response["list"][0];
        this.leaseFrom.application_Code = saveDataResponse[0];
        this.leaseFrom.application_Number = licenceData.Application_No;
        this.saveDataCompleted.emit(saveDataResponse);

        if (this.editForm) this.updateLease();
        else this.AddLease();
      },
      (error) => {
        console.log("all-error" + error);
      }
    );
  }
  AddLease() {
    this.leaseFromService.addLeasFrom(this.leaseFrom).subscribe(
      (response) => {
        const toast = this.notificationsService.success(
          "success",
          "successfully added"
        );
        this.cleanup();
        console.log("added", response);
      },
      (error) => {
        const toast = this.notificationsService.error("Error", "Error");
        console.log("error", error);
      }
    );
  }
  updateLease() {
    this.leaseFromService.updateLeasFrom(this.leaseFrom).subscribe(
      (response) => {
        const toast = this.notificationsService.success(
          "success",
          "successfully updated"
        );
        this.cleanup();
        console.log("up", response);
      },
      (error) => {
        const toast = this.notificationsService.error("Error", "Error");
        console.log("error", error);
      }
    );
  }
  deleteLeaseFrom() {
    console.log(this.leaseFrom);
    if (confirm("Are you sure"))
      this.leaseFromService.deleteLeasFrom(this.leaseFrom).subscribe(
        (response) => {
          const toast = this.notificationsService.success(
            "success",
            "successfully updated"
          );
          this.getLeases();
          this.cleanup();
          console.log("delete", response);
        },
        (error) => {
          const toast = this.notificationsService.error("Error", "Error");
          console.log("delete-error", error);
        }
      );
  }

  cleanup() {
    this.editForm = false;
    this.leaseFrom = new LeaseFrom();
    this.vehicle = new Vehicle();
    this.leaseFrom.vehicle_LeaseID = Guid.create();
    this.leaseFrom.vehicle_LeaseID = this.leaseFrom.vehicle_LeaseID.value;

    console.log("this.leaseFrom", this.leaseFrom);
  }
}
class Vehicle {}
class LeaseFrom {
  public vehicle_LeaseID: any;
  public vendor_ID: any;
  public millage: any;
  public vehicle_ID: any;
  public fleet_ContractID: any;
  public remark: any;
}
