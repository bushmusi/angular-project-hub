import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainInventoryitemService } from "./maintain-inventoryitem.service";
import { NotificationsService } from "angular2-notifications";

@Component({
  selector: "app-maintain-InventoryItem",
  templateUrl: "./maintain-InventoryItem.component.html",
  styleUrls: ["./maintain-InventoryItem.component.css"],
})
export class MaintainInventoryItemComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;

  @Input() inventoryItem;
  @Input() edit_form;
  @Input() workingUser;
  @Output() onclose = new EventEmitter();

  public DeleteInventoryItem: any;

  public InventoryItemIds: any;

  public Buyers: any;
  public CostMethods: any;
  public ItemTaxTypes: any;
  public ItemTypes: any;
  public PreferedVendors: any;
  public Customers: any;
  public ItemClasss: any;
  public vendorPostingGroups: any;
  inventoryItemIdResult: any;
  public inventoryPostingGroups: any;
  public productPostingGroups: any;

  goto(id) {
    this.tabset.tabs[id].active = true;
  }

  constructor(
    private inventoryItemService: MaintainInventoryitemService,
    private notificationsService: NotificationsService
  ) {
    this.inventoryItem = new InventoryItem();
  }

  ngOnInit() {
    this.getInventoryItems();
    this.getVendors();
    this.getCustomers();
    this.getVendorPostingGroup();
    this.getClasses();
    this.getCostMethods();
    this.getInventoryPostingGroup();
    this.getProductPostingGroup();
    this.getItemType();
  }

  getItemType() {
    this.inventoryItemService.getItemTypes().subscribe(
      (response) => {
        this.ItemTypes = response["procItemTypes"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getProductPostingGroup() {
    this.inventoryItemService.getProductPostingGroup().subscribe(
      (response) => {
        this.productPostingGroups =
          response["procGenProductPostingGroupLoadAlls"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getInventoryPostingGroup() {
    this.inventoryItemService.getInventoryPostingGroup().subscribe(
      (response) => {
        this.inventoryPostingGroups =
          response["procInventoryPostingGroups"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getVendorPostingGroup() {
    this.inventoryItemService.getVendorPostingGroup().subscribe(
      (response) => {
        this.vendorPostingGroups = response["procVendorPostingGroups"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getInventoryItems() {
    this.inventoryItemService.getInventoryItems().subscribe(
      (response) => {
        this.InventoryItemIds = response["inventoryItemss"];
        console.log("InventoryItemIds", this.InventoryItemIds);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getVendors() {
    this.inventoryItemService.getVendors().subscribe(
      (response) => {
        this.PreferedVendors = response["procCVendors"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getCustomers() {
    this.inventoryItemService.getCustomers().subscribe(
      (response) => {
        this.Buyers = response["procCCustomerLoadAlls"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getClasses() {
    this.inventoryItemService.getClasses().subscribe(
      (response) => {
        this.ItemClasss = response["proccItemClasss"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  getCostMethods() {
    this.inventoryItemService.getCostMethod().subscribe(
      (response) => {
        this.CostMethods = response["costMethods"];
        console.log("methods", this.CostMethods);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  searchItem(event): void {
    this.inventoryItemIdResult = this.InventoryItemIds.filter((c) => {
      return c.item_Name
        ? c.item_Name.includes(event.query)
        : false || c.inv_ID
        ? c.inv_ID.includes(event.query)
        : false;
    });
  }

  addInventoryItem() {
    console.log(this.inventoryItem);
    this.inventoryItem.org_Code = this.workingUser.organization_code;

    this.inventoryItemService.addItem(this.inventoryItem).subscribe(
      (response) => {
        this.getInventoryItems();
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

  updateInventoryItem() {
    this.inventoryItemService.updateItem(this.inventoryItem).subscribe(
      (response) => {
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

  deleteInventoryItem() {
    if (confirm("are you sure you went to delete the selected item"))
      this.inventoryItemService.deleteItem(this.inventoryItem).subscribe(
        (response) => {
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

  handleUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result
        .toString()
        .split(",")[1]);
      
      this.inventoryItem.picture = reader.result
        .toString()
        .split(",")[1];
    };
  }

  closeup() {
    this.onclose.emit();
  }
}

class InventoryItem {
  public inv_ID: any;
  public item_Name: any;
  public description: any;
  public item_Class: any;
  public price: any;
  public cost_Method: any;
  public orgCode: any;
  public last_Unit_Cost: any;
  public upC_SKU: any;
  public partNumber: any;
  public stocking_Unit: any;
  public weight: any;
  public shelf_No: any;
  public item_Tax_Type: any;
  public minimum_Stock: any;
  public reorder_Quantity: any;
  public referred_Vendor_id: any;
  public gen_Pord_Posting_Group: any;
  public inventory_Posting_Group: any;
  public picture = "";
  public buyer_ID: any;
  public json_Meta_Data: any;
  public json_Data: any;
  public log: any;
}
