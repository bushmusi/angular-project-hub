import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountTypeService {

  public accountTypeUrl = environment.rootApiPath + "AccountType";
  public accountCategoryUrl = environment.rootApiPath + "AccountCat";

  constructor(private http: HttpClient) {}

  getAccountCategory() {
    return this.http.get(this.accountCategoryUrl);
  }

  getAccountType() {
    return this.http.get(this.accountTypeUrl);
  }

  addAccountType(accountType) {
    return this.http.post(this.accountTypeUrl, accountType);
  }

  updateAccountType(accountType) {
    return this.http.put(this.accountTypeUrl, accountType);
  }

  deleteAccountType(accountType) {
    return this.http.delete(
      this.accountTypeUrl + "/" + accountType.id
    );
  }
}
