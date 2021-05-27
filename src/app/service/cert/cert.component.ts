import {Component, Input, OnChanges} from '@angular/core';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-cert',
  templateUrl: './cert.component.html',
  styleUrls: ['./cert.component.css']
})
export class CertComponent implements OnChanges {

  @Input() Property_ID;
  DeedTable;
  SelectedDeed;
  certForm;
  Selectedcert;
  certverForm;
  CertificateVersion;

  constructor(private serviceService: ServiceService) {

  }

  ngOnChanges() {
    this.getDeed();
  }


  getDeed() {
    this.serviceService.getDeedTable(this.Property_ID).subscribe(DeedTable => {
      this.DeedTable = DeedTable;
      this.DeedTable = (Object.assign([], this.DeedTable.list));
      console.log('DeedTable', DeedTable);
    }, error => {
      console.log('error');
    });
  }


  SelectDeed(Deed) {
    this.SelectedDeed = Deed;
    this.certForm = true;
    this.getCertificateVersion(Deed);
  }

  SelectcertVer(certver) {
    this.Selectedcert = certver;
    this.certverForm = true;
    console.log('certver', certver);
  }


  getCertificateVersion(Deed) {
    this.serviceService.getCertificateVersion(Deed.Ownership_ID).subscribe(CertificateVersion => {
      this.CertificateVersion = CertificateVersion;
      this.CertificateVersion = (Object.assign([], this.CertificateVersion.list));
      this.SelectcertVer(this.CertificateVersion[0]);
      console.log('CertificateVersion', CertificateVersion);
    }, error => {
      console.log('error');
    });
  }


}
