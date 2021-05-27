import { Component, OnInit } from "@angular/core";
import { MyTaskService } from "../my-task.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-task",
  templateUrl: "./my-task.component.html",
  styleUrls: ["./my-task.component.css"],
})
export class MyTaskComponent implements OnInit {
  taskwaithing = 120;

  taskList;

  constructor(private myTaskService: MyTaskService, private router: Router) {}

  ngOnInit() {
    this.getMyTask();
  }

  getMyTask() {
    this.myTaskService.getMytasks().subscribe(
      (taskList) => {
        this.taskList = taskList;
        this.taskList = Object.assign([], this.taskList.Table1);
        console.log("taskList", taskList);
        console.log("this.taskList", this.taskList);
      },
      (error) => {
        console.log("error");
      }
    );
  }

  go(task) {
    console.log("task.to_screen", task);
    if (task.to_screen == "287ca034-66c2-4ae4-bf35-19976b1472ef") {
      this.router.navigate([
        "/services/2/" +
          task.todo_comment +
          "/" +
          task.task_types_id +
          "/" +
          task.tasks_id +
          "/" +
          task.service_details_id +
          "/" +
          task.id,
      ]);
    } else if (task.to_screen == "94a16d0f-dda4-476a-8638-700985482854") {
      this.router.navigate([
        "/services/3/" +
          task.todo_comment +
          "/" +
          task.task_types_id +
          "/" +
          task.tasks_id +
          "/" +
          task.service_details_id +
          "/" +
          task.id,
      ]);
    } else if (task.to_screen == "1e2b4b94-b62b-48b1-a064-62a52fddbd6c") {
      this.router.navigate([
        "/services/4/" +
          task.todo_comment +
          "/" +
          task.task_types_id +
          "/" +
          task.tasks_id +
          "/" +
          task.service_details_id +
          "/" +
          task.id,
      ]);
    } else {
      this.router.navigate([
        "/services/1/" +
          task.todo_comment +
          "/" +
          task.task_types_id +
          "/" +
          task.tasks_id +
          "/" +
          task.service_details_id +
          "/" +
          task.id +
          "/" +
          task.to_screen,
      ]);
    }
  }
}
