import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mse-application',
  templateUrl: './mse-application.component.html',
  styleUrls: ['./mse-application.component.css']
})
export class MseApplicationComponent implements OnInit {

  @Output() saveDataCompleted = new EventEmitter();
  @Input() licenceData;
  @Input() singleWin;

  constructor() { }

  ngOnInit() {
  }

  captureSaveDataEvent(response) {
    this.saveDataCompleted.emit(response);
  }
}
