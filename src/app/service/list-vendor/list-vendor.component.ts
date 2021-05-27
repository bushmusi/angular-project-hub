import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-list-vendor',
  templateUrl: './list-vendor.component.html',
  styleUrls: ['./list-vendor.component.css']
})
export class ListVendorComponent implements OnInit {


  @ViewChild('tabset') tabset: TabsetComponent;

  
public VendorList : any;
  goto(id){
    this.tabset.tabs[id].active = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
