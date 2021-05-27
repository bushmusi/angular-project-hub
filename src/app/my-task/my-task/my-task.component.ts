import { Component, OnInit } from "@angular/core";
import { MyTaskService } from "../my-task.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-task",
  templateUrl: "./my-task.component.html",
  styleUrls: ["./my-task.component.css"]
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
      taskList => {
        this.taskList = taskList;
        this.taskList = Object.assign([], this.taskList.Table1);
        console.log("taskList", taskList);
        console.log("this.taskList", this.taskList);
      },
      error => {
        console.log("error");
      }
    );
  }

  go(task) {
    console.log("task.to_screen", task);
    if (task.to_screen == "0FC6362D-89AB-40F7-8B64-F0B46AA04875") {
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
          task.id
      ]);
    } else if (task.to_screen == "4A88387C-2559-4625-B9DF-7F86FCC5D3C4") {
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
          task.id
      ]);
    } else if (task.to_screen == "E02316F7-8CA1-4104-96A3-FF175B205598") {
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
          task.id
      ]);
    } else {
      
      if (task.Module == "Job Creation") {
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
            task.to_screen
        ]);
      } else {
        console.log("base", window["_app_base"]);

        let AppBase = window["_app_base"].split("/");

        AppBase[4] = task.Module.replaceAll(" ", '-');
        
        AppBase = AppBase.join("/");

        console.log("AppBase", AppBase);

        window.location.href =
          window.location.origin +
          "" +
          AppBase +
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
          task.to_screen;
      }
    }
  }
}
