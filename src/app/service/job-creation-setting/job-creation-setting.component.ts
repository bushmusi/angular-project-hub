import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-creation-setting',
  templateUrl: './job-creation-setting.component.html',
  styleUrls: ['./job-creation-setting.component.css']
})
export class JobCreationSettingComponent implements OnInit {

  public ApplicationTabActive = true;
  public SupportTabActive = false;

  constructor() { }

  ngOnInit() {
  }

}
