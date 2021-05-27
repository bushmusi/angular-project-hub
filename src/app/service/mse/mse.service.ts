import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class MseService {
  businessLocation = environment.rootApiPath + "WorkSpace/procLocationforBusOPP";
  businessCodeUrl = environment.rootApiPath + "Job/procBusinessCode";

  enterpriseLevelUrl = environment.rootApiPath + "Job/procEnterpriseLevel";

  marketInputUrl = environment.rootApiPath + "Job/procBussRelationInput";
  marketOutputUrl = environment.rootApiPath + "Job/procbussinessRelationMKT";

  enterpriseRegistrationURL =
    environment.rootApiPath + "Job/procEnterpriseRegistration";
  mSEBalanceSheetURL = environment.rootApiPath + "Job/procMSEBalanceSheet";
  mSEEmployeeURL = environment.rootApiPath + "Job/procMSEEmployee";
  ercaTinUrl = environment.rootApiPath + "Tax/procTINERCA";
  public lookupUrl = environment.rootLookupApiPath + "";

  constructor(private http: HttpClient) {}

  getLookup(table) {
    return this.http.get(this.lookupUrl + "?DropGownName=" + table);
  }

  //Market input API

  getErcaTin() {
    return this.http.get(this.ercaTinUrl);
  }

  getMarketInputs() {
    return this.http.get(this.marketInputUrl);
  }

  registerMarketInput(listOfCourse) {
    return this.http.post(this.marketInputUrl, listOfCourse);
  }

  updateMarketInput(listOfCourse) {
    return this.http.put(this.marketInputUrl, listOfCourse);
  }

  deleteMarketInput(listOfCourse) {
    return this.http.delete(this.marketInputUrl + "/" + listOfCourse.id);
  }

  //Market output
  getMarketOutputs() {
    return this.http.get(this.marketOutputUrl);
  }

  registerMarketOutput(marketOutput) {
    return this.http.post(this.marketOutputUrl, marketOutput);
  }

  updateMarketOutput(marketOutput) {
    return this.http.put(this.marketOutputUrl, marketOutput);
  }

  deleteMarketOutput(marketOutput) {
    return this.http.delete(this.marketOutputUrl + "/" + marketOutput.id);
  }

  //Enterprise registration API

  getBusinessLocation() {
    return this.http.get(this.businessLocation);
  }
  
  getBusinessCode() {
    return this.http.get(this.businessCodeUrl);
  }
  
  getEnterpriseLevel() {
    return this.http.get(this.enterpriseLevelUrl);
  }

  getEnterpriseRegistrations() {
    return this.http.get(this.enterpriseRegistrationURL);
  }

  getEnterpriseRegistration(id) {
    return this.http.get(this.enterpriseRegistrationURL + "/" + id);
  }

  registerEnterpriseRegistration(enterpriseRegistration) {
    return this.http.post(
      this.enterpriseRegistrationURL,
      enterpriseRegistration
    );
  }

  updateEnterpriseRegistration(enterpriseRegistration) {
    return this.http.put(
      this.enterpriseRegistrationURL,
      enterpriseRegistration
    );
  }

  deleteEnterpriseRegistration(enterpriseRegistration) {
    return this.http.delete(
      this.enterpriseRegistrationURL + "/" + enterpriseRegistration.tin
    );
  }
  //MSEBalanceSheet registration API

  getMSEBalanceSheets() {
    return this.http.get(this.mSEBalanceSheetURL);
  }

  registerMSEBalanceSheet(mSEBalanceSheet) {
    return this.http.post(this.mSEBalanceSheetURL, mSEBalanceSheet);
  }

  updateMSEBalanceSheet(mSEBalanceSheet) {
    return this.http.put(this.mSEBalanceSheetURL, mSEBalanceSheet);
  }

  deleteMSEBalanceSheet(mSEBalanceSheet) {
    return this.http.delete(this.mSEBalanceSheetURL + "/" + mSEBalanceSheet.id);
  }

  //MSEEmployee registration API

  getMSEEmployees() {
    return this.http.get(this.mSEEmployeeURL);
  }

  registerMSEEmployee(mSEEmployee) {
    return this.http.post(this.mSEEmployeeURL, mSEEmployee);
  }

  updateMSEEmployee(mSEEmployee) {
    return this.http.put(this.mSEEmployeeURL, mSEEmployee);
  }

  deleteMSEEmployee(mSEEmployee) {
    return this.http.delete(this.mSEEmployeeURL + "/" + mSEEmployee.id);
  }
}
