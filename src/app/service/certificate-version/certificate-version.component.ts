import {Component, Input, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {MessageService} from 'primeng/api';
import {CertificateVersionService} from './certificate-version.service';
import {ServiceComponent} from '../service.component';
import {NotificationsService} from 'angular2-notifications';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-certificate-version',
  templateUrl: './certificate-version.component.html',
  styleUrls: ['./certificate-version.component.css'],
  providers: [MessageService]
})

export class CertificateVersionComponent implements OnInit, OnChanges {
  public certificateVersion: CertificateVersion;
  ID = 0;
  @Input() Selectedcert;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private messageService: MessageService, private certificateVersionService:
    CertificateVersionService, public serviceComponent: ServiceComponent, private notificationsService: NotificationsService) {
    this.certificateVersion = new CertificateVersion();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('hahaha2', this.Selectedcert);
    this.certificateVersion = this.Selectedcert;
  }

  Save() {
    this.certificateVersionService.SaveCertificate(this.certificateVersion).subscribe(certificateVersion => {
      console.log('certificateVersion', certificateVersion);
      const toast = this.notificationsService.success('Sucess', certificateVersion);
    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
    /*console.log(this.certificateVersion);
    this.messageService.add({severity: 'error', sticky: true, summary: 'Error Message', detail: 'Validation failed'});
    this.messageService.add({severity: 'success', sticky: true, summary: 'Error Message', detail: 'Validation failed'});
    this.messageService.add({key: 'custom', sticky: true, severity: 'error', summary: 'Custom Toast', detail: 'With a Gradient'});*/
  }

  add() {
    this.certificateVersionService.AddCertificate(this.certificateVersion).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
    }, error => {
      console.log(error);
    });
    console.log('saveing....');
  }

  AddNew() {
    this.certificateVersion = new CertificateVersion();
    this.certificateVersion.Version_ID = this.Selectedcert.Version_ID;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: 'gray modal-lg'}));
  }

  closeModal(customer) {
    // this.person.Parent_Customer_ID = customer.Customer_ID;
    console.log('closeing.....');
    this.modalRef.hide();
  }


  Uploader(File) {
    let base64file;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener('loadend', (e) => {
      base64file = reader.result;
      this.certificateVersion.Photo = base64file;
    });
  }


  upload(event) {
    this.Uploader(event.files[0]);
  }

}

class CertificateVersion {
  public Certificate_ID: number;
  public Version_ID: number;
  public Deed_ID: number;
  public Color: string;
  public Photo: string;
  public Serial_No: string;
  public Customer_Type_ID: string;
  public Remark: string;
  public Applicant_First_Name_EN: string;
  public Applicant_Middle_Name_En: string;
  public Applicant_Last_Name_EN: string;
  public Issued_By: string;
  public Expired_Date: string;
  public Is_Printed: boolean;
  public IsIssued: boolean;
  public Is_Active: boolean;
  public Applicant_First_Name_AM: string;
  public Applicant_Middle_Name_AM: string;
  public Applicant_Last_Name_AM: string;
  public Version_No: string;
  public Built_Up_Area: string;
}
