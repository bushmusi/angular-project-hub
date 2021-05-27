import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { ServiceService } from '../service.service'

import { NotificationsService } from 'angular2-notifications';

import { environment } from 'src/environments/environment';

import { ActivatedRoute } from "@angular/router";

import { BudgetDetail } from '../budget'

import { Guid } from "guid-typescript"; //guid excuter

import {FormGroup, FormBuilder,Validators } from '@angular/forms'

import { filter } from 'lodash';



@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.css']
})


export class BudgetDetailComponent implements OnInit {

  budgedetailss: BudgetDetail

  budgetDetailForm: any

  budgetDetailFormGroup: FormGroup

  allocationTypeList: any

  initiativeList: any

  budgetYear : any

  temp: any

  isSelected: boolean=false

  urlParams: any

  title: any

  budgetType: any

  @Output() titleChange: EventEmitter<any> = new EventEmitter();

  @Output() saveDataCompleted = new EventEmitter();

  @Input() licenceData;

  @Input() workingUser;

  guidBudgetDetail: any

  currentType:any

  currentOrgType:any

  unitList: any

  budgetDetalilList: any

  currentOrg:any
  isParantBudgetDetail: boolean=false

  constructor(
    private budgetservice: ServiceService,
    private notificationsService: NotificationsService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  )
  {
    this.activatedRoute.params.subscribe((params) => {
      this.urlParams = params;
    });

  }

  ngOnInit(): void {

    this.title = 'Budget Detail';

    this.budgetYear = '0000'

    this.titleChange.emit(this.title);

    this.loadBudgetDetail();

    this.intilizeBudgetDetailForm();

    this.getBudgetType()

    this.getUnitList()

    this.getBudgetAllocation()

    // this.getInitativeList()

  }

  sendClickCompleted(res){
    // this.budgetDetailForm.diV_code = res.node['organization_Code']
    this.currentOrg = res.node['organization_Code']
    this.currentType = this.currentOrg
    this.budgetservice.updateMessage(this.currentOrg);
  }

  selectParent(){
    this.isParantBudgetDetail = true


  }
  getParent(item){
    console.log("sent code--",item);
    this.budgetDetailFormGroup.patchValue({
      parentBuget_Detail_ID: item
    })
    this.isParantBudgetDetail = false
  }

  getInitativeList(data){

    this.budgetservice.getInitativeList().subscribe(
      (res) => {

        let tempList = []
        this.initiativeList = []
        tempList = res['strategicInnitiatives']
        console.log("initiative list b4:",tempList);
        let i = 0
        for (let index = 0; index < tempList.length; index++) {
          this.temp = tempList[index].startDate
          this.temp = this.temp.split("T")
          let temp1 = this.temp[0].split("-")
          temp1[0] = temp1[0]

          if(temp1[0] == data){
            this.initiativeList[i] =  tempList[index]
          }

        }

        console.log("Innitiative list: ",this.initiativeList);



        // this.budgetYear
      },
      (err) => {
        console.log("Error load initaitive",err);

      }
    )
  }

  getBudgetAllocation(){
    const type = "Budget_Allocation_Type"
    this.budgetservice.getStatustype(type).subscribe(
      (res) => {
        this.allocationTypeList = res
      },
      (err) => {
        console.log("error on budget allocation filter",err);

      }
    )
  }

  sendDeptClickCompleted(res){
    console.log("dept triggered :"+res.node['department_Code']);

    this.budgetDetailForm.diV_code = res.node['department_Code']

    this.budgetDetailFormGroup.patchValue({
      diV_code: res.node['department_Code']
    })
  }

  sendCurrentBudget(data){
    this.budgetDetailFormGroup.patchValue({
      budget_ID: data[0]
    })

    this.getInitativeList(data[1])
  }
  loadBudgetDetail() {
    this.budgetservice.loadBudgetDetail().subscribe((budgetD: any) => {

      this.budgedetailss = budgetD;

      this.budgedetailss = (Object.assign([], budgetD.budgetDetailByDIVs));

    },
      (err: any) => console.log(err)
    )

  }


  intilizeBudgetDetailForm() {
    this.budgetDetailForm = new BudgetDetailForm()

    this.budgetDetailFormGroup = this.fb.group(
      {
          budget_DetailID: [''],
          budget_ID: ['', Validators.required],
          budget_Type: ['', Validators.required],
          diV_code: ['', Validators.required],
          unit: ['', Validators.required],
          parentBuget_Detail_ID: [''],
          description: [''],
          is_Approved: [''],
          budget_Ammount_Birr: ['', Validators.required],
          applicationCode: [''],
          application_NO: [''],
          docNo: ['',],
          innitiative_ID: ['', Validators.required],
          budget_Allocation_Type: [''],
      }
    )
  }

  getBudgetType(){

    this.budgetservice.loadBudgetType().subscribe(
      (res) => {
        this.budgetType = res['budgetTypes']
      },
      (err) => {
        console.log("error fetching: ",err);

      }
    )

  }

  getUnitList(){
    this.budgetservice.getUnitList().subscribe(
      (res) => {
        this.unitList = res['proccUnits']
      },
      (err) => {
        console.log("error fetch :",err);

      }
    )
  }

