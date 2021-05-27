import { Component, OnInit } from '@angular/core';
import {ServiceService} from '../service.service'
import {ArchiveType} from '../archive'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../notification.service';  //toaster
// import { NgbModal } from '../@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-archive-type',
  templateUrl: './archive-type.component.html',
  styleUrls: ['./archive-type.component.css']
})
export class ArchiveTypeComponent implements OnInit {

   ArchiveTypes : ArchiveType[];
   public archiveTypeForm: any
   archiveTypeList: any
   isSelected: boolean = false
   orgList: any

   tempFormGroup: FormGroup

  constructor(private archiveservice: ServiceService,
              private fb: FormBuilder,
              private notice: NotificationService) {
                this.createForm();
              }

  ngOnInit(): void {

    // this.ArchiveTypes = this.archiveservice.getArchiveTypeInfo();
    this.archiveTypeForm =new ArchiveTypeForm()
    this.louadArchiveType()
    this.getOrganizationList()

  }

  createForm() {
    this.tempFormGroup = this.fb.group({
      name_Type: ['', Validators.required ],
      description: ['', Validators.required ],
      room: ['', Validators.required ] ,
      site: ['',  Validators.required ],
      block_Floor: ['', Validators.required ],
      shelf_NO: ['', Validators.required ]
    });
  }
  addBudgetType(){
    console.log("we get: ",this.tempFormGroup.value);

  }

  register(){

    // this.archiveTypeForm.name_Type = "d"
    this.archiveTypeForm.shelf_NO = "22"
    console.log("data:" ,this.tempFormGroup.value);
    this.archiveservice.register(this.tempFormGroup.value).subscribe(
      (reponse) => {
        this.notice.showInfo('Success',"Successfully added")
        this.louadArchiveType()
        this.archiveTypeForm = new ArchiveTypeForm()
        this.tempFormGroup.reset()
      },
      (error) => {
        if(error.error['site'])
        {
          this.notice.showError("Error",error.error['site'][0] );
        }
        else{
          this.notice.showError("Error",error.error );
        }

        console.log("error",error);

      }
    )

  }

  tempUpdate(){
    this.archiveservice.updateArchiveType(this.tempFormGroup.value).subscribe(
      (res) => {
        console.log("res:",res);
        this.archiveTypeForm = new ArchiveTypeForm()
        this.notice.showInfo("Success","Updated successfully")
        this.isSelected = false
        this.louadArchiveType()
        this.tempFormGroup.reset()
      },
      (error) => {
        if(error.error['site'])
        {
          this.notice.showError("Error",error.error['site'][0] );
        }
        else{
          this.notice.showError("Error",error.error );
        }

        console.log("error: ",error);


      }
    )
  }

  tempDelete(){
    const id = this.tempFormGroup.value['name_Type']
    if (confirm("Are you sure")){
      this.archiveservice.deleteArchiveType(id).subscribe(
        (res) => {
          this.notice.showInfo('Success',"Successfully removed")
          console.log("res: ",res);
          this.isSelected = false
          this.archiveTypeForm = new ArchiveTypeForm()
          this.louadArchiveType()
          this.tempFormGroup.reset()
        },
        (error) => {
          if(error.error['site'])
          {
            this.notice.showError("Error",error.error['site'][0] );
          }
          else{
            this.notice.showError("Error",error.error );
          }

          console.log("error",error);

        }
      )
    }
  }



  louadArchiveType(){
    this.archiveservice.louadArchiveType().subscribe(
      (res) => {
        this.archiveTypeList =res['procArchiveTypes']
        console.log("list of data: ",this.archiveTypeList);

      },
      (error) => {
        console.log("data error: ",error);

      }
    )
  }

  getOrganizationList(){
    this.archiveservice.getOrganizationList().subscribe(
      (res) => {
        console.log("success load org list:",res);
        this.orgList = res['procorganizationss']
      },
      (err) => {
        this.notice.showError('Error',err.error)
      }
    )
  }

  selectElement(data){
    console.log("select: ",data);
    this.isSelected = true
    this.archiveTypeForm = data
    // this.tempFormGroup.get('name_Type').disable()
    this.tempFormGroup.setValue(
      {
        name_Type: data.name_Type,
        description: data.description,
        room: data.room,
        site: data.site,
        block_Floor: data.block_Floor,
        shelf_NO: data.shelf_NO,
      }
      )

  }

}

class ArchiveTypeForm{
  name_Type: any;
  description: any;
  room: any;
  site: any;
  block_Floor: any;
  shelf_NO: any;

}
