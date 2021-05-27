import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  @ViewChild('tabset') tabset: TabsetComponent;

  public CustomerList : any;

  goto(id){
    this.tabset.tabs[id].active = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
