import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-market-product",
  templateUrl: "./market-product.component.html",
  styleUrls: ["./market-product.component.css"]
})
export class MarketProductComponent implements OnInit {
  public BusinessProducts: any;

  public Periods = [
    { label: "period1", value: "period1" },
    { label: "period2", value: "period2" }
  ];
  constructor() {}

  ngOnInit() {}
}
