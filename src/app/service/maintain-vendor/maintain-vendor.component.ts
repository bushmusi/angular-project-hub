import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-maintain-vendor',
  templateUrl: './maintain-vendor.component.html',
  styleUrls: ['./maintain-vendor.component.css']
})
export class MaintainVendorComponent implements OnInit {

  
  
  @ViewChild('tabset') tabset: TabsetComponent;
public TaxTypes : any;
  public Vendors: any;
  public SalesTaxTypes : any;

  goto(id){
    this.tabset.tabs[id].active = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
