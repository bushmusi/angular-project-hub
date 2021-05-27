import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { LeaseToService } from "./lease-to.service";
import { NotificationsService } from "angular2-notifications";
import { ActivatedRoute } from "@angular/router";
import { ServiceService } from "src/app/service/service.service";
import { Guid } from "guid-typescript";

@Component({
  selector: "app-lease-to",
  templateUrl: "./lease-to.component.html",
  styleUrls: ["./lease-to.component.css"],
})
export class LeaseToComponent implements OnInit {
  @Output() saveDataCompleted = new EventEmitter();
  @Input() licenceData;
  @Input() workingUser;

  public leaseTo: any;
  public vehicle: Vehicle;
  public leases: any;
  public customers: any;
  public fleetContracts: any;
  public fleetDispatches: any;
  public editForm = false;
  public urlParams: any;

  constructor(
    private leaseToService: LeaseToService,
    public notificationsService: NotificationsService,
    private routerService: ActivatedRoute,
    public serviceService: ServiceService
  ) {
    this.clearForm();
    this.routerService.params.subscribe((params) => {
      this.urlParams = params;
      console.log("urlParams", this.urlParams);
    });
  }

  ngOnInit() {
    this.getLeases();
    this.getCustomers();
    this.getFleetContracts();
  }

  getFleetContracts() {
    this.leaseToService.getFleetContracts().subscribe(
      (response) => {
        this.fleetContracts = response["procFleetContracts"];
        console.log("res", this.fleetContracts);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getCustomers() {
    this.leaseToService.getCustomers().subscribe(
      (response) => {
        this.customers = response["procCCustomerLoadAlls"];
        console.log("res", this.customers);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getLeases() {
    this.leaseToService.getLeasTo().subscribe(
      (response) => {
        this.leases = response["procVehicleLeaseTos"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  newLease() {
    this.editForm = false;
    this.leaseTo = new LeaseTo();
  }

  initEdit(leaseTo) {
    console.log(leaseTo);

    this.leaseTo = leaseTo;
    this.editForm = true;
  }

  onSelectVehicle(vehicle) {
    this.leaseTo.vehicle_ID = vehicle.vehicle_ID;
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
        this.leaseTo.application_Code = saveDataResponse[0];
        this.leaseTo.application_Number = licenceData.Application_No;
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
    console.log("to", this.leaseTo);

    this.leaseToService.addLeasTo(this.leaseTo).subscribe(
      (response) => {
        const toast = this.notificationsService.success(
          "success",
          "successfully added"
        );
        this.clearForm();
        console.log("added", response);
      },
      (error) => {
        const toast = this.notificationsService.error("Error", "Error");
        console.log("error", error);
      }
    );
  }
  updateLease() {
    console.log(this.leaseTo);
    this.leaseToService.updateLeasTo(this.leaseTo).subscribe(
      (response) => {
        const toast = this.notificationsService.success(
          "success",
          "successfully updated"
        );
        this.clearForm();
        console.log("up", response);
      },
      (error) => {
        const toast = this.notificationsService.error("Error", "Error");
        console.log("error", error);
      }
    );
  }

  deleteLease() {
    console.log("to", this.leaseTo);

    if (confirm("Are you sure !!!"))
      this.leaseToService.deleteLeasTo(this.leaseTo).subscribe(
        (response) => {
          const toast = this.notificationsService.success(
            "success",
            "successfully updated"
          );
          this.getLeases();
          this.clearForm();
          console.log("up", response);
        },
        (error) => {
          const toast = this.notificationsService.error("Error", "Error");
          console.log("error", error);
        }
      );
  }

  clearForm() {
    this.leaseTo = new LeaseTo();
    this.vehicle = new Vehicle();
    this.leaseTo.vehicle_LeaseToID = Guid.create();
    this.leaseTo.vehicle_LeaseToID = this.leaseTo.vehicle_LeaseToID.value;

    this.editForm = false;
  }
}
class Vehicle {}
class LeaseTo {
  public vehicle_LeaseToID: any;
  public customer_ID: any;
  public millage: any;
  public vehicle_ID: any;
  public fleet_ContractID: any;
  public remark: any;
}
