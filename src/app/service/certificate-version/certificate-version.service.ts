import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';  
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CertificateVersionService {
  private SaveUrl = environment.rootPath + 'Certificate_Version';

  constructor(private http: HttpClient) {
  }

  SaveCertificate(data: any) {
    return this.http.put(this.SaveUrl, data);
  }

  AddCertificate(data: any) {
    return this.http.put(this.SaveUrl, data);
  }

}
