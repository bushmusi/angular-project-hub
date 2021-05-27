import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { groupBy } from 'lodash';
import { ServiceService } from '../service.service'
import { filter, split } from 'lodash';
import { TreeNode } from 'primeng/api';
import { BudgetTypeComponent } from '../budget-type/budget-type.component'

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {

  parentList: any;
  parentValue: any;
  currentUserID: any;
  listOfTree: []
  temp: any
  root: any
  arranges: any;
  @Input() currentType
  @Output() saveDataCompleted = new EventEmitter();


  constructor(private serviceService: ServiceService,private budgetTypeComponent: BudgetTypeComponent) { }
  // constructor(private serviceService: ServiceService) { }

  ngOnInit(): void {
    
    this.getListOfParent()
    console.log("side nav bar called");
    

  }

  setParent(parentVal: any){
    console.log("set pressed:",parentVal);
    
    this.budgetTypeComponent.budgetTypeForm.parent = parentVal
  }

  getListOfParent(){

    this.serviceService.loadBudgetType().subscribe(
      (res) => {
        
        this.parentList = res["budgetTypes"]
        this.temp  = groupBy(this.parentList, "parent")
        console.log("grouped one:",this.parentList);
        this.filterStart()

      },
      (error) => console.log("Error ocured: ",error)
    )
  }

  filterStart() {
    var tempRoot = filter(this.parentList, {parent: null})
    this.arranges = [];
    for(var child of tempRoot){
      child.expanded = false;
      child.label = child.code;
      child.data = child.code;
      child.children = this.fileterByParrentID(child.code);
      for(var children of child.children){
        children.label = children.code;
        children.data = children.code;
        children.children = this.fileterByParrentID(children.code);
        for (var children5 of children.children) {
          children5.label = children5.code;
          children5.data = children5.code;
          children5.children = this.fileterByParrentID(children5.code);
          for (var children3 of children5.children) {
            children3.label = children3.code;
            children3.data = children3.code;
            children3.children = this.fileterByParrentID(children3.code)
            this.treeBuilder(children3.children)
          }
        }
      }
      this.arranges.push(child)
    }
    
    
  }

  treeBuilder(data){
    
    
    
    for(var temp of data){
      temp.label = temp.code;
      temp.data = temp.code;
      temp.children = this.fileterByParrentID(temp.code);
      const temp1 = temp.children
      if( temp1.length > 0){
        return this.treeBuilder(temp1)
      }
    }

    console.log("current data: ",data);

  }
  
  findTopicID(name, parrentID) {
    return filter(this.parentList, { description: name, parent: parrentID })[0];
  }
  
  fileterByParrentID(topicCode) {
    return filter(this.parentList, { parent: topicCode });
  }

  nodeSelect($event) {
    console.log('$event', $event.node);
    this.currentType = $event.node['code']
    console.log("current press: ",this.currentType);
    this.saveDataCompleted.emit($event); 
  }


}
