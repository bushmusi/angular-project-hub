import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainVendorService } from "./maintain-vendor.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-maintain-vendor",
  templateUrl: "./maintain-vendor.component.html",
  styleUrls: ["./maintain-vendor.component.css"],
})
export class MaintainVendorComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;
  public TaxTypes: any;
  public VendorList: any;
  public SalesTaxTypes: any;
  public vendorPostingGroups: any;
  public BusPostingGroups: any;
  public vendorsSearchResult: any;

  @Input() vendor;
  @Input() workingUser;
  @Input() edit_form;
  @Output() onclose = new EventEmitter();

  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  constructor(
    private vendorService: MaintainVendorService,
    private notificationsService: NotificationsService
  ) {
    this.vendor = new Vendor();
  }

  ngOnInit() {
    this.getVendors();
    this.getTaxType();
    this.getBusPostingGroups();
    this.getVendorPostingGroup();
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

  getBusPostingGroups() {
    this.vendorService.getBusPostingGroups().subscribe(
      (response) => {
        this.BusPostingGroups = response["procGenBusPostingGroupss"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getVendorPostingGroup() {
    this.vendorService.getVendorPostingGroup().subscribe(
      (response) => {
        this.vendorPostingGroups = response["procVendorPostingGroups"];
        console.log("vendor", this.vendorPostingGroups);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getTaxType() {
    this.vendorService.getTaxTypes().subscribe(
      (response) => {
        this.TaxTypes = response["procCTaxs"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  searchVendors(event): void {
    this.vendorsSearchResult = this.VendorList.filter(
      (c) =>
        c.vendor_ID.toLowerCase().includes(event.query.toLowerCase()) ||
        c.name.toLowerCase().includes(event.query.toLowerCase())
    );
    console.log(this.vendor);
  }

  addVendor() {
    console.log(this.vendor);
    this.vendor.org_Code = this.workingUser.organization_code;
    this.vendor.userID = this.workingUser.userId;

    this.vendorService.addVendor(this.vendor).subscribe(
      (response) => {
        this.getVendors();
        const toast = this.notificationsService.success("Success", "Saved");
        this.closeup();
      },
      (error) => {
        console.log("res", error);

        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  updateVendor() {
    this.vendor.userID = this.workingUser.userId;
    this.vendorService.updateVendor(this.vendor).subscribe(
      (response) => {
        this.getVendors();
        const toast = this.notificationsService.success("Success", "Saved");
        this.closeup();
      },
      (error) => {
        console.log("res", error);

        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  deleteVendor() {
    if (confirm("are you sure you went to delete the selected item"))
      this.vendorService.deleteVendor(this.vendor.vendor_ID).subscribe(
        (response) => {
          this.getVendors();
          const toast = this.notificationsService.success("Success", "Saved");
          this.closeup();
        },
        (error) => {
          console.log("res", error);

          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  cleanUp() {
    this.vendor = new Vendor();
  }

  closeup() {
    this.onclose.emit();
  }
}
class Vendor {}