  selectBudgetDetail(data){

    this.isSelected = true

    this.budgetDetailForm = data

    this.budgetDetailFormGroup.patchValue({
      budget_DetailID: data.budget_DetailID,
      budget_ID: data.budget_ID,
      budget_Type: data.budget_Type,
      diV_code: data.diV_code,
      unit: data.unit,
      parentBuget_Detail_ID: data.parentBuget_Detail_ID,
      description: data.description,
      is_Approved: data.is_Approved,
      budget_Ammount_Birr: data.budget_Ammount_Birr,
      docNo: data.docNo,
      innitiative_ID: data.innitiative_ID,
      budget_Allocation_Type: data.budget_Allocation_Type,
    })
  }

  saveBudgetDetail(){

    const userID = environment.username
    console.log("send Data: 1",this.budgetDetailForm);
    console.log("send Data: 1",this.budgetDetailFormGroup.value);

    this.budgetservice.saveBudgetData(

      "00000000-0000-0000-0000-000000000000",//app code

      this.urlParams.service_Code, //service code

      this.urlParams.TaskCode, //task code

      "00000000-0000-0000-0000-000000000000",//org id

      userID, //username

      null,//json

      "00000000-0000-0000-0000-000000000000",//doc id

      "00000000-0000-0000-0000-000000000000" //task id

    ).subscribe(

      (response) => {

        // console.log("trans-resp", response);

        console.log("step-1 saveform");


        this.getBudgetDetailLicenceService(response);
      },
      (error) => {

        console.log("save-data-error", error);
        this.notificationsService.error('Error in save form',error.error['Message'])

      }
    );

  }

  getBudgetDetailLicenceService(saveDataResponse){
    console.log("send Data: 2",this.budgetDetailForm);
    console.log("send Data: 2",this.budgetDetailFormGroup.value);
    this.budgetservice.getAll(saveDataResponse[0]).subscribe(
      (response) => {
        let licenceData = response["list"][0]; //from returned data of object set to licenceData

        this.budgetDetailFormGroup.patchValue({
          applicationCode: saveDataResponse[0],
          application_NO: licenceData.Application_No
        })

        this.budgetDetailForm.applicationCode = saveDataResponse[0]; //setting the field app_code from saveData..

        this.budgetDetailForm.application_NO = licenceData.Application_No; //setting app_No from licenc...

        this.saveDataCompleted.emit(saveDataResponse); //It will send data to saveDataCompleted @output file

        this.registerBudgetDetail(); //This is main method to save

      },

      (error) => {

        console.log("all-error get license service" + error);
        this.notificationsService.error('Error in save form',error.error['Message'])

      }
    );

  }

  registerBudgetDetail(){

    console.log("send Data: 3",this.budgetDetailForm);
    console.log("send Data: 3",this.budgetDetailFormGroup.value);
    this.guidBudgetDetail = Guid.create()

    // this.budgetDetailForm.budget_DetailID = this.guidBudgetDetail.value
    this.budgetDetailFormGroup.patchValue({
      budget_DetailID: this.guidBudgetDetail.value
    })

    this.budgetservice.registerBudgetDetail(this.budgetDetailFormGroup.value).subscribe(
      (response) => {

        console.log('Saved success from component: ', response);

        console.log("step-4 success");

        this.notificationsService.success("Success", "Added successfully")

        this.budgetDetailForm = new BudgetDetailForm()

        this.budgetDetailFormGroup.reset()

        this.loadBudgetDetail()

      },
      (error) => {

        console.log("step-4 error: ", error);
        this.notificationsService.error('Error in save form',error.error['statusType'])
        this.notificationsService.error('Error in save form',error.error['Message'])
        this.notificationsService.error('Error in save form',error.error)

      }
    );

  }

  updateBudgetDetail(data){

    console.log("update called data:", this.budgetDetailForm);


    this.budgetservice.updateBudgetDetail(this.budgetDetailFormGroup.value).subscribe(
      (response) => {

        console.log("updated success",response);

        this.budgetDetailForm = new BudgetDetailForm()

        this.budgetDetailFormGroup.reset()

        this.isSelected = false

        this.loadBudgetDetail()

        this.notificationsService.success('Success',"Updated successfully")

      },
      (error) => {

        console.log("Error update: ",error);
        this.notificationsService.error('Error in save form',error.error['statusType'])
        this.notificationsService.error('Error in save form',error.error['Message'])
        this.notificationsService.error('Error in save form',error.error)

      }
    )

  }

  deleteBudgetDetail(data){

    if (confirm("Are you sure")){
      this.budgetservice.deleteBudgetDetail(this.budgetDetailFormGroup.value).subscribe(
        (response) =>{

          console.log('deleted success',response);
          this.loadBudgetDetail()
          this.isSelected = false
          this.budgetDetailForm = new BudgetDetailForm()
          this.budgetDetailFormGroup.reset()
          this.notificationsService.success('Success',"Delete successfully")

        },
        (error) => {

          console.log("Error delete: ",error);
          this.notificationsService.error('Error in save form',error.error['statusType'])
          this.notificationsService.error('Error in save form',error.error['Message'])
          this.notificationsService.error('Error in save form',error.error)

        }
      )
    }
  }

}

class BudgetDetailForm
    {
        budget_DetailID: string;
        budget_ID: string;
        budget_Type: string;
        diV_code: string;
        unit: string;
        parentBuget_Detail_ID: string;
        is_Approved: true;
        description: string;
        budget_Ammount_Birr: string;
        applicationCode? : string;
        application_NO? : string;
        docNo: string;
        innitiative_ID: string;
        budget_Allocation_Type: string
        log? : string
      }
