import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-maintain-customer',
  templateUrl: './maintain-customer.component.html',
  styleUrls: ['./maintain-customer.component.css']
})
export class MaintainCustomerComponent implements OnInit {

  public Customers :any;
  public TaxTypes :any;
  @ViewChild('tabset') tabset: TabsetComponent;

  

  goto(id){
    this.tabset.tabs[id].active = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
