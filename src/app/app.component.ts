import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { DataService } from './data.service';
import { groupBy } from 'lodash';
import { filter, split } from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';
import { env } from 'process';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TreeA';
  files: TreeNode[] = [
    {
      label: 'Documents',
      data: 'Documents Folder',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [
        {
          label: 'Work',
          data: 'Work Folder',
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder',
          children: [
            { label: 'Expenses.doc', icon: 'pi pi-file', data: 'Expenses Document' },
            { label: 'Resume.doc', icon: 'pi pi-file', data: 'Resume Document' },
          ],
        },
        {
          label: 'Home',
          data: 'Home Folder',
          expandedIcon: 'pi pi-folder-open',
          collapsedIcon: 'pi pi-folder',
          children: [{ label: 'Invoices.txt', icon: 'pi pi-file', data: 'Invoices for this month' }],
        },
      ],
    },
    {
      label: 'Pictures',
      data: 'Pictures Folder',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [
        { label: 'barcelona.jpg', icon: 'pi pi-image', data: 'Barcelona Photo' },
        { label: 'logo.jpg', icon: 'pi pi-file', data: 'PrimeFaces Logo' },
        { label: 'primeui.png', icon: 'pi pi-image', data: 'PrimeUI Logo' },
      ],
    },
    {
      label: 'Movies',
      data: 'Movies Folder',
      expandedIcon: 'pi pi-folder-open',
      collapsedIcon: 'pi pi-folder',
      children: [
        {
          label: 'Al Pacino',
          data: 'Pacino Movies',
          children: [
            { label: 'Scarface', icon: 'pi pi-video', data: 'Scarface Movie' },
            { label: 'Serpico', icon: 'pi pi-file-video', data: 'Serpico Movie' },
          ],
        },
        {
          label: 'Robert De Niro',
          data: 'De Niro Movies',
          children: [
            { label: 'Goodfellas', icon: 'pi pi-video', data: 'Goodfellas Movie' },
            { label: 'Untouchables', icon: 'pi pi-video', data: 'Untouchables Movie' },
          ],
        },
      ],
    },
  ];
  test: any;
  arranges: any;
  allData;
  href;
  loading = true;
  constructor(private dataService: DataService, private ngxSpinnerService: NgxSpinnerService) {}

  ngOnInit() {
    this.ngxSpinnerService.show();
    var urls = split(window.location.pathname, '/', 20);
    console.log('url: ',urls)
    var topic1 = urls[urls.length - 1];
    topic1 = topic1.replace('-', ' ');
    topic1 = topic1.replace('-', ' ');
    topic1 = topic1.replace('-', ' ');
    topic1 = topic1.replace('-', ' ');
    this.dataService.getData().subscribe((res) => {
      console.log(res, topic1, urls[urls.length - 1], environment.topicSearchParameter);

      this.allData = res;
      console.log("all data are: ",res);
      
      this.test = groupBy(res, 'Parent_Topic_Id');
      if (urls[urls.length - 1] == environment.topicSearchParameter) {
        this.filterStart(environment.ParentTopicId);
      } else {
        var topic = this.findTopicID(topic1, environment.ParentTopicId);
        console.log('topic', topic);
        if (topic != null) {
          this.filterStart(topic.Topic_code);
        }
      }
      this.loading = false;
      this.ngxSpinnerService.hide();
    });
  }

  fileterByParrentID(topicCode) {
    return filter(this.allData, { Parent_Topic_Id: topicCode });
  }
  filterStart(code) {
    var startRoot = filter(this.allData, { Topic_code: code })[0];
    startRoot.expanded = true;
    startRoot.label = startRoot.description_en;
    startRoot.data = startRoot.description_en;
    startRoot.children = this.fileterByParrentID(startRoot.Topic_code);
    for (var children of startRoot.children) {
      children.label = children.description_en;
      children.data = children.description_en;
      children.children = this.fileterByParrentID(children.Topic_code);
      for (var children2 of children.children) {
        children2.label = children2.description_en;
        children2.data = children2.description_en;
        children2.children = this.fileterByParrentID(children2.Topic_code);
        for (var children3 of children2.children) {
          children3.label = children3.description_en;
          children3.data = children3.description_en;
        }
      }
    }
    this.arranges = [];
    this.arranges.push(startRoot);
  }
  findTopicID(name, parrentID) {
    return filter(this.allData, { description_en: name, Parent_Topic_Id: parrentID })[0];
  }
  nodeSelect($event) {
    console.log('$event', $event.node);
    if ($event.node.children ? !$event.node.children.length : true) {
      var URL: string = window.location.pathname + '/';
      if ($event.node.parent.parent != null) {
        URL += $event.node.parent.parent.description_en.replace(' ', '-') + '/';
        URL += $event.node.parent.description_en.replace(' ', '-') + '/';
        URL += $event.node.service_code + '/' + $event.node.task_code + '/' + $event.node.meta_data_forms_form_code;
        URL = URL.replace(' ', '-');
        URL = URL.replace(' ', '-');
        URL = URL.replace(' ', '-');
        console.log('URL', URL);
      } else {
        URL += $event.node.parent.description_en.replace(' ', '-') + '/';
        URL += $event.node.service_code + '/' + $event.node.task_code + '/' + $event.node.meta_data_forms_form_code;
        URL = URL.replace(' ', '-');
        URL = URL.replace(' ', '-');
        URL = URL.replace(' ', '-');
        console.log('URL', URL);
      }

      window.location.href = URL;
    }
  }
}
