import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { ServiceService } from '../service.service'

import { filter, split } from 'lodash';

@Component({
  selector: 'app-org-side-navbar',
  templateUrl: './org-side-navbar.component.html',
  styleUrls: ['./org-side-navbar.component.css']
})
export class OrgSideNavbarComponent implements OnInit {

  constructor(private serviceService: ServiceService) { }

  orgList: any

  arranges: any;

  @Input() currentType
  
  @Output() sendClickCompleted = new EventEmitter();

  ngOnInit(): void {

    this.loadOrgList()
  }

  loadOrgList() {
    this.serviceService.getListOfOrg().subscribe(
      (res) => {
        this.orgList = res['procorganizationss']
        this.filterStart()

      },
      (err) => {
        console.log("error occur when finish: ", err);

      }
    )
  }

  filterStart() {
    var tempRoot = filter(this.orgList, { organizations_Organization_Code: null })
    
    this.arranges = [];
    for (var child of tempRoot) {
      child.expanded = false;
      child.label = child.name_En;
      child.data = child.organization_Code;
      child.children = this.fileterByParrentID(child.organization_Code);
      for (var children of child.children) {
        children.label = children.name_En;
        children.data = children.organization_Code;
        children.children = this.fileterByParrentID(children.organization_Code);
        for (var children5 of children.children) {
          children5.label = children5.name_En;
          children5.data = children5.organization_Code;
          children5.children = this.fileterByParrentID(children5.organization_Code);
          for (var children3 of children5.children) {
            children3.label = children3.name_En;
            children3.data = children3.organization_Code;
            children3.children = this.fileterByParrentID(children3.organization_Code)
            this.treeBuilder(children3.children)
          }
        }
      }
      this.arranges.push(child)
    }

  }

  fileterByParrentID(topicCode) {
    
    return filter(this.orgList, { organizations_Organization_Code: topicCode });
  }

  treeBuilder(data) {
    console.log("current length is: ", data.length);

    for (var temp of data) {
      temp.label = temp.name_En;
      temp.data = temp.organization_Code;
      temp.children = this.fileterByParrentID(temp.organization_Code);
      const temp1 = temp.children
      if (temp1.length > 0) {
        return this.treeBuilder(temp1)
      }
    }

  }

  nodeSelect($event) {
    console.log('$event ORG', $event.node);
    this.currentType = $event.node['organization_Code']
    console.log("current press ORG: ", this.currentType);
    this.sendClickCompleted.emit($event);
  }

}
