import { Component, OnInit, TemplateRef } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ServiceService } from "./service.service";
import { NotificationsService } from "angular2-notifications";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { LayoutService } from "./task-layout/layout.service";

@Component({
  selector: "app-service",
  templateUrl: "./service.component.html",
  styleUrls: ["./demo/demo.component.scss"]
})
export class ServiceComponent implements OnInit {
  _opened = false;
  public ID = 0;
  loading = true;
  licenceService;
  licenceData: any;
  singleWin: any;
  AppNo;
  tskTyp;
  DropDownList;
  disablefins = true;
  DocID;
  todoID;
  tskID;
  SDP_ID;
  Service_ID;
  Licence_Service_ID;
  FormData;
  PriveLicence;
  AppNoList;
  PriveAppNoList;
  PreAppData;
  PreTaskData;
  AppN;
  TaskN;
  preAppID;
  formcode;
  selectedTask;
  ifAppNo = false;
  ifTask = false;
  ifTaskDetail = false;
  selectedpreTask;

  RequerdDocs;

  public CustomerTypeLookUP;
  public CustomerLookUP;
  public CustomerBankLookUP;
  public SuspendedReasonLookUP;
  public PropertyTypeLookUP;
  public PropertyStatusLookUP;
  public ServiceDeliveryUnitLookUP;
  public WoredaLookUP;
  public PlotStutusLookUP;
  public PlotLandUseLookUP;
  public TransferTypeLookUP;
  public Lease_Type_Lookup;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private serviceService: ServiceService,
    private router: Router,
    private notificationsService: NotificationsService,
    private layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (
        params["formcode"].toLowerCase() ==
        "110017de-a2d4-4f64-abff-62ad6d941f81".toLowerCase()
      ) {
        this.ID = 2;
      } else if (
        params["formcode"].toLowerCase() ==
        "9902e4ef-b916-448f-b5c8-0ca860325cc5".toLowerCase()
      ) {
        this.ID = 3;
      } else if (
        params["formcode"].toLowerCase() ==
        "1d7433e1-91c5-4cf3-bc1a-6daea69e93fa".toLowerCase()
      ) {
        this.ID = 4;
      } else if (
        params["formcode"].toLowerCase() ==
        "215843d4-cfc5-440e-8f6e-ea1cd707bf00".toLowerCase()
      ) {
        this.ID = 5;
      } else {
        this.layoutService.getFormData(params["formcode"]).subscribe(
          data => {
            this.ID = 1;
          },
          error => {
            this.ID = 0;
          }
        );
      }

