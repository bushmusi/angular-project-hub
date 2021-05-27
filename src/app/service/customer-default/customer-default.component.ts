import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-default',
  templateUrl: './customer-default.component.html',
  styleUrls: ['./customer-default.component.css']
})
export class CustomerDefaultComponent implements OnInit {


  public CustomerDefault : any;
  public GLExpenseAccounts : any;

  
  public DiscountGLAccounts : any;
  public PaymentMethodTypes : any;
   
  

  constructor() { }

  ngOnInit() {
  }

}
