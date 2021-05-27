import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { WithholdingService } from './withholding.service';

@Component({
  selector: 'app-withholding',
  templateUrl: './withholding.component.html',
  styleUrls: ['./withholding.component.css']
})
export class WithholdingComponent implements OnInit {

  public withholdings: any;
  public withholding: Withholding;
  public IsAddFormVisible = false;

  constructor(
    private withholdingService: WithholdingService,
    private notificationsService: NotificationsService
  ) {
    this.withholding = new Withholding();
  }

  ngOnInit() {
    this.getWithholdings();
  }
  getWithholdings() {
    this.withholdingService.getWithholdings().subscribe(
      (response) => {
        console.log("group", response);
        this.withholdings = response["procWithPostingGroups"];
      },
      (error) => {
        const toast = this.notificationsService.error(
          "Error",
          "SomeThing Went Wrong"
        );
      }
    );
  }

  registerWithholding() {
    this.withholdingService
      .addWithholdings(this.withholding)
      .subscribe(
        (response) => {
          this.getWithholdings();
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

  updateWithholding(withholding) {
    this.withholdingService
      .updateWithholdings(withholding)
      .subscribe(
        (response) => {
          const toast = this.notificationsService.success("Success", "Saved");
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

  deleteWithholding(withholding) {
    if (confirm("Are you sure !!!"))
      this.withholdingService
        .deleteWithholdings(withholding)
        .subscribe(
          (response) => {
            this.getWithholdings();
            const toast = this.notificationsService.success("Success", "Saved");
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
    console.log("reroes", $event);
    this.updateWithholding($event["data"]);
  }

  clearForm() {
    this.withholding = new Withholding();
    this.IsAddFormVisible = !this.IsAddFormVisible;
  }
}

class Withholding {}
