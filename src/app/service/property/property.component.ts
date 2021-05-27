import {Component, Input, OnChanges} from '@angular/core';
import {ServiceService} from '../service.service';
import {TreeNode} from 'primeng/api';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnChanges {
  @Input() Parcel_ID;
  @Input() Mode;
  PlotManagementList;
  propertyForm;
  SelectedProperty;
  PropertyList;
  propertyregForm;
  selectedprofromtree;
  selectedFile;


  public SelectedProprtyPlot;
  files: TreeNode[] = [];

  constructor(private serviceService: ServiceService) {

  }

  ngOnChanges() {
    this.getPlotManagement();
  }


  getPlotManagement() {
    this.serviceService.getPlotManagement(this.Parcel_ID).subscribe(PlotManagementList => {
      this.PlotManagementList = PlotManagementList;
      this.PlotManagementList = (Object.assign([], this.PlotManagementList.list));
      console.log('PlotManagementList', PlotManagementList);
    }, error => {
      console.log('error');
    });
  }


  SelectProprty(property) {
    this.propertyForm = true;
    this.SelectedProperty = property;
    this.getPropertyList();
  }


  getPropertyList() {
    this.serviceService.getPropertyList(this.Parcel_ID).subscribe(PropertyList => {
      this.PropertyList = PropertyList;
      this.PropertyList = (Object.assign([], this.PropertyList.list));
      console.log('PropertyList', PropertyList);
      this.PropertyList.push({Property_ID: 'No Parent'});
      this.getTree(Object.assign([], this.PropertyList));
    }, error => {
      console.log('error');
    });

  }


  getTree(List) {
    this.files = [];
    for (let i = 0; i < this.PropertyList.length; i++) {
      let a;
      if (this.PropertyList[i].Property_Parent_ID == null) {
        a = Object.assign({}, this.PropertyList[i]);
        a.label = Object.assign(this.PropertyList[i].Property_ID);
        a.children = [];
        const l1 = Object.assign([], this.PropertyList);
        for (let j = 0; j < l1.length; j++) {
          let b;
          if (l1[j].Property_Parent_ID == a.Property_ID) {
            b = Object.assign({}, l1[j]);
            b.label = Object.assign(l1[j].Property_ID);
            b.children = [];
            a.children.push(b);
            l1[j].children = [];

            const l2 = Object.assign([], this.PropertyList);
            for (let k = 0; k < l2.length; k++) {
              let c;
              if (l2[k].Property_Parent_ID == b.Property_ID) {
                c = Object.assign({}, l2[k]);
                c.label = Object.assign(l2[k].Property_ID);
                c.children = [];
                b.children.push(c);
              }
            }
          }
        }
        this.files.push(a);
      }
    }
    console.log('this.files', this.files);
  }

  AddNew() {
    this.propertyregForm = true;
    this.selectedprofromtree = {};
    if (this.selectedFile) {
      this.selectedprofromtree.Property_Parent_ID = this.selectedFile.Property_ID;
    }
  }

  nodeSelect() {
    if (this.selectedFile.Property_ID == 'No Parent') {

      this.propertyregForm = false;
    } else {

      this.propertyregForm = true;
    }
    this.selectedprofromtree = this.selectedFile;
    console.log('any', this.selectedprofromtree);
  }

  SelectPropertyPLot(ProprtyPlot) {
    this.SelectedProprtyPlot = ProprtyPlot;
  }

}
