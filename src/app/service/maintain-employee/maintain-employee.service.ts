import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MaintainEmployeeService {
  public employeeURL = environment.rootApiPath + "HRA/CEmployee";
  public lookupUrl = environment.rootLookupApiPath;

  constructor(private http: HttpClient) {}

  getLookup(table) {
    return this.http.get(this.lookupUrl + "GetLookUp?DropGownName=" + table);
  }

  getEmployees() {
    return this.http.get(this.employeeURL);
  }

  registerEmployees(employee) {
    return this.http.post(this.employeeURL, employee);
  }

  updateEmployees(employee) {
    return this.http.put(this.employeeURL, employee);
  }

  deleteEmployees(employee) {
    console.log(employee);

    return this.http.delete(this.employeeURL + "/" + employee.employee_Id);
  }
}
