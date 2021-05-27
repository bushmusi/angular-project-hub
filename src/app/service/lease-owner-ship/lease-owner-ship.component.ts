import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {LeaseOwnerShipService} from './lease-owner-ship.service';
import {ServiceComponent} from '../service.component';
import {NotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-lease-owner-ship',
  templateUrl: './lease-owner-ship.component.html',
  styleUrls: ['./lease-owner-ship.component.css']
})
export class LeaseOwnerShipComponent implements OnInit, OnChanges {
  tasks;
  leaseForm = false;
  addnew;
  @Input() SelectedPlot;
  public leaseOwnerShip: LeaseOwnerShip;

  constructor(private leaseOwnerShipService: LeaseOwnerShipService, public serviceComponent: ServiceComponent, private notificationsService: NotificationsService) {
    this.leaseOwnerShip = new LeaseOwnerShip();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('haha1', this.SelectedPlot);
    this.getleaseOwnerShip(this.SelectedPlot.Plot_ID);

    this.leaseForm = false;
    //this.plotManagment = this.SelectedPlot;
  }

  selectLease(task) {
    this.addnew = false;
    this.leaseForm = true;
    this.leaseOwnerShip = task;
  }

  addLease() {
    this.addnew = true;
    this.leaseForm = true;
    this.leaseOwnerShip = new LeaseOwnerShip();
  }


  getleaseOwnerShip(plotID) {
    this.leaseOwnerShipService.getAll(plotID).subscribe(CertificateVersion => {
      this.tasks = CertificateVersion;
      this.tasks = (Object.assign([], this.tasks.list));
      console.log('tasks', this.tasks);
    }, error => {
      console.log('error');
    });
  }


  save() {
    this.leaseOwnerShipService.save(this.leaseOwnerShip).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
      const toast = this.notificationsService.success('Sucess', deptSuspension);
    }, error => {
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }

  add() {
    this.leaseOwnerShipService.Add(this.leaseOwnerShip).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
      const toast = this.notificationsService.success('Sucess', deptSuspension);
    }, error => {
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }


}

class LeaseOwnerShip {
  public ID: string;
  public Type_ID: string;
  public Lease_No: string;
  public Lease_Price: string;
  public Free_Hold_M2: string;
  public Lease_Hold_M2: string;
  public Customer_ID: string;
}
