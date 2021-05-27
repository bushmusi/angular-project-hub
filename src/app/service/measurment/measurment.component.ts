import {Component, OnInit} from '@angular/core';
import {ServiceComponent} from '../service.component';

@Component({
  selector: 'app-measurment',
  templateUrl: './measurment.component.html',
  styleUrls: ['./measurment.component.css']
})
export class MeasurmentComponent implements OnInit {
  public measurment: Measurment;

  constructor(public serviceComponent: ServiceComponent) {
    this.measurment = new Measurment();
  }

  ngOnInit() {
  }

}

class Measurment {
  public PropertyType: string;
  public BasementFloor: string;
  public HouseNo: string;
  public Description: string;
  public NumberOfLifts: string;
  public EstimatedPrice: string;
  public UpperFloor: string;
  public BuildingSize: string;
  public PropertyStatus: string;
  public ParkingSize: string;
  public TotalSize: string;
  public IsActive: string;
  public RegisterationDate: string;
  public Measurment;
  public comments;

}
