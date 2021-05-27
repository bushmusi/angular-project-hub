import {Component, Input, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {TitleDeedRegistrationService} from './title-deed-registration.service';
import {ServiceComponent} from '../service.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-title-deed-registration',
  templateUrl: './title-deed-registration.component.html',
  styleUrls: ['./title-deed-registration.component.css']
})
export class TitleDeedRegistrationComponent implements OnInit, OnChanges {
  public titleDeedRegistration: TitleDeedRegistration;
  titleDeedRegistrationList;
  deedform = false;
  @Input() selectedpro;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private titleDeedRegistrationService: TitleDeedRegistrationService, public serviceComponent: ServiceComponent, private notificationsService: NotificationsService) {
    this.titleDeedRegistration = new TitleDeedRegistration();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('chang detected');
    this.getdeed(this.selectedpro.Property_ID);
  }

  getdeed(propertyid) {
    this.titleDeedRegistrationService.getAll(propertyid).subscribe(titleDeedRegistration => {
      let a;
      a = titleDeedRegistration;
      this.titleDeedRegistrationList = (Object.assign([], a.list));
      console.log('this.titleDeedRegistration', this.titleDeedRegistrationList);
    }, error => {
      console.log(error);
    });
  }


  save() {
    this.titleDeedRegistrationService.save(this.titleDeedRegistration).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
      const toast = this.notificationsService.success('Sucess', deptSuspension);
    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }

  add() {
    this.titleDeedRegistrationService.Add(this.titleDeedRegistration).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
      const toast = this.notificationsService.success('Sucess', deptSuspension);
    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }

  adddeed() {
    this.deedform = true;
    this.titleDeedRegistration = new TitleDeedRegistration();
  }

  selectdeed(deed) {
    this.deedform = true;
    this.titleDeedRegistration = deed;

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

class TitleDeedRegistration {
  public TitleDeedNo: string;
  public Property_ID: string;
  public Date: string;
  public Transfer_From_Customer: string;
  public ParentDeedID: string;
  public Transfer_Type: string;
  public Is_Active: boolean;
  public Is_Deleted: boolean;

}
