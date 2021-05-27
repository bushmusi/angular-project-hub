import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { TabsetComponent } from "ngx-bootstrap";
import { MaintainInventoryitemService } from "../maintain-InventoryItem/maintain-inventoryitem.service";

@Component({
  selector: "app-list-inventory",
  templateUrl: "./list-inventory.component.html",
  styleUrls: ["./list-inventory.component.css"],
})
export class ListInventoryComponent implements OnInit {
  @ViewChild("tabset") tabset: TabsetComponent;
  @Input() workingUser;

  public InventoryLists: any;

  goto(id) {
    this.tabset.tabs[id].active = true;
  }
  inventoryItem: InventoryItem;
  public edit_form = false;

  constructor(private inventoryItemService: MaintainInventoryitemService) {
    this.inventoryItem = new InventoryItem();
  }

  ngOnInit() {
    this.goto(1);
    this.getInventoryItems();
  }

  getInventoryItems() {
    this.inventoryItemService.getInventoryItems().subscribe(
      (response) => {
        this.InventoryLists = response["inventoryItemss"];
      },
      (error) => {
        console.log("error");
      }
    );
  }

  selectInventory($event, inventoryItem) {
    console.log(inventoryItem)
    $event.preventDefault();
    this.edit_form = true;
    this.inventoryItem = inventoryItem;
    this.goto(0);
  }

  addNewInventory() {
    this.inventoryItem = new InventoryItem();
    this.edit_form = false;
    this.goto(0);
  }
  
  closeup() {
    this.goto(1);
    this.inventoryItem = new InventoryItem();
    this.getInventoryItems();
  }
}

class InventoryItem {}
