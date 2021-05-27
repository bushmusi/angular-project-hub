import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: "root"
})
export class JobCreationSettingService {
  productUrl = environment.rootApiPath + "Job/procProduct";
  locationForBusOppeUrl =
    environment.rootApiPath + "WorkSpace/procLocationforBusOPP";
  public ercaTinUrl = environment.rootApiPath + "Tax/procTINERCA";
  public lookupUrl = environment.rootLookupApiPath + "";
  public marketOpportunityUrl =
    environment.rootApiPath + "Job/Job_procMarketOPP";
    private SaveDataURL = environment.rootPath + "BPEL/SaveData"; // URL to web api

  constructor(private http: HttpClient) {}

  private data = new BehaviorSubject('');
  currentData = this.data.asObservable()

  saveForm(ApplicationCode, serviceId, taskid, orgid, json, docid, todoID) {


    return this.http.post(
      this.SaveDataURL +
        "?ApplicationCode=" +
        ApplicationCode +
        "&serviceId=" +
        serviceId +
        "&taskid=" +
        taskid +
        "&orgid=" +
        "df9d76cd-c5fe-49f3-8984-88b97985ff03" +
        "&UserName=" +
        "one stop"+
        "&json=" +
        json +
        "&docid=" +
        docid +
        "&todoID=" +
        todoID,

      null
    );
  }

  updateMessage(item: any) {
    console.log("Step-3 updateMessage service value:",item);
    
    this.data.next(item);
  }

  getLookup(table) {
    return this.http.get(this.lookupUrl + "?DropGownName=" + table);
  }

  getErcaTin() {
    return this.http.get(this.ercaTinUrl);
  }

  //Product API
  getProduct() {
    return this.http.get(this.productUrl);
  }

  registerProduct(product) {
    return this.http.post(this.productUrl, product);
  }

  updateProduct(product) {
    return this.http.put(this.productUrl, product);
  }

  deleteProduct(product) {
    return this.http.delete(this.productUrl + "/" + product.id);
  }

  //Short term training API

  getLocationForBusOpps() {
    return this.http.get(this.locationForBusOppeUrl);
  }

  registerLocationForBusOpp(locationForBusOpp) {
    return this.http.post(this.locationForBusOppeUrl, locationForBusOpp);
  }

  updateLocationForBusOpp(locationForBusOpp) {
    return this.http.put(this.locationForBusOppeUrl, locationForBusOpp);
  }

  deleteLocationForBusOpp(locationForBusOpp) {
    return this.http.delete(
      this.locationForBusOppeUrl + "/" + locationForBusOpp.buS_OPP_Loc_Code
    );
  }

  //Market opportunity API

  getMarketOpportunitys() {
    return this.http.get(this.marketOpportunityUrl);
  }

  registerMarketOpportunity(marketOpportunity) {
    return this.http.post(this.marketOpportunityUrl, marketOpportunity);
  }

  updateMarketOpportunity(marketOpportunity) {
    return this.http.put(this.marketOpportunityUrl, marketOpportunity);
  }

  deleteMarketOpportunity(marketOpportunity) {
    return this.http.delete(
      this.marketOpportunityUrl + "/" + marketOpportunity.opP_ID
    );
  }
}
