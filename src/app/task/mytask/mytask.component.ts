import { Component, OnInit } from '@angular/core';
import {Mytask} from '../task'
import {Router} from '@angular/router';
import {TaskService} from '../task.service'
import {environment} from '../../../environments/environment';
import { NotificationService } from '../../notification.service';  //toaster

@Component({
  selector: 'app-mytask',
  templateUrl: './mytask.component.html',
  styleUrls: ['./mytask.component.css']
})
export class MytaskComponent implements OnInit {

  errMessage: string;

  taskList : Mytask[]
 
  taskid
  serviceid
  formid

  constructor(
    private myTaskService : TaskService, 
    private route : Router,
    private notice:NotificationService
    ) { }

  ngOnInit(): void {
    console.log("your are on task lilst");
    
    this.getMyTask()
  }

  async getMyTask()  {

    var userInfo = await this.myTaskService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
    var orgid = null;
    if(userInfo.length !== 0){
      orgid=userInfo[0].organization_code;
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
      console.log('taskList', task.service_details_id);
      console.log('this.taskList', this.taskList);
    }, error => {
      this.taskList = []
      console.log('error',error);
      this.notice.showError(error.error['Message'],"Error")
    });
  }




pickTask(task : Mytask )
{
console.log('Pick task pressed',task.id)
this.route.navigate(['/layout/' + task.service_details_id + '/' + task.document_id + '/' + task.tasks_id + '/' + task.id + '/' + task.user_roles_id + '/' + task.task_types_id + '/' + task.todo_comment + '/' + task.to_screen]) 

}


}

