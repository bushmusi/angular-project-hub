import { Component, OnInit,  Output, Input, EventEmitter } from '@angular/core';

import { JobCreationService } from './job-creation.service'

import {FormGroup, FormBuilder,Validators } from '@angular/forms'

import { NotificationsService } from "angular2-notifications";

import { filter, } from 'lodash';

import { Guid } from "guid-typescript"; //guid excuter


@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation.component.html',
  styleUrls: ['./job-creation.component.css']
})
export class JobCreationComponent implements OnInit {

  public JobCreations: any
  jobCreationFormGroup: FormGroup
  jobList: any
  nextDisabled: boolean=true
  isToEdit: boolean=false
  temp: any
  sectorList: any
  subSectorList: any
  guidID: any

  @Output() sendCompleted = new EventEmitter()
  @Input() job
  @Input() currentJobID


  constructor(
    private fb: FormBuilder,
    private jobService: JobCreationService,
    private notice: NotificationsService
  ) { }
 
  ngOnInit() {

    this.job = false

    this.createForm()

    this.getJobList()

    this.getSectorList()

    this.getSubSectorList()
    
  }

  createForm(){
    this.jobCreationFormGroup = this.fb.group({
      buS_OPP_ID: [''],
      code: ['', Validators.required],
      name: ['', Validators.required],
      sector: ['', Validators.required],
      sub_Sector: ['', Validators.required],
      other_Sector: ['', Validators.required],
      objective: ['', Validators.required],
      profitable_Percent: ['', Validators.required],
      business_Plan: ['', Validators.required],
      jobOpen_For_ENT: ['', Validators.required],
      job_Open_For_Job_Seeker: ['', Validators.required]
    })
  }

  getJobList(){
    this.jobService.getJobList().subscribe(
      (res) => {
        
        this.jobList = res['procBusinessOppoForjobCreations']
        
        console.log("job list: ",this.jobList);
      },
      (err) => {
        console.log("Error",err)
        this.notice.error('Error',err.error)
        this.notice.error('Error',err.error['Message'])
        this.notice.error('Error',err.error['statusType'])
      } 
    )
  }

  addJob(){
    console.log("A"+this.jobCreationFormGroup.value['business_Plan']+'Z');
    
    if(this.jobCreationFormGroup.value['business_Plan'] == null || this.jobCreationFormGroup.value['business_Plan'] == ""){
      
      this.notice.error('Error',"Bussiness Plan is required")
    }
    else{
      this.guidID= Guid.create()
      this.jobCreationFormGroup.patchValue({
        buS_OPP_ID: this.guidID.value
      })
      this.jobService.addJob(this.jobCreationFormGroup.value).subscribe(
        (res) => {
          this.getJobList()
          console.log("Success",res)
          this.notice.success('Success',res)
          this.nextDisabled = false
          this.currentJobID = this.jobCreationFormGroup.value['buS_OPP_ID']
          this.jobCreationFormGroup.reset()
          this.job = true
          
        },
        (err) => {
          console.log("Error",err)
          this.notice.error('Error',err.error)
          this.notice.error('Error',err.error['Message'])
          this.notice.error('Error',err.error['statusType'])
        },
      )
    }

  }

  updateJob(){
    this.jobService.updateJob(this.jobCreationFormGroup.value).subscribe(
      (res) => {
        this.currentJobID = this.jobCreationFormGroup.value['buS_OPP_ID']
        this.getJobList()
        console.log("Success",res)
        this.notice.success('Success',res)
        this.nextDisabled = false
        this.jobCreationFormGroup.reset()
        this.isToEdit = false
      },
      (err) => {
        console.log("Error",err)
        this.notice.error('Error',err.error)
        this.notice.error('Error',err.error['Message'])
        this.notice.error('Error',err.error['statusType'])
      },
    )
  }

  deleteJob(){
    if(confirm("Are you sure to delete")){

      this.jobService.deleteJob(this.jobCreationFormGroup.value).subscribe(
        (res) => {
          this.getJobList()
          console.log("Success",res)
          this.notice.success('Success',res)
          this.jobCreationFormGroup.reset()
          
          this.isToEdit = false
        },
        (err) => {
          console.log("Error",err)
          this.notice.error('Error',err.error)
          this.notice.error('Error',err.error['Message'])
          this.notice.error('Error',err.error['statusType'])
        },
      )

    }

  }

  nextTask(){
    console.log("Step-1 Next is pressed value:",this.currentJobID);
    
    this.sendCompleted.emit(this.currentJobID)
  }

  selectJob(data){
    this.jobCreationFormGroup.reset()
    this.isToEdit = true
    this.jobCreationFormGroup.patchValue({
      buS_OPP_ID: data.buS_OPP_ID,
      code: data.code,
      name: data.name,
      sector: data.sector,
      sub_Sector: data.sub_Sector,
      other_Sector: data.other_Sector,
      objective: data.objective,
      profitable_Percent: data.profitable_Percent,
      business_Plan: data.business_Plan,
      jobOpen_For_ENT: data.jobOpen_For_ENT,
      job_Open_For_Job_Seeker: data.job_Open_For_Job_Seeker
    })
  }

  upload(event) {
    
    const File = event.files[0];
    let base64file;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener('loadend', (e) => {
      base64file = reader.result.toString().split(",")[1];
      this.jobCreationFormGroup.patchValue({
        business_Plan: base64file
      })
      this.notice.info('Success','Uploaded successfully')
    });

  }

  getSectorList(){
    this.jobService.getSectorList().subscribe(
      (res) => {
        this.sectorList = res
      },
      (err) => {
        console.log("Error sector fetch: ",err);
        
      }
    )
  }

  getSubSectorList(){
    this.jobService.getSubSectorList().subscribe(
      (res) => {
        // this.subSectorList = filter(this.res, { departments_Department_Code: topicCode });
        this.subSectorList = res
      },
      (err) => {
        console.log("Error sector fetch: ",err);
        
      }
    )
  }

}
