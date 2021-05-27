import { Component, Input, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { Guid } from "guid-typescript";
import { MseService } from "../../mse.service";

@Component({
  selector: "app-mse-employees",
  templateUrl: "./mse-employees.component.html",
  styleUrls: ["./mse-employees.component.css"]
})
export class MseEmployeesComponent implements OnInit {
  @Input() singleWin;

  mSEEmployee: MSEEmployee;
  students: any;
  batches: any;
  mSEEmployees: any;
  ercaTinNos: any;
  editForm = false;

  constructor(
    private mseService: MseService,
    private notificationsService: NotificationsService
  ) {
    this.clearForm();
  }

  ngOnInit() {
    this.getMSEEmployees();
    this.getErcaTinNos();
  }
  
  ngOnChanges(changes) {
    console.log("changes", changes);

    if (changes.singleWin) {
      this.mSEEmployee.msE_TIN = changes.singleWin.currentValue.tin;
    }
  }

  getErcaTinNos() {
    this.mseService.getErcaTin().subscribe(
      response => {
        this.ercaTinNos = this.refactorDropdownArray(
          response["procTINERCAs"],
          "tin",
          "tin"
        );
      },
      error => {
        console.log("get-erca-error", error);
      }
    );
  }
  getMSEEmployees() {
    this.mseService.getMSEEmployees().subscribe(
      response => {
        console.log("get-all", response);
        this.mSEEmployees = response["procMSEEmployees"];
      },
      error => {
        console.log("get-all-error", error);
      }
    );
  }

  registerMSEEmployee() {
    console.log(this.mSEEmployee);

    this.mseService.registerMSEEmployee(this.mSEEmployee).subscribe(
      response => {
        const toast = this.notificationsService.success("Success", "Saved");
        console.log("post", response);
        this.getMSEEmployees();
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

  updateMSEEmployee() {
    console.log(this.mSEEmployee);

    this.mseService.updateMSEEmployee(this.mSEEmployee).subscribe(
      response => {
        const toast = this.notificationsService.success("Success", "updated");
        console.log("put", response);
        this.getMSEEmployees();
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

  deleteMSEEmployee() {
    confirm("Are you sure !!");
    this.mseService.deleteMSEEmployee(this.mSEEmployee).subscribe(
      response => {
        console.log("delete", response);
        const toast = this.notificationsService.success("Success", "deleted");
        this.getMSEEmployees();
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

  initiateEdit(mSEEmployee) {
    this.mSEEmployee = mSEEmployee;
    this.editForm = true;
  }

  clearForm() {
    this.mSEEmployee = new MSEEmployee();
    this.editForm = false;

    this.mSEEmployee.id = Guid.create();
    this.mSEEmployee.id = this.mSEEmployee.id.value;
  }

  refactorDropdownArray(array, label, value) {
    let newArray = [];
    array.forEach(element => {
      newArray.push({ label: element[label], value: element[value] });
    });
    return newArray;
  }
}

class MSEEmployee {
  public id: any;
  public msE_TIN: any;
  public employee_TIN: any;
  public full_Name: any;
  public basic_Salary: any;
  public msE_Emplyee_Status: any;
}
