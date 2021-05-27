import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-mse",
  templateUrl: "./mse.component.html",
  styleUrls: ["./mse.component.css"]
})
export class MseComponent implements OnInit {
  @Output() saveDataCompleted = new EventEmitter();
  @Input() licenceData;
  @Input() singleWin;
  
  public ApplicationTabActive = true;
  public SupportTabActive = false;

  constructor() {}

  ngOnInit() {}
  
  captureSaveDataEvent(response) {
    this.saveDataCompleted.emit(response);
  }
}
