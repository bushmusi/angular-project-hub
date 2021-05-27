import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainCustomerService } from "../maintain-customer/maintain-customer.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-list-customer",
  templateUrl: "./list-customer.component.html",
  styleUrls: ["./list-customer.component.css"],
})
export class ListCustomerComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;

  public CustomerList: any;
  public customer: Customer;
  public edit_form = false;

  @Output() selected = new EventEmitter();

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
    this.goto(1);
    this.getCustomers();
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe(
      (response) => {
        this.CustomerList = response["procCCustomerLoadAlls"];
        console.log(this.CustomerList);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  selectCustomer($event, customer) {
    $event.preventDefault();
    this.edit_form = true;
    this.customer = customer;
    this.goto(0);
  }

  addNewCustomer() {
    this.customer = new Customer();
    this.edit_form = false;
    this.goto(0);
  }

  closeup() {
    this.goto(1);
    this.customer = new Customer();
    this.getCustomers();
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
