import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MyTaskRoutingModule} from './my-task-routing.module';
import {TaskComponent} from './task.component';
import {MyTaskComponent} from './my-task/my-task.component';
import {SupervisorTaskComponent} from './supervisor-task/supervisor-task.component';
import {MyTaskService} from './my-task.service';
import {TableModule} from 'primeng/table';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    MyTaskRoutingModule,
    TranslateModule.forChild({}),
  ],
  declarations: [TaskComponent, MyTaskComponent, SupervisorTaskComponent],
  providers: [MyTaskService]
})
export class MyTaskModule {
}
