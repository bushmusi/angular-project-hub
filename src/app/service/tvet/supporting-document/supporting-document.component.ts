import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-supporting-document",
  templateUrl: "./supporting-document.component.html",
  styleUrls: ["./supporting-document.component.css"]
})
export class SupportingDocumentComponent implements OnInit {
  public Documents = [
    {
      name: "Document one"
    },
    {
      name: "Document two"
    }
  ];
  constructor() {}

  ngOnInit() {}
}
