import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { ServiceService } from '../../service.service'

import { filter, split } from 'lodash';

@Component({
  selector: 'app-proc-side-navbar',
  templateUrl: './proc-side-navbar.component.html',
  styleUrls: ['./proc-side-navbar.component.css']
})
export class ProcSideNavbarComponent implements OnInit {

  deptList: any

  arranges: any;

  @Input() currentType
  
  @Output() sendDeptClickCompleted = new EventEmitter();

  @Input() currentOrgType

  constructor(private serviceService: ServiceService) { 

    
  }

  ngOnInit(): void {
    
    this.serviceService.currentData.subscribe(
      (res) =>{
        console.log("success share ::"+res);
        this.currentOrgType = res
        this.loadDeptList()
      },
      (err) => {
        console.log("attempt fail::"+err);
        
      }
    )
  }
  

  loadDeptList() {
    this.serviceService.loadDeptList().subscribe(
      (res) => {
        this.deptList = res['procdepartmentss']
        this.filterStart()

      },
      (err) => {
        console.log("error occur when finish: ", err);

      }
    )
  }

  filterStart() {
    var tempRoot = filter(this.deptList, { departments_Department_Code: "00000000-0000-0000-0000-000000000000",organizations_Organization_Code: this.currentOrgType })
    
    this.arranges = [];
    for (var child of tempRoot) {
      child.expanded = false;
      child.label = child.department_Name;
      child.data = child.department_Code;
      child.children = this.fileterByParrentID(child.department_Code);
      for (var children of child.children) {
        children.label = children.department_Name;
        children.data = children.department_Code;
        children.children = this.fileterByParrentID(children.department_Code);
        for (var children5 of children.children) {
          children5.label = children5.department_Name;
          children5.data = children5.department_Code;
          children5.children = this.fileterByParrentID(children5.department_Code);
          for (var children3 of children5.children) {
            children3.label = children3.department_Name;
            children3.data = children3.department_Code;
            children3.children = this.fileterByParrentID(children3.department_Code)
            this.treeBuilder(children3.children)
          }
        }
      }
      this.arranges.push(child)
    }

  }

  fileterByParrentID(topicCode) {
    
    return filter(this.deptList, { departments_Department_Code: topicCode });

  }

  treeBuilder(data) {

    for (var temp of data) {
      temp.label = temp.department_Name;
      temp.data = temp.department_Code;
      temp.children = this.fileterByParrentID(temp.department_Code);
      const temp1 = temp.children
      if (temp1.length > 0) {
        return this.treeBuilder(temp1)
      }
    }

  }

  nodeSelect($event) {
    console.log('$event Dept', $event.node);
    this.currentType = $event.node['department_Code']
    console.log("current press Dept: ", this.currentType);
    this.sendDeptClickCompleted.emit($event);
  }


}
