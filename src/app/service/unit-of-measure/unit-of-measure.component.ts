import { Component, OnInit } from '@angular/core';
import { UnitOfMeasureService } from './unit-of-measure.service'
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-unit-of-measure',
  templateUrl: './unit-of-measure.component.html',
  styleUrls: ['./unit-of-measure.component.css']
})
export class UnitOfMeasureComponent implements OnInit {

  unitOfMeasureGroup: FormGroup
  unitOfMeasureList: any
  isEdit: boolean=false

  constructor(
    private service: UnitOfMeasureService,
    private notice: NotificationsService,
    private fb: FormBuilder
  ) { 
    this.unitOfMeasureGroup = this.fb.group({
      unit: ['',Validators.required],
      description: ['',Validators.required]
    })
  }

  ngOnInit() {
    this.getUnitMeasureList()
  }

  getUnitMeasureList(){

    this.service.getUnitMeasureList().subscribe(
      (res) => {
        this.unitOfMeasureList = res['proccUnits']
      },
      (err) => {
        console.log("Error",err);
        
      }
    )

  }

  selectItem(data){
    this.isEdit = true
    this.unitOfMeasureGroup.patchValue({
      unit: data.unit,
      description: data.description
    })
    this.unitOfMeasureGroup.controls['unit'].disable()
  }

  addUnitMeasure(){
    this.service.addUnitMeasure(this.unitOfMeasureGroup.value).subscribe(
      (res) => {
        this.isEdit = false
        this.getUnitMeasureList()
        this.unitOfMeasureGroup.reset()
        this.notice.success("Success","Added successfully")
      },
      (err) => {
        this.notice.error("Error",err)
        this.notice.error("Error",err.error)
        this.notice.error("Error",err.error['Message'])
      }
    )
  }

  updateUnitMeasure(){
    this.unitOfMeasureGroup.controls['unit'].enable()
    this.service.updateUnitMeasure(this.unitOfMeasureGroup.value).subscribe(
      (res) => {
        this.isEdit = false
        this.getUnitMeasureList()
        this.unitOfMeasureGroup.reset()
        this.notice.success("Success","Added successfully")
      },
      (err) => {
        this.notice.error("Error",err)
        this.notice.error("Error",err.error)
        this.notice.error("Error",err.error['Message'])
      }
    )
  }

  deleteUnitMeasureList(){
    if(confirm("Are you sure?"))
    {
      this.unitOfMeasureGroup.controls['unit'].enable()
      this.service.delteUnitMeasure(this.unitOfMeasureGroup.value).subscribe(
        (res) => {
          this.isEdit = false
          this.getUnitMeasureList()
          this.unitOfMeasureGroup.reset()
          this.notice.success("Success","Deleted successfully")
        },
        (err) => {
          this.notice.error("Error",err)
          this.notice.error("Error",err.error)
          this.notice.error("Error",err.error['Message'])
        }
      )

    }

  }

}
