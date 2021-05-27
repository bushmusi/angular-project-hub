import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-inventory',
  templateUrl: './default-inventory.component.html',
  styleUrls: ['./default-inventory.component.css']
})
export class DefaultInventoryComponent implements OnInit {


  public InventoryItemDefault :any;
  public ItemClassList : any;
  public DefaultItemClasss: any;
  public GLFreightAccounts : any;
  constructor() { }

  ngOnInit() {
  }

}
