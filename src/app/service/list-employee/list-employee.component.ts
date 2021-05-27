import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { MaintainEmployeeService } from '../maintain-employee/maintain-employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  @ViewChild("tabset") tabset: TabsetComponent;
  @Input() workingUser;

  public employees: any;

  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  employee: Employee;
  public edit_form = false;

  constructor(private employeeService: MaintainEmployeeService) {
    this.employee = new Employee();
  }

  ngOnInit() {
    // this.goto(1);
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (response) => {
        this.employees = response["c_Employees"];
        console.log("c_Employees", this.workingUser);
        
      },
      (error) => {
        console.log("error");
      }
    );
  }

  selectEmployee($event, employee) {
    console.log(employee)
    $event.preventDefault();
    this.edit_form = true;
    this.employee = employee;
    this.goto(0);
  }

  addNewEmployee() {
    this.employee = new Employee();
    this.edit_form = false;
    this.goto(0);
  }
  
  closeup() {
    this.goto(1);
    this.employee = new Employee();
    this.getEmployees();
  }
}

class Employee {}
