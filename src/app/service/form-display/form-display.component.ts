import { Component, OnInit, Input } from "@angular/core";
import * as Survey from "survey-angular";
import { FormDisplayService } from "./form-display.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-form-display",
  templateUrl: "./form-display.component.html",
  styleUrls: ["./form-display.component.css"],
})
export class FormDisplayComponent implements OnInit {
  @Input() formcode;
  @Input() formData;
  @Input() Mode;
  ID = "ID";
  constructor(
    public service: FormDisplayService,
    public activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);

      this.service.getFormData(this.formcode).subscribe(
        (data) => {
          this.viewform(data);
          console.log("Form:" +data)
        },
        (error) => console.log(error)
      );
      // console.log(this.data);
      // surveyModel = new Survey.Model(this.data);
      // Survey.SurveyNG.render('surveyElement', {model: surveyModel});
    });
  }

  viewform(data: any): any {
    let surveyModel = new Survey.Model(data);
    surveyModel.data = this.formData;
    if (this.Mode) {
      surveyModel.mode = this.Mode; // 'display';
      Survey.SurveyNG.render(this.ID, { model: surveyModel });
    } else {
      Survey.SurveyNG.render(this.ID, { model: surveyModel });
      surveyModel.onComplete.add((result) => {
        console.log("result", result);
      });
    }
  }
}
