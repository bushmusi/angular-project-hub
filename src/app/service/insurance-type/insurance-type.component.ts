import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { InsuranceTypeService } from './insurance-type.service';

@Component({
  selector: 'app-insurance-type',
  templateUrl: './insurance-type.component.html',
  styleUrls: ['./insurance-type.component.css']
})
export class InsuranceTypeComponent implements OnInit {

  public insuranceTypes: any;
  public insuranceType: InsuranceType;
  public IsAddFormVisible = false;

  constructor(
    private insuranceTypeService: InsuranceTypeService,
    private notificationsService: NotificationsService
  ) {
    this.insuranceType = new InsuranceType();
  }

  ngOnInit() {
    this.getInsuranceType();
  }

  getInsuranceType() {
    this.insuranceTypeService.getInsuranceType().subscribe(
      (response) => {
        console.log("group", response);
        this.insuranceTypes =
          response["proccInsuranceTypes"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerInsuranceType() {
    this.insuranceTypeService
      .addInsuranceType(
        this.refactorTaxProductionObject(this.insuranceType)
      )
      .subscribe(
        (response) => {
          this.getInsuranceType();
          const toast = this.notificationsService.success("Success", "Saved");
          this.clearForm();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  updateInsuranceType(insuranceType) {
    console.log(insuranceType);

    this.insuranceTypeService
      .updateInsuranceType(insuranceType)
      .subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "Saved");
        },
        (error) => {
          console.log("reroes", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  deleteInsuranceType(insuranceType) {
    
    if (confirm("Are you sure !!!"))
      this.insuranceTypeService
        .deleteInsuranceType(insuranceType)
        .subscribe(
          (response) => {
            this.getInsuranceType();
            const toast = this.notificationsService.success("Success", "Saved");
          },
          (error) => {
            console.log("reroes", error);
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
        );
  }

  //Extract the code from the object
  refactorTaxProductionObject(object) {
    //check if the object value has a value
    if (object.def_VAT_Prod_Posting_Group)
      //if the object values has a property 'code' return the code
      //else return the object value
      //this will extract the code
      object.def_VAT_Prod_Posting_Group =
        object.def_VAT_Prod_Posting_Group.code ||
        object.def_VAT_Prod_Posting_Group;

    return object;
  }

  performUpdate($event) {
    console.log("reroes", $event);
    this.updateInsuranceType(this.refactorTaxProductionObject($event["data"]));

  }

  clearForm() {
    this.insuranceType = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class InsuranceType {}

