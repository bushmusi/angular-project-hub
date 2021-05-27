import { Component, OnInit } from "@angular/core";
import { NotificationsService } from "angular2-notifications";
import { Guid } from "guid-typescript";
import { JobCreationSettingService } from "../../job-creation-setting.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  productDropdown: any;
  product: Product;
  products: any;
  public sectors: any;
  subSectors:any
  editForm = false;

  constructor(
    private socialAffairService: JobCreationSettingService,
    private notificationsService: NotificationsService
  ) {
    this.clearForm();
  }

  ngOnInit() {
    this.getProducts();
    this.getGetLookups();
  }

  getGetLookups() {
    this.socialAffairService.getLookup("Sector").subscribe(response => {
      this.sectors = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      console.log("lookup", response);
    });

    this.socialAffairService.getLookup("sub_Sector").subscribe(response => {
      this.subSectors = this.refactorDropdownArray(
        response,
        "english_description",
        "lkdetail_code"
      );
      console.log("lookup", response);
    });
  }

  getProducts() {
    this.socialAffairService.getProduct().subscribe(
      response => {
        console.log("get-all", response);
        this.products = response["procProducts"];
        this.productDropdown = this.refactorDropdownArray(
          this.products,
          "name",
          "id"
        );
      },
      error => {
        const toast = this.notificationsService.error(
          "error",
          "Something went wrong"
        );
        console.log("get-all-error", error);
      }
    );
  }

  registerProduct() {
    this.socialAffairService.registerProduct(this.product).subscribe(
      response => {
        console.log("post", response);
        const toast = this.notificationsService.success("Success", "deleted");
        this.getProducts();
        this.clearForm();
      },
      error => {
        const toast = this.notificationsService.error(
          "error",
          "Something went wrong"
        );
        console.log("post-error", error);
      }
    );
  }

  updateProduct() {
    this.socialAffairService.updateProduct(this.product).subscribe(
      response => {
        console.log("put", response);
        const toast = this.notificationsService.success("Success", "deleted");
        this.getProducts();
        this.clearForm();
      },
      error => {
        const toast = this.notificationsService.error(
          "error",
          "Something went wrong"
        );
        console.log("put-error", error);
      }
    );
  }

  deleteProduct() {

    if(confirm("Are you sure to delete")){
      this.socialAffairService.deleteProduct(this.product).subscribe(
        response => {
          console.log("delete", response);
          const toast = this.notificationsService.success("Success", "deleted");
          this.getProducts();
          this.clearForm();
        },
        error => {
          console.log("delete-error", error);
          const toast = this.notificationsService.error(
            "error",
            "Something went wrong"
          );
        }
      );
    }
  }

  initiateEdit(product) {
    this.product = product;
    this.editForm = true;
  }

  refactorDropdownArray(array, label, value) {
    let newArray = [];
    array.forEach(element => {
      newArray.push({ label: element[label], value: element[value] });
    });
    return newArray;
  }

  clearForm() {
    this.product = new Product();
    this.product.id = Guid.create();
    this.product.id = this.product.id.value;

    this.editForm = false;
  }
}

class Product {
  public id: any;
  public code: any;
  public name: any;
  public sector: any;
  public sub_Sector: any;
  public parent: any;
  public iS_Active: any;
}
