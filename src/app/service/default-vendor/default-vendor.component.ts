import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-vendor',
  templateUrl: './default-vendor.component.html',
  styleUrls: ['./default-vendor.component.css']
})
export class DefaultVendorComponent implements OnInit {


  public VendorDefault : any;
  public GLExpenseAccounts : any;
  public DiscountGLAccounts :any;
  constructor() { }

  ngOnInit() {
  }

}
export class VendorDefault
{
  public DueOnthenextdays: string;
  public DueOnthenextmonth: string;  
  public DiscountIndays: string;
}
