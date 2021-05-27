import { Component,EventEmitter, Input,Output} from "@angular/core";
import * as Survey from "survey-angular";


Survey.JsonObject.metaData.addProperty("questionbase", "popupdescription:text");
Survey.JsonObject.metaData.addProperty("page", "popupdescription:text");

@Component({
  selector: "survey",
  template: `<div class="survey-container contentcontainer codecontainer"><div id="surveyElement"></div></div>`
})
export class SurveyComponent {
  @Output() completed = new EventEmitter();


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
        console.log("on survey");
        
        alert(options.question.popupdescription);
      };
      
      var header = options.htmlElement.querySelector("h5");
      var span = document.createElement("span");
      span.innerHTML = "  ";
      header.appendChild(span);
      header.appendChild(btn);
    });
    Survey.SurveyNG.render("surveyElement", { model: surveyModel });
  
    surveyModel.onComplete.add(result => {
      
      this.completed.emit(result.data);
    });
  }

  ngOnInit() {}
}
