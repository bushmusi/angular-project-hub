import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainVendorService } from "../maintain-vendor/maintain-vendor.service";

@Component({
  selector: "app-list-vendor",
  templateUrl: "./list-vendor.component.html",
  styleUrls: ["./list-vendor.component.css"],
})
export class ListVendorComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;

  @Input() workingUser;

  public VendorList: any;
  public vendor: Vendor;
  public edit_form = false;

  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  constructor(private vendorService: MaintainVendorService) {
    this.vendor = new Vendor();
  }

  ngOnInit() {
    this.getVendors();
    this.tabset.tabs[1].active = true;
  }

  getVendors() {
    this.vendorService.getVendors().subscribe(
      (response) => {
        this.VendorList = response["procCVendors"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  addNewVendor() {
    this.vendor = new Vendor();
    this.vendor.org_Code = this.workingUser.organization_code;
    this.edit_form = false;
    this.goto(0);
  }

  selectVendor($event, vendor) {
    $event.preventDefault();
    this.edit_form = true;
    this.vendor = vendor;
    this.goto(0);
  }

  closeup() {
    this.getVendors();
    this.goto(1);
    this.vendor = new Vendor();
    this.vendor.org_Code = this.workingUser.organization_code;
  }
}

class Vendor {
  public vendor_ID: any;
  public org_Code: any;
  public name: any;
  public telephone_Office: any;
  public mobile: any;
  public email: any;
  public address: any;
  public website: any;
  public sales_Tax_Type: any;
  public expense_Account: any;
  public vendor_Posting_Group: any;
  public gen_Bus_Posting_Group: any;
}
