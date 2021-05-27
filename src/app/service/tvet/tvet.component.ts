import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tvet",
  templateUrl: "./tvet.component.html",
  styleUrls: ["./tvet.component.css"]
})
export class TvetComponent implements OnInit {
  public ApplicationTabActive = true;
  public SupportTabActive = false;

  constructor() {}

  ngOnInit() {}
}
