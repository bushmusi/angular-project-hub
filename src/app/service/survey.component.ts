import { Component,EventEmitter, Input, OnInit, Output} from "@angular/core";
import * as Survey from "survey-angular";
import {ActivatedRoute, Params} from '@angular/router';
import {LayoutService} from './task-layout/layout.service'
// import { BsModalService } from "ngx-bootstrap/modal";
// import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";


Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

@Component({
  selector: "survey",
  template: `<div class="survey-container contentcontainer codecontainer"><div id="surveyElement"></div></div>`
})
export class SurveyComponent {
  @Output() completed = new EventEmitter();
  @Input() formData;
  @Input() formcode;
  @Input() Mode;
  surveyModel: any;
  // modalRef: BsModalRef;

  data: any;
  ID = 'surveyElement'

  constructor(
    private activatedRoute: ActivatedRoute, 
    private service: LayoutService,
    // private modalService: BsModalService
    ) {
  }
  
  @Input()
  set json(value: object) {
    const surveyModel = new Survey.Model(value);
    surveyModel.onAfterRenderQuestion.add((survey, options) => {
      if (!options.question.popupdescription) return;

      //Add a button;
      var btn = document.createElement("button");
      btn.className = "btn btn-info btn-xs";
      btn.innerHTML = "More Info";
      var question = options.question;
      btn.onclick = function() {
        //showDescription(question);
        alert(options.question.popupdescription);
      };
      var header = options.htmlElement.querySelector("h5");
      var span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });
    Survey.SurveyNG.render("surveyElement", { model: surveyModel });
  }

  ngOnInit() {
    
    
    this.activatedRoute.params.subscribe((params: Params) => {
        console.log('survey formcode:', this.formcode);
        console.log('from survey',this.service.getFormData(this.formcode));
        this.service.getFormData(this.formcode).subscribe(data => {
          console.log("It is from survey data=",data);
          
          this.viewform(data);
        }, error => {
          
          console.log("Form ERR "+error)
      }
        );
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
        this.surveyModel.mode = this.Mode;//'display';
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
