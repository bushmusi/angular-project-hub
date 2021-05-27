import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainCustomerService } from "./maintain-customer.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-maintain-customer",
  templateUrl: "./maintain-customer.component.html",
  styleUrls: ["./maintain-customer.component.css"],
})
export class MaintainCustomerComponent implements OnInit {
  public CustomerList: any;
  public TaxTypes: any;
  public BusPostingGroups: any;
  public CustomerPostingGroups: any;

  public customersSearchResult: any;

  @ViewChild("tabset") tabset: TabsetComponent;
  @Input() customer;
  @Input() edit_form;
  @Output() onclose = new EventEmitter();

  goto(id) {
    this.tabset.tabs[id].active = true;
  }

  constructor(
    private customerService: MaintainCustomerService,
    private notificationsService: NotificationsService
  ) {
    this.customer = new Customer();
  }

  ngOnInit() {
    this.getCustomers();
    this.getTaxType();
    this.getBusPostingGroups();
    this.getCustomerPostingGroups();
  }

  ngOnChanges(changes): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    if (changes.customer.currentValue) {
      this.customer = changes.customer.currentValue;
    }
  }
  getCustomers() {
    this.customerService.getCustomers().subscribe(
      (response) => {
        this.CustomerList = response["procCCustomerLoadAlls"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getCustomerPostingGroups() {
    this.customerService.getCustomerPostingGroups().subscribe(
      (response) => {
        this.CustomerPostingGroups = response["procCustomerPostingGroups"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getBusPostingGroups() {
    this.customerService.getBusPostingGroups().subscribe(
      (response) => {
        this.BusPostingGroups = response["procGenBusPostingGroupss"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getTaxType() {
    this.customerService.getTaxTypes().subscribe(
      (response) => {
        this.TaxTypes = response["procCTaxs"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  searchCustomers(event): void {
    this.customersSearchResult = this.CustomerList.filter((c) =>
      c.customer_ID.includes(event.query)
    );
  }

  addCustomer() {
    console.log(this.customer);
    this.customerService.addCustomer(this.customer).subscribe(
      (response) => {
        this.getCustomers();
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

  updateCustomer() {
    this.customerService.updateCustomer(this.customer).subscribe(
      (response) => {
        this.getCustomers();
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

  deleteCustomer() {
    if (confirm("are you sure you went to delete the selected item"))
      this.customerService.deleteCustomer(this.customer).subscribe(
        (response) => {
          this.getCustomers();
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
    // this.edit_form = false;
  }
  closeup() {
    this.onclose.emit();
  }
}

class Customer {
  public name: String;
  public customer_ID: string;
  public org_Code: String;
  public address: string;
  public website: String;
  public sales_Tax_Type: string;
  public customer_Posting_Group: String;
  public gen_Bus_Posting_Group: string;
}
