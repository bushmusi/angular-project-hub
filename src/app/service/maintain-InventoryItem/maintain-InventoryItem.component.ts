import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

@Component({
  selector: 'app-maintain-InventoryItem',
  templateUrl: './maintain-InventoryItem.component.html',
  styleUrls: ['./maintain-InventoryItem.component.css']
})
export class MaintainInventoryItemComponent implements OnInit {

   public InventoryItem : any;
   public DeleteInventoryItem :any;
  
   public InventoryItemIds  : any;

   public Buyers : any;
   public CostMethods :any;
  
   public ItemTaxTypes  : any;

   public GLSalesAccounts : any;
   public GLInventoryAccounts :any;
  
   public GLCostofSalesAccounts  : any;


   
   public ItemTypes : any;
   public PreferedVendors :any;
   
   
  public Customers :any;
  public ItemClasss : any;
  public GLFreightAccountss :any;

  @ViewChild('tabset') tabset: TabsetComponent;

  

  goto(id){
    this.tabset.tabs[id].active = true;
  }
  constructor() { }

  ngOnInit() {
  }

}
