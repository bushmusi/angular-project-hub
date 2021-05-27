import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { InventoryPostingGroupService } from './inventory-posting-group.service';

@Component({
  selector: 'app-inventory-posting-group',
  templateUrl: './inventory-posting-group.component.html',
  styleUrls: ['./inventory-posting-group.component.css']
})
export class InventoryPostingGroupComponent implements OnInit {

  public inventoryPostingGroups: any;
  public inventoryPostingGroup: InventoryPostingGroup;
  public IsAddFormVisible = false;

  constructor(
    private inventoryPostingGroupService: InventoryPostingGroupService,
    private notificationsService: NotificationsService
  ) {
    this.inventoryPostingGroup = new InventoryPostingGroup();
  }

  ngOnInit() {
    this.getInventoryPostingGroups();
  }
  getInventoryPostingGroups() {
    this.inventoryPostingGroupService.getInventoryPostingGroups().subscribe(
      (response) => {
        console.log("group", response);
        this.inventoryPostingGroups = response["procInventoryPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerInventoryPostingGroup() {
    this.inventoryPostingGroupService
      .addInventoryPostingGroups(this.inventoryPostingGroup)
      .subscribe(
        (response) => {
          this.getInventoryPostingGroups();
          const toast = this.notificationsService.success("Success", "Saved");
          this.clearForm();
        },
        (error) => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  updateInventoryPostingGroup(inventoryPostingGroup) {
    this.inventoryPostingGroupService
      .updateInventoryPostingGroups(inventoryPostingGroup)
      .subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "Updated");
        },
        (error) => {
          console.log("reroes", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  deleteInventoryPostingGroup(inventoryPostingGroup) {
    if(confirm("Are you sure you went to delete !!"))
    this.inventoryPostingGroupService
      .deleteInventoryPostingGroups(inventoryPostingGroup)
      .subscribe(
        (response) => {
          this.getInventoryPostingGroups();
          const toast = this.notificationsService.success("Success", "Deleted");
        },
        (error) => {
          console.log("reroes", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  performUpdate($event) {
    this.updateInventoryPostingGroup($event["data"]);
  }

  clearForm() {
    this.inventoryPostingGroup = {};
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class InventoryPostingGroup {}
