import {Component, OnInit} from '@angular/core';
import {MyTaskService} from '../my-task.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css']
})
export class MyTaskComponent implements OnInit {
  taskwaithing = 120;

  taskList;

  constructor(private myTaskService: MyTaskService, private router: Router) {
  }

  ngOnInit() {
    this.getMyTask();

  }

  getMyTask() {
    this.myTaskService.getMytasks().subscribe(taskList => {
      this.taskList = taskList;
      this.taskList = (Object.assign([], this.taskList.Table1));
      console.log('taskList', taskList);
      console.log('this.taskList', this.taskList);
    }, error => {
      console.log('error');
    });
  }


  go(task) {
    console.log('task.to_screen', task.to_screen);
    if (task.to_screen == 'a7a1e05e-32c2-4f44-ad58-306572c64593') {
      this.router.navigate(['/services/2/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id]);
    } else if (task.to_screen == 'da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff') {
      this.router.navigate(['/services/3/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id]);
    } else if (task.to_screen == '9e0834e9-7ec2-460c-a5ed-7ade1204c7ee') {
      this.router.navigate(['/services/4/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id]);
    } else {
      this.router.navigate(['/services/1/' + task.todo_comment + '/' + task.task_types_id + '/' + task.tasks_id + '/' + task.document_id + '/' + task.id + '/' + task.to_screen]);
    }
    // a7a1e05e-32c2-4f44-ad58-306572c64593 for plot
    // da8c5bd4-ea3d-4f02-b1b2-38cf26d6d1ff for property
    // 9e0834e9-7ec2-460c-a5ed-7ade1204c7ee for certefcate

    // this.router.navigate(['/service/1']);
  }
}
