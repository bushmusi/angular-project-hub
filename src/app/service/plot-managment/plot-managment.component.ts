import {Component, Input, OnChanges, OnInit, TemplateRef} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ServiceComponent} from '../service.component';
import {PloatManagmentService} from './ploat-managment.service';
import {NotificationsService} from 'angular2-notifications';


@Component({
  selector: 'app-plot-managment',
  templateUrl: './plot-managment.component.html',
  styleUrls: ['./plot-managment.component.css']
})
export class PlotManagmentComponent implements OnInit, OnChanges {
  modalRef: BsModalRef;
  public plotManagment: PlotManagment;
  @Input() SelectedPlot;

  constructor(private modalService: BsModalService, public serviceComponent: ServiceComponent, private ploatManagmentService: PloatManagmentService, private notificationsService: NotificationsService) {
    this.plotManagment = new PlotManagment();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    console.log('haha1', this.SelectedPlot);
    this.plotManagment = this.SelectedPlot;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    console.log('closeing.....');
    this.plotManagment.GISCoordinate =
      this.plotManagment.GIS_X_Coordinate_1 + ':' +
      this.plotManagment.GIS_Y_Coordinate_1 + ',' +
      this.plotManagment.GIS_X_Coordinate_2 + ':' +
      this.plotManagment.GIS_Y_Coordinate_2 + ',' +
      this.plotManagment.GIS_X_Coordinate_3 + ':' +
      this.plotManagment.GIS_Y_Coordinate_3 + ',' +
      this.plotManagment.GIS_X_Coordinate_4 + ':' +
      this.plotManagment.GIS_Y_Coordinate_4 + ',' +
      this.plotManagment.GIS_X_Coordinate_5 + ':' +
      this.plotManagment.GIS_Y_Coordinate_5 + ',' +
      this.plotManagment.GIS_X_Coordinate_6 + ':' +
      this.plotManagment.GIS_Y_Coordinate_6 + ',' +
      this.plotManagment.GIS_X_Coordinate_7 + ':' +
      this.plotManagment.GIS_Y_Coordinate_7 + ',' +
      this.plotManagment.GIS_X_Coordinate_8 + ':' +
      this.plotManagment.GIS_X_Coordinate_8;
    this.modalRef.hide();
  }


  save() {
    this.ploatManagmentService.save(this.plotManagment).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
        const toast = this.notificationsService.success('Sucess', deptSuspension);

    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }

  add() {
    this.ploatManagmentService.Add(this.plotManagment).subscribe(deptSuspension => {
      console.log('deptSuspension', deptSuspension);
      const toast = this.notificationsService.success('Sucess', deptSuspension);
    }, error => {
      console.log(error);
      const toast = this.notificationsService.error('Error', 'SomeThing Went Wrong');
    });
    console.log('saveing....');
  }
}

export class PlotManagment {
  public Plot_ID: string;
  public Description: string;
  public SDP_ID: string;
  public Wereda_ID: string;
  public House_No: string;
  public Block_No: string;
  public Parcel_No: string;
  public Plot_Size_M2: string;
  public Plot_Status: string;
  public Registration_Date: string;
  public Type_Of_Use_ID: string;
  public Lang_Grade: string;
  public GIS_X_Coordinate_1: string;
  public GIS_X_Coordinate_2: string;
  public GIS_X_Coordinate_3: string;
  public GIS_X_Coordinate_4: string;
  public GIS_X_Coordinate_5: string;
  public GIS_X_Coordinate_6: string;
  public GIS_X_Coordinate_7: string;
  public GIS_X_Coordinate_8: string;
  public GIS_Y_Coordinate_1: string;
  public GIS_Y_Coordinate_2: string;
  public GIS_Y_Coordinate_3: string;
  public GIS_Y_Coordinate_4: string;
  public GIS_Y_Coordinate_5: string;
  public GIS_Y_Coordinate_6: string;
  public GIS_Y_Coordinate_7: string;
  public GIS_Y_Coordinate_8: string;
  public GISCoordinate: string;
  public N_Plot_ID: string;
  public S_Plot_ID: string;
  public E_Plot_ID: string;
  public W_Plot_ID: string;
}
