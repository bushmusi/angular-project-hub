import {Component, Input, OnChanges} from '@angular/core';
import {ServiceService} from '../service.service';
import {PlotManagment} from '../plot-managment/plot-managment.component';
import {ServiceComponent} from '../service.component';

@Component({
  selector: 'app-plot',
  templateUrl: './plot.component.html',
  styleUrls: ['./plot.component.css']
})
export class PlotComponent implements OnChanges {
  @Input() Parcel_ID;
  @Input() Mode;
  PlotManagementList;
  SelectedPlot;
  plotForm;

  constructor(private serviceService: ServiceService, private serviceComponent: ServiceComponent) {
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


  SelectPLot(plot) {
    this.SelectedPlot = plot;
    this.plotForm = true;
  }

  AddPLot() {
    this.plotForm = true;
    const plot = new PlotManagment();
    plot.SDP_ID = this.serviceComponent.licenceData.SDP_ID;
    this.SelectedPlot = plot;
  }


}
