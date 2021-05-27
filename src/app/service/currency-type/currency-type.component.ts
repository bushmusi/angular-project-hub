import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';  
import { CurrencyTypeService } from './currency-type.service';
import { NotificationsService } from 'angular2-notifications';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-currency-type',
  templateUrl: './currency-type.component.html',
  styleUrls: ['./currency-type.component.css']
})
export class CurrencyTypeComponent implements OnInit {

  currencyFormGroup: FormGroup
  isEdit: boolean = false
  currencyList: any

  constructor(
    private fb: FormBuilder,
    private service: CurrencyTypeService,
    private notice: NotificationsService,
  ) { 
    
    this.currencyFormGroup = this.fb.group({
      currencyID: ['',Validators.required],
      name: ['',Validators.required],
      enable: [false],
      current_Value_To_Birr: ['',Validators.required],
    })

  }

  ngOnInit() {
    
    this.getCurrencyList()

  }

  getCurrencyList() {
    this.service.getCurrencyList().subscribe(
      (res) => {
        this.currencyList = res['procCCurrencyIDs']
        console.log("currencty list:",this.currencyList);
        
        
      },
      (err) => {
        console.log("Error",err);
        
      }
    )
  }

  selectCurrency(data){
    
    this.isEdit = true
    
    this.currencyFormGroup.patchValue({
      currencyID: data.currencyID,
      name: data.name,
      enable: data.enable,
      current_Value_To_Birr: data.current_Value_To_Birr,
    })
    this.currencyFormGroup.controls['currencyID'].disable()
    


  }

  addCurrency(){
    this.service.addCurrency(this.currencyFormGroup.value).subscribe(
      (res) => {
        this.notice.success("Success","Added Successfully")
        this.currencyFormGroup.reset()
        this.getCurrencyList()
      },
      (err) => {
        console.log("Error",err);
        
        this.notice.error("Error",err.error)
        this.notice.error("Error",err.error['Message'])
        this.notice.error("Error",err.error['statusType'])
      }
    )
  }

  updateCurrency(){
    this.currencyFormGroup.controls['currencyID'].enable()
    this.service.updateCurrency(this.currencyFormGroup.value).subscribe(
      (res) => {
        this.notice.success("Success","updated Successfully")
        this.currencyFormGroup.reset()
        this.getCurrencyList()
        this.isEdit = false
      },
      (err) => {
        console.log("Error",err);
        
        this.notice.error("Error",err.error)
        this.notice.error("Error",err.error['Message'])
        this.notice.error("Error",err.error['statusType'])
      }
    )
  }

  deleteCurrency(){
    if(confirm("Are you sure?")){
      this.currencyFormGroup.controls['currencyID'].enable()
      this.service.deleteCurrency(this.currencyFormGroup.value).subscribe(
        (res) => {
          this.notice.success("Success","deleted Successfully")
          this.currencyFormGroup.reset()
          this.getCurrencyList()
          this.isEdit = false
        },
        (err) => {
          console.log("Error",err);
          
          this.notice.error("Error",err.error)
          this.notice.error("Error",err.error['Message'])
          this.notice.error("Error",err.error['statusType'])
        }
      )
    }

  }

}
