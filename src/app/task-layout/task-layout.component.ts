import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { TaskService } from '../task/task.service';
import {Mytask} from '../task/task'
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as Survey from 'survey-angular';


@Component({
  selector: 'app-task-layout',
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.css']
})
export class TaskLayoutComponent implements OnInit {

  json
  


  constructor(private taskService : TaskService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {

   this.activatedRoute.params.subscribe( (params: Params) =>

   {
     const id = params['appCode']
     let formcode = params['formcode']
     console.log(id)
     console.log("to_screen = "  + formcode)
    this.getFormData(formcode)
     
   })
  
  

  }
  
 
  getFormData(formcode : string)
  {
    

     this.taskService.getFormData(formcode).subscribe( (data:any) =>
       {
        this.json = data
        console.log(this.json)

       }
     )

    

  }

  
}
 