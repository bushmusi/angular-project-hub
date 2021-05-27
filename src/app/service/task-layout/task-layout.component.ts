import { Component, OnInit } from '@angular/core';
import {Mytask} from '../../task/task'
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Survey from 'survey-angular';
import {ServiceService} from '../service.service'
import {TaskService} from '../../task/task.service'

@Component({
  selector: 'app-task-layout',
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.scss']
})
export class TaskLayoutComponent implements OnInit {

  json
  id
  _opened = false;
  RequerdDocs;
  preAppID;
  AppNo
  DocID

  constructor(private taskService : TaskService, private activatedRoute : ActivatedRoute, private serviceService : ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( (params: Params) =>

   {
     const id = params['appCode']
     let formcode = params['formcode']
     console.log(id)
     console.log("to_screen = "  + formcode)
     switch(formcode)
      {
        case "1EF26E12-00C6-466C-8E12-0217F940C764" :
          this.id = 1;
          break;
        
        case  "1EF26E12-00C6-466C-8E12-0217F940C164" :
        this.id = 2;
        break;  

        default:
        
          this.getFormData(formcode)
          this.id = 3
        

      }
   
   })
  
  
  }

  getFormData(formcode : string)
  {
    
     console.log("from getFromdata: ",formcode);
     this.taskService.getFormData(formcode).subscribe( (data:any) =>
       {
        this.json = data
        console.log(this.json)

       }
     )

    

  }

  _toggleOpened(): void {
    this._opened = !this._opened;
  }


  upload(event, RequiredDoc) {
    const File = event.files[0];
    let base64file;
    const reader = new FileReader();
    reader.readAsDataURL(File);
    reader.addEventListener('loadend', (e) => {
      base64file = reader.result;
      this.serviceService.saveFile(base64file, File.type, this.AppNo, RequiredDoc.requirement_code,
        'tasktype', RequiredDoc.description_en,this.DocID).subscribe(message => {
        // console.log('message', message);
      }, error => {
        console.log('error');
      });
    });
  }


  Close() {
    this.router.navigate(['/task/MyTask']);
  }

}
