import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LayoutService} from '../task-layout/layout.service';
import * as Survey from 'survey-angular';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-form-display',
  templateUrl: './form-display.component.html',
  styleUrls: ['./form-display.component.css']
})
export class FormDisplayComponent implements OnInit {
  @Output() completed = new EventEmitter();
  @Input() formData;
  @Input() formcode;
  @Input() Mode;
  surveyModel: any;
  json;
  data: any;
  ID = 'surveyElementDisplay';

  constructor(private activatedRoute: ActivatedRoute, private service: LayoutService) {
  }


  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      // this.formcode = params['formcode'];
      console.log(this.service.getFormData(this.formcode));
      this.service.getFormData(this.formcode).subscribe(data => {
        this.viewform(data);
      }, error => console.log(error));
      // console.log(this.data);
      // this.surveyModel = new Survey.Model(this.data);
      // Survey.SurveyNG.render('surveyElement', {model: this.surveyModel});
    });
  }


  viewform(data: any): any {
    console.log(data);
    this.surveyModel = new Survey.Model(data);
    this.surveyModel.data = this.formData;
    if (this.Mode) {
      this.surveyModel.mode = this.Mode; // 'display';
      Survey.SurveyNG.render(this.ID, {model: this.surveyModel});
    } else {
      Survey.SurveyNG.render(this.ID, {model: this.surveyModel});
      this.surveyModel.onComplete.add(result => {
        console.log('result', result);

        this.completed.emit(result.data);
      });

    }

  }

}
