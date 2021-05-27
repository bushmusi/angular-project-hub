import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayFrequencyTypeService {

  public payFrequencyType = environment.rootApiPath + "finance/cPayFrequencyType";

  constructor(private http: HttpClient) {}

  getPayFrequencyType() {
    return this.http.get(this.payFrequencyType);
  }

  addPayFrequencyType(accountCategory) {
    return this.http.post(this.payFrequencyType, accountCategory);
  }

  updatePayFrequencyType(accountCategory) {
    return this.http.put(this.payFrequencyType, accountCategory);
  }

  deletePayFrequencyType(accountCategory) {
    return this.http.delete(
      this.payFrequencyType + "/" + accountCategory.name
    );
  }
}
