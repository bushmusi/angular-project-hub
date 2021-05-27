import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountCategoryService {

  public accountCategoryUrl = environment.rootApiPath + "AccountCat";

  constructor(private http: HttpClient) {}

  getAccountCategory() {
    return this.http.get(this.accountCategoryUrl);
  }

  addAccountCategory(accountCategory) {
    return this.http.post(this.accountCategoryUrl, accountCategory);
  }

  updateAccountCategory(accountCategory) {
    return this.http.put(this.accountCategoryUrl, accountCategory);
  }

  deleteAccountCategory(accountCategory) {
    return this.http.delete(
      this.accountCategoryUrl + "/" + accountCategory.code
    );
  }
}
