import { Component, OnInit } from '@angular/core';
import {MyTaskService} from '../my-task.service';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service/service.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-supervisor-task',
  templateUrl: './supervisor-task.component.html',
  styleUrls: ['./supervisor-task.component.css']
})
export class SupervisorTaskComponent implements OnInit {
  taskwaithing = 120;

  tasks;
  constructor(private myTaskService: MyTaskService, private router: Router, private serviceService: ServiceService) { }

  ngOnInit() {
    this.getSupervisedTask();

  }

  async getSupervisedTask() {
    var userInfo = await this.serviceService.getViewAspNetUsersWorkInfoDetail(environment.username).toPromise();
    var orgid= userInfo[0].organization_code;
    this.myTaskService.getSupervisertasks(orgid).subscribe(tasks => {
      this.tasks = tasks;
      this.tasks = (Object.assign([], this.tasks.Table1));
      console.log('tasks', tasks);
      console.log('this.taskList', this.tasks);
    });
  }


  go(task) {
    console.log('task.to_screen', task.to_screen);
    if (task.to_screen == 'a7a1e05e-32c2-4f44-ad58-306572c64593') {
      this.router.navigate(['/services/2/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.service_details_id + '/' + task.id]);
    } else if (task.to_screen == 'da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff') {
      this.router.navigate(['/services/3/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.service_details_id + '/' + task.id]);
    } else if (task.to_screen == '9e0834e9-7ec2-460c-a5ed-7ade1204c7ee') {
      this.router.navigate(['/services/4/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.service_details_id + '/' + task.id]);
    } else {
      this.router.navigate(['/services/1/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.service_details_id + '/' + task.id + '/'  + task.QueueNo  + '/' + task.to_screen]);
    }
    // a7a1e05e-32c2-4f44-ad58-306572c64593 for plot
    // da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff for property
    // 9e0834e9-7ec2-460c-a5ed-7ade1204c7ee for certefcate

    // this.router.navigate(['/service/1']);
  }
}