      this.AppNo = params["AppNo"];
      this.getAll(this.AppNo);
      this.tskTyp = params["tskTyp"];
      this.tskID = params["tskID"];
      if (this.tskTyp == "c800fb16-f961-e111-95d6-00e04c05559b") {
        this.getTaskRule(params["tskID"]);
      }
      this.DocID = params["docid"];
      this.getFormData(params["docid"]);
      this.todoID = params["todoID"];
      this.formcode = params["formcode"];
    });

    // this.getLookups();
    // this.getRequiredDocs();
    //   console.log("selectedTask "+this.selectedTask);
  }

  saveDataCompleted(response) {
    this.disablefins = false;
    this.AppNo = response[0];
    this.DocID = response[1];
    this.todoID = response[2];
    this.getAll(this.AppNo);
  }

  saveForm(formData) {
    console.log("save-form", JSON.stringify(formData));
    this.serviceService
      .saveForm(
        this.licenceData
          ? this.licenceData.Licence_Service_ID
          : "00000000-0000-0000-0000-000000000000",
        this.Service_ID,
        this.tskID,
        "00000000-0000-0000-0000-000000000000",
        JSON.stringify(formData),
        this.DocID || "00000000-0000-0000-0000-000000000000",
        this.todoID || "00000000-0000-0000-0000-000000000000"
      )
      .subscribe(
        response => {
          console.log("save-from-response", response);

          this.disablefins = false;
          this.AppNo = response[0];
          this.DocID = response[1];
          this.todoID = response[2];
          this.getAll(this.AppNo);
          const toast = this.notificationsService.success("Success", "Saved");
        },
        error => {
          console.log("save-form-error", error);
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }
  
  public getSingleWin(Licence_Service_ID) {
    this.serviceService.getSingleWin(Licence_Service_ID).subscribe(
      response => {
        console.log("single-win-response", response);
        this.singleWin = response["procLicenceServiceForSingleWins"][0];
      },
      error => {
        console.log("single-win-error", error);
      }
    );
  }

  public getAll(AppNo) {
    this.serviceService.getAll(AppNo).subscribe(
      licenceService => {
        this.licenceService = licenceService;
        this.licenceData = this.licenceService.list[0];
        if (this.licenceData)
          this.getSingleWin(this.licenceData.Licence_Service_ID);
        console.log("Licence data1", licenceService);

        /*
          this.SDP_ID = this.licenceData.SDP_ID;
          this.Service_ID = this.licenceData.Service_ID;
          this.Licence_Service_ID = this.licenceData.Licence_Service_ID;


          if (this.licenceData.Certificate_Code > 0) {
            this.getPriveysLicence();
          }
        */

        if (this.ID == 2) {
          this.disablefins = false;
          // this.getPlotManagement();
        } else if (this.ID == 3) {
          this.disablefins = false;
          // this.getPlotManagement();
        } else if (this.ID == 4) {
          this.disablefins = false;
          // this.getDeed();
        }

        // console.log('Licence data2', this.licenceData);
        // this.taskType = this.licenceData.TaskType;
        this.loading = false;
      },
      error => {
        console.log("licenec" + error);
      }
    );
  }

  Submit(ruleid) {
    console.log("next", this.licenceData);

    this.disablefins = true;
    this.serviceService
      .Submit(this.licenceData.Application_No, this.DocID, this.todoID, ruleid)
      .subscribe(
        message => {
          console.log("next-response", message);
          const toast = this.notificationsService.success("Success", "success");
          this.Close();
        },
        error => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  private _toggleOpened(): void {
    this._opened = !this._opened;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: "gray modal-lg" })
    );
  }

  closeModal() {
    // console.log('closeing.....');
    this.modalRef.hide();
  }

  getRequiredDocs() {
    this.serviceService.getRequerdDocs(this.tskID).subscribe(
      RequerdDocs => {
        this.RequerdDocs = RequerdDocs;

        // console.log('RequerdDocs', this.RequerdDocs);
      },
      error => {
        console.log("error");
      }
    );
  }

  upload(event, RequiredDoc) {
    const File = event.files[0];
    let base64file;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener("loadend", e => {
      base64file = reader.result;
      this.serviceService
        .saveFile(
          base64file,
          File.type,
          this.AppNo,
          RequiredDoc.requirement_code,
          "tasktype",
          RequiredDoc.description_en
        )
        .subscribe(
          message => {
            // console.log('message', message);
          },
          error => {
            console.log("error");
          }
        );
    });
  }

  getAppData(appNO) {
    this.preAppID = 0;
    this.serviceService.getTodandAppNo(appNO).subscribe(
      PreAppData => {
        this.PreAppData = PreAppData;
        // this.PreAppData = PreAppData;
        this.PreAppData = Object.assign([], this.PreAppData.Table);
        // this.PreAppData = (Object.assign({}, this.PreAppData.Table));
        // console.log('PreAppData', this.PreAppData);
        this.ifTask = true;
      },
      error => {
        console.log("error");
      }
    );
  }

  getTaskData(task) {
    this.preAppID = 0;
    this.PreTaskData = [];
    for (let i = 0; i < this.PreAppData.length; i++) {
      if (this.PreAppData[i].tasks_task_code == task) {
        // console.log('this.PreAppData[i]', this.PreAppData[i]);
        this.PreTaskData.push(this.PreAppData[i]);
      }
    }
    // console.log('PreTaskData', this.PreTaskData);
  }

  SelectTask(task) {
    // console.log('task', task);
    this.selectedpreTask = task;
    this.selectedTask = task;
    if (task.form_code == "a7a1e05e-32c2-4f44-ad58-306572c64593") {
      this.preAppID = 2;
      // console.log('to', 2);
    } else if (task.form_code == "da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff") {
      this.preAppID = 3;
      // console.log('to', 3);
    } else if (task.form_code == "9e0834e9-7ec2-460c-a5ed-7ade1204c7ee") {
      this.preAppID = 4;
      // console.log('to', 4);
    } else {
      this.preAppID = 1;
      // console.log('to', 1);
    }
    this.ifTaskDetail = true;
  }

  getFormData(DocID) {
    this.serviceService.GetForm(DocID).subscribe(
      FormData => {
        this.FormData = FormData;

        // this.FormData = JSON.parse(this.FormData);
        // this.FormData = (Object.assign({}, this.FormData));
        // console.log('FormData', FormData);
      },
      error => {
        console.log("error");
      }
    );
  }

  getTaskRule(tasksId) {
    this.serviceService.getTaskRule(tasksId).subscribe(
      DropDownList => {
        this.DropDownList = DropDownList;
        this.DropDownList = Object.assign([], this.DropDownList);
        // console.log('DropDownList', DropDownList);
      },
      error => {
        console.log("error");
      }
    );
  }

  Close() {
    this.router.navigate(["/task/MyTask"]);
  }

  SubmitAR(ruleid) {
    this.disablefins = true;
    this.serviceService
      .SubmitAR(this.AppNo, this.DocID, this.todoID, ruleid)
      .subscribe(
        message => {
          if (message) {
            const toast = this.notificationsService.success(
              "Sucess",
              "sucesss"
            );
          } else {
            const toast = this.notificationsService.error(
              "Error",
              "SomeThing Went Wrong"
            );
          }
          this.Close();
        },
        error => {
          const toast = this.notificationsService.error(
            "Error",
            "SomeThing Went Wrong"
          );
        }
      );
  }

  getLookups() {
    this.getCustomerTypeLookUP();
    this.getSuspendedReasonLookUP();
    this.getPropertyTypeLookUP();
    this.getPropertyStatusLookUP();
    this.getServiceDeliveryUnitLookUP();
    this.getWoredaLookUP();
    this.getPlotStutusLookUP();
    this.getPlotLandUseLookUP();
    this.getCustomerLookUP();
    this.getTransferTypeLookUP();
    this.getLease_Type_Lookup();
  }

  getPriveysLicence() {
    this.AppN = null;
    this.serviceService.getPriveys(this.licenceData.Certificate_Code).subscribe(
      PriveLicence => {
        this.PriveLicence = PriveLicence;
        this.PriveLicence = Object.assign([], this.PriveLicence.list);
        this.AppNoList = [];
        for (let i = 0; i < this.PriveLicence.length; i++) {
          this.AppNoList[i] = {};
          this.AppNoList[i].Application_No = this.PriveLicence[
            i
          ].Application_No;
        }

        this.PriveAppNoList = Object.assign([], this.AppNo);
        // console.log('this.AppNoList', this.AppNoList);
        // console.log('PriveLicence', PriveLicence);
        this.ifAppNo = true;
      },
      error => {
        console.log("error");
      }
    );
  }

  getCustomerTypeLookUP() {
    this.serviceService.getCustomerTypeLookUP().subscribe(
      CustomerTypeLookUP => {
        this.CustomerTypeLookUP = CustomerTypeLookUP;
        this.CustomerTypeLookUP = Object.assign(
          [],
          this.CustomerTypeLookUP.list
        );
        //  console.log('CustomerTypeLookUP', CustomerTypeLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getSuspendedReasonLookUP() {
    this.serviceService.getSuspendedReasonLookUP().subscribe(
      SuspendedReasonLookUP => {
        this.SuspendedReasonLookUP = SuspendedReasonLookUP;
        this.SuspendedReasonLookUP = Object.assign(
          [],
          this.SuspendedReasonLookUP.list
        );
        // console.log('SuspendedReasonLookUP', SuspendedReasonLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getPropertyTypeLookUP() {
    this.serviceService.getPropertyTypeLookUP().subscribe(
      PropertyTypeLookUP => {
        this.PropertyTypeLookUP = PropertyTypeLookUP;
        this.PropertyTypeLookUP = Object.assign(
          [],
          this.PropertyTypeLookUP.list
        );
        // console.log('PropertyTypeLookUP', PropertyTypeLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getPropertyStatusLookUP() {
    this.serviceService.getPropertyStatusLookUP().subscribe(
      PropertyStatusLookUP => {
        this.PropertyStatusLookUP = PropertyStatusLookUP;
        this.PropertyStatusLookUP = Object.assign(
          [],
          this.PropertyStatusLookUP.list
        );
        // console.log('PropertyStatusLookUP', PropertyStatusLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getServiceDeliveryUnitLookUP() {
    this.serviceService.getServiceDeliveryUnitLookUP().subscribe(
      ServiceDeliveryUnitLookUP => {
        this.ServiceDeliveryUnitLookUP = ServiceDeliveryUnitLookUP;
        this.ServiceDeliveryUnitLookUP = Object.assign(
          [],
          this.ServiceDeliveryUnitLookUP
        );
        console.log("ServiceDeliveryUnitLookUP", ServiceDeliveryUnitLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getTransferTypeLookUP() {
    this.serviceService.getTransferTypeLookUP().subscribe(
      TransferTypeLookUP => {
        this.TransferTypeLookUP = TransferTypeLookUP;
        this.TransferTypeLookUP = Object.assign(
          [],
          this.TransferTypeLookUP.list
        );
        console.log("TransferTypeLookUP", TransferTypeLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getLease_Type_Lookup() {
    this.serviceService.getLease_Type_Lookup().subscribe(
      Lease_Type_Lookup => {
        this.Lease_Type_Lookup = Lease_Type_Lookup;
        this.Lease_Type_Lookup = Object.assign([], this.Lease_Type_Lookup.list);
        console.log("Lease_Type_Lookup", Lease_Type_Lookup);
      },
      error => {
        console.log("error");
      }
    );
  }

  getWoredaLookUP() {
    this.serviceService.getWoredaLookUP().subscribe(
      WoredaLookUP => {
        this.WoredaLookUP = WoredaLookUP;
        this.WoredaLookUP = Object.assign([], this.WoredaLookUP.list);
        // console.log('WoredaLookUP', WoredaLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getCustomerLookUP() {
    this.serviceService.getCustomerLookUP().subscribe(
      CustomerLookUP => {
        this.CustomerLookUP = CustomerLookUP;
        this.CustomerLookUP = Object.assign([], this.CustomerLookUP.list);
        for (let i = 0; i < this.CustomerLookUP.length; i++) {
          this.CustomerLookUP[i].FullName_AM =
            this.CustomerLookUP[i].Applicant_First_Name_AM +
            " " +
            this.CustomerLookUP[i].Applicant_Middle_Name_AM +
            " " +
            this.CustomerLookUP[i].Applicant_Last_Name_AM;
          this.CustomerLookUP[i].FullName_EN =
            this.CustomerLookUP[i].Applicant_First_Name_EN +
            " " +
            this.CustomerLookUP[i].Applicant_Middle_Name_En +
            " " +
            this.CustomerLookUP[i].Applicant_Last_Name_EN;
        }
        this.getCustomerBankLookUP();
        console.log("CustomerLookUP", this.CustomerLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getCustomerBankLookUP() {
    this.CustomerBankLookUP = [];
    for (let i = 0; i < this.CustomerLookUP.length; i++) {
      if (
        this.CustomerLookUP[i].Customer_Type_ID == "3" ||
        this.CustomerLookUP[i].Customer_Type_ID == "5"
      ) {
        this.CustomerBankLookUP.push(this.CustomerLookUP[i]);
      }
    }
    console.log("CustomerBankLookUP", this.CustomerBankLookUP);
  }

  getPlotStutusLookUP() {
    this.serviceService.getPlotStutusLookUP().subscribe(
      PlotStutusLookUP => {
        this.PlotStutusLookUP = PlotStutusLookUP;
        this.PlotStutusLookUP = Object.assign([], this.PlotStutusLookUP.list);
        // console.log('PlotStutusLookUP', PlotStutusLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }

  getPlotLandUseLookUP() {
    this.serviceService.getPlotLandUseLookUP().subscribe(
      PlotLandUseLookUP => {
        this.PlotLandUseLookUP = PlotLandUseLookUP;
        this.PlotLandUseLookUP = Object.assign([], this.PlotLandUseLookUP.list);
        // console.log('PlotLandUseLookUP', PlotLandUseLookUP);
      },
      error => {
        console.log("error");
      }
    );
  }
}
