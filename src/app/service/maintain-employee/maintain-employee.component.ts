import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { TabsetComponent } from "ngx-bootstrap";
import { refactorDropdownArray } from "../helpers/helpers";
import { MaintainEmployeeService } from "./maintain-employee.service";

@Component({
  selector: "app-maintain-employee",
  templateUrl: "./maintain-employee.component.html",
  styleUrls: ["./maintain-employee.component.css"],
})
export class MaintainEmployeeComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;

  @Input() employee;
  @Input() edit_form;
  @Input() workingUser;
  @Output() onclose = new EventEmitter();

  public DeleteEmployee: any;

  public employees: any;

  public Buyers: any;
  public CostMethods: any;
  public ItemTaxTypes: any;
  public ItemTypes: any;
  public PreferedVendors: any;
  public Customers: any;
  public ItemClasss: any;
  public vendorPostingGroups: any;
  employeeIdResult: any;
  public inventoryPostingGroups: any;
  public productPostingGroups: any;
  public employeeTypes: any;

  goto(id) {
    this.tabset.tabs[id].active = true;
  }

  constructor(
    private maintainEmployeeService: MaintainEmployeeService,
    private notificationsService: NotificationsService
  ) {
    this.employee = new Employee();
  }

  ngOnInit() {
    this.getEmployees();
    this.getGetLookups();
  }

  getGetLookups() {
    this.maintainEmployeeService.getLookup("employment_Type").subscribe(
      (response) => {
        this.employeeTypes = response;
        console.log("employeeTypes", response);
      },
      (error) => {
        console.log("employeeTypes", error);
      }
    );
  }

  getEmployees() {
    this.maintainEmployeeService.getEmployees().subscribe(
      (response) => {
        this.employees = response["c_Employees"];
        console.log("get-employees", this.employees);
      },
      (error) => {
        console.log("get-error", error);
      }
    );
  }

  searchItem(event): void {
    console.log(event);

    this.employeeIdResult = this.employees.filter((c) => {
      return c.employee_Id
        ? c.employee_Id.includes(event.query)
        : false || c.fName
        ? c.fName.includes(event.query)
        : false;
    });
  }

  registerEmployee() {
    console.log(this.employee, this.workingUser);
    this.employee.org_Code = this.workingUser.organization_code;
    this.employee.userID = this.workingUser.userId;

    this.maintainEmployeeService.registerEmployees(this.employee).subscribe(
      (response) => {
        this.getEmployees();
        const toast = this.notificationsService.success("Success", "Saved");
        this.closeup();
      },
      (error) => {
        console.log("res", error);

        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  updateEmployee() {
    this.maintainEmployeeService.updateEmployees(this.employee).subscribe(
      (response) => {
        const toast = this.notificationsService.success("Success", "Saved");
        this.closeup();
      },
      (error) => {
        console.log("res", error);

        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  deleteEmployee() {
    if (confirm("are you sure you went to delete the selected item"))
      this.maintainEmployeeService.deleteEmployees(this.employee).subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "Saved");
          this.closeup();
        },
        (error) => {
          console.log("res", error);

          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result.toString().split(",")[1]);

      this.employee.photo = reader.result.toString().split(",")[1];
    };
  }

  closeup() {
    this.onclose.emit();
  }
}

class Employee {
  public employee_Id: any;
  public user_ID: any;
  public type_Employement: any;
  public payrole_No: any;
  public tin: any;
  public fName: any;
  public lName: any;
  public mName: any;
  public address: any;
  public email: any;
  public homePhone: any;
  public workPhone: any;
  public idNumber: any;
  public photo: any;
  public bank_Account_NO: any;
  public bank_Name: any;
  public birthDate: any;
  public marrage_Status: any;
  public gender: any;
  public country: any;
  public active: any;
  public hired: any;
  public terminated: any;
  public rehired: any;
  public log: any;
}
