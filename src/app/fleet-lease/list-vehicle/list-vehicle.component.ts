import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { VehicleService } from "../vehicle.service";

@Component({
  selector: "app-list-vehicle",
  templateUrl: "./list-vehicle.component.html",
  styleUrls: ["./list-vehicle.component.css"],
})
export class ListVehicleComponent implements OnInit {
  public vehicles: any;
  @Output() selectVehicle = new EventEmitter<Vehicle>();

  constructor(private vehicleService: VehicleService) {}

  ngOnInit() {
    this.getVehicles();
  }

  getVehicles() {
    this.vehicleService.getVehicles().subscribe(
      (response) => {
        this.vehicles = response["procVehicles"];
      },
      (error) => {
        console.log("error");
      }
    );
  }
  initSelectVehicle(vehicle) {
    this.selectVehicle.emit(vehicle);
  }
}

class Vehicle {}
