import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ServiceComponent} from '../service.component';
import {PropertyRegisterService} from './property-register.service';
import {NotificationsService} from 'angular2-notifications';
import {PropertyComponent} from '../property/property.component';

@Component({
  selector: 'app-property-register',
  templateUrl: './property-register.component.html',
  styleUrls: ['./property-register.component.css']
})
export class PropertyRegisterComponent implements OnInit, OnChanges {
  public propertyRegister: PropertyRegister;
  @Input() selectedpro;

  constructor(public serviceComponent: ServiceComponent, public propertyRegisterService: PropertyRegisterService, private notificationsService: NotificationsService, private propertyComponent: PropertyComponent) {
    this.propertyRegister = new PropertyRegister();
  }

  ngOnChanges() {
    console.log('chang detected');
    this.propertyRegister = this.selectedpro;
  }

  ngOnInit() {
  }


  save() {
    const prop = (Object.assign({}, this.propertyRegister));
    if (prop.children) {
      prop.children = null;
    }
    if (prop.parent.children) {
      prop.parent.children = null;
    }
    console.log('saveing....', prop);
    this.propertyRegisterService.save(prop).subscribe(property => {
      console.log('property', property);
      const toast = this.notificationsService.success('Sucess', property);
    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }

  add() {
    const prop = (Object.assign({}, this.propertyRegister));
    if (prop.children) {
      prop.children = null;
    }
    if (prop.parent) {
      if (prop.parent.children) {
        prop.parent.children = null;
      }
    }

    if (prop.Property_Parent_ID == 'No Parent') {

      prop.Property_Parent_ID = '0';
    }
    this.propertyRegisterService.Add(prop).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
    }, error => {
      console.log(error);
    });
    console.log('saveing....');
  }


  Uploader(File) {
    let base64file;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener('loadend', (e) => {
      base64file = reader.result;
      this.propertyRegister.Map_Floor_Plan = base64file;
    });
  }


  upload(event) {
    this.Uploader(event.files[0]);
  }

}

export class PropertyRegister {
  public Parcel_ID: string;
  public Property_ID: string;
  public Description: string;
  public Property_Type_ID: string;
  public Basement_Floor_No: string;
  public Upper_Floor_No: string;
  public Parking_Area_M2: string;
  public Estimated_Price: string;
  public Number_of_Lift: string;
  public Compound_Size_M2: string;
  public Property_Status_ID: string;
  public TotalCoumpoundSize: string;
  public Property_Parent_ID: string;
  public Map_Floor_Plan;
  public HouseNo: string;
  public children;
  public parent;
}
