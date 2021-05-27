import { Component, OnInit } from '@angular/core';
import { JobCreationSettingService } from '../../job-creation-setting/job-creation-setting.service'

@Component({
  selector: 'app-setting-application',
  templateUrl: './setting-application.component.html',
  styleUrls: ['./setting-application.component.css']
})
export class SettingApplicationComponent implements OnInit {

  job: boolean = true
  location: boolean = false
  currentJobID: any

  constructor(
    private jobCreationSettingService: JobCreationSettingService
  ) { }

  ngOnInit() {
  }

  sendCompleted(data){
    
    
    this.job  = false
    this.location = true 
    console.log("Step-2 from setting-app data we get value:",data);
    

    this.jobCreationSettingService.updateMessage(data)

  }
}
