import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import {TaskService} from '../task.service';
import {Mytask} from '../task'
import {Router} from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationsService } from 'angular2-notifications';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {


  @Output() titleChange: EventEmitter<any> = new EventEmitter();
  title = 'My Task';
  errMessage: string;

  taskList : Mytask[]
 
  taskid
  serviceid
  formid


  constructor(private myTaskService : TaskService, private route : Router,private notice : ToastrService) { }

  ngOnInit()  {
    
    this.getMyTask()
  
  }

  async getMyTask()  {
    var userInfo = await this.myTaskService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
    var orgid = null
    if(userInfo.length !== 0){
      orgid = userInfo[0].organization_code
    }

    this.myTaskService.getMytasks(orgid).subscribe(
       (task:any) => {
      this.taskList = task.task;
      this.taskList = (Object.assign([], task.Table1));
      this.taskList.sort((a, b) => {
        if (a.start_date < b.start_date) {
          return -1;
        } else if (a.start_date > b.start_date) {
          return 1;
        } else {
          return 0;
        }
      });
      console.log('taskList', task);
      console.log('this.taskList', this.taskList);
    }, error => {
      this.taskList = []
      this.notice.error('Error',error.error['Message'])
      console.log('error',error);
    });
  }




pickTask(task : Mytask )
{
  console.log("log: url pick",'/layout/' +'service_details_id='+ task.service_details_id + '/'+'document_id=' + task.document_id + '/'+'tasks_id=' + task.tasks_id + '/'+'id=' + task.id + '/'+'user_roles_id=' + task.user_roles_id + '/'+'task_types_id=' + task.task_types_id + '/'+'todo_comment=' + task.todo_comment + '/' +'to_screen='+ task.to_screen);
  
  this.route.navigate(['/layout/' + task.service_details_id + '/' + task.document_id + '/' + task.tasks_id + '/' + task.id + '/' + task.user_roles_id + '/' + task.task_types_id + '/' + task.todo_comment + '/' + task.to_screen]) 

}






}
