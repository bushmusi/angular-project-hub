import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ThemService} from './them.service';
import {ServiceService} from '../service.service';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-them',
  templateUrl: './them.component.html',
  styleUrls: ['./them.component.css']
})
export class ThemComponent implements OnInit, OnChanges {
  public themCertificateVersion: ThemCertificateVersion;
  @Input() Selectedcert;
  themCertificateVersionList;
  themform = false;

  constructor(private themService: ThemService, private notificationsService: NotificationsService) {
    this.themCertificateVersion = new ThemCertificateVersion();
  }

  ngOnInit() {
    this.getThem();
  }

  ngOnChanges() {
    console.log('hahaha2', this.Selectedcert);
  }

  getThem() {
    this.themService.getAll(this.Selectedcert.Version_ID).subscribe(themCertificateVersionList => {
      let a;
      a = themCertificateVersionList;
      this.themCertificateVersionList = (Object.assign([], a.list));
      console.log('this.titleDeedRegistration', this.themCertificateVersionList);
    }, error => {
      console.log(error);
    });
  }


  save() {
    this.themService.save(this.themCertificateVersion).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
      const toast = this.notificationsService.success('Sucess', deptSuspension);
    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }

  add() {
    this.themService.Add(this.themCertificateVersion).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
    }, error => {
      console.log(error);
    });
    console.log('saveing....');
  }

  addThem() {
    this.themform = true;
    this.themCertificateVersion = new ThemCertificateVersion();
    this.themCertificateVersion.Certificate_Version_ID = this.Selectedcert.Version_ID;

  }

  selectThem(them) {
    this.themform = true;
    this.themCertificateVersion = them;

  }

}

class ThemCertificateVersion {
  public Certificate_Version_ID: string;
  public Them_Customer_ID: string;
  public Remark: string;
  public Date: string;
  public Is_Ative: boolean;
  public Is_Deleted: boolean;

}
