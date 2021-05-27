import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class BankReconciliationService {
  public bankReconciliationUrl =
    environment.rootApiPath + "finance/JBankAccReconciliation";
  public lookupUrl = environment.rootLookupApiPath + "";
  public userInfoURL= environment.rootApiPath +'view/ViewAspNetUsersWorkInfoDetail'
  public bankReconTransactionURL = environment.rootApiPath + 'finance/procJBankReconTransaction'

  constructor(private http: HttpClient) {}

  addTransID(data){
    return this.http.post(this.bankReconTransactionURL,data)
  }

  updateTransID(data){
    return this.http.put(this.bankReconTransactionURL,data)
  }


  getBankReconTransaction(){
    return this.http.get(this.bankReconTransactionURL)
  }

  getBankReconTransactionID(id){
    return this.http.get(this.bankReconTransactionURL+'/'+id)
  }

  getUserInfo(){
    return this.http.get(this.userInfoURL + '/' + environment.username)
  }

  getLookup(table) {
    return this.http.get(this.lookupUrl + "?DropGownName=" + table);
  }

  getBankReconciliations() {
    return this.http.get(this.bankReconciliationUrl);
  }

  registerBankReconciliation(bankReconciliation) {
    return this.http.post(this.bankReconciliationUrl, bankReconciliation);
  }

  updateBankReconciliation(bankReconciliation) {
    return this.http.put(this.bankReconciliationUrl, bankReconciliation);
  }

  deleteBankReconciliation(bankReconciliation) {
    return this.http.delete(
      this.bankReconciliationUrl + "/" + bankReconciliation.branch_ID + "/" + bankReconciliation.trans_ID + "/" + bankReconciliation.transaction_Date
    );
  }
}
