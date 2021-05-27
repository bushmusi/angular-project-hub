import {Component, Input, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {DeptSuspensionRecordService} from './dept-suspension-record.service';
import {ServiceComponent} from '../service.component';
import {NotificationsService} from 'angular2-notifications';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-dept-suspension-record',
  templateUrl: './dept-suspension-record.component.html',
  styleUrls: ['./dept-suspension-record.component.css']
})
export class DeptSuspensionRecordComponent implements OnInit, OnChanges {
  public deptSuspensionRecord: DeptSuspensionRecord;
  deptSuspensionRecordList;
  deptForm = false;
  @Input() Selectedcert;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private deptSuspensionRecordService: DeptSuspensionRecordService,
              public serviceComponent: ServiceComponent, private notificationsService: NotificationsService) {
    this.deptSuspensionRecord = new DeptSuspensionRecord();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('hahaha2', this.Selectedcert);
    this.getdeed();
    this.deptForm = false;
  }

  getdeed() {
    this.deptSuspensionRecordService.getAll(this.Selectedcert.Version_ID).subscribe(deptSuspension => {
      let a;
      a = deptSuspension;
      this.deptSuspensionRecordList = (Object.assign([], a.list));
      console.log('this.deptSuspensionRecord', this.deptSuspensionRecordList);
    }, error => {
      console.log(error);
    });
  }

  save() {
    this.deptSuspensionRecordService.save(this.deptSuspensionRecord).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
      const toast = this.notificationsService.success('Sucess', deptSuspension);
    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }

  add() {
    this.deptSuspensionRecordService.Add(this.deptSuspensionRecord).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
      const toast = this.notificationsService.success('Sucess', deptSuspension);
    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }

  adddeed() {
    this.deptForm = true;
    this.deptSuspensionRecord = new DeptSuspensionRecord();
    this.deptSuspensionRecord.Certificate_Version_No = this.Selectedcert.Version_ID;
  }

  selectdeed(dept) {
    this.deptForm = true;
    this.deptSuspensionRecord = dept;

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: 'gray modal-lg'}));
  }

  closeModal(customer) {
    // this.person.Parent_Customer_ID = customer.Customer_ID;
    console.log('closeing.....');
    this.modalRef.hide();
  }

}

class DeptSuspensionRecord {
  public ID: string;
  public Certificate_Version_No: string;
  public Suspended_By: string;
  public Suspend_Start_Date: string;
  public Suspend_End_Date: string;
  public Suspend_Reason: string;
  public Letter_Ref_No: string;
  public Letter_Ref_Date: string;
  public Remark: string;
  public Is_Suspended: string;
  public Is_Released: string;
}
