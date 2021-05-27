import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyTask';
  langs = [{key: 'en', lang: 'english'}, {key: 'am', lang: 'amaric'}];
  LangID = 'en';

  constructor(private translate: TranslateService) {
    // translate.setDefaultLang('en');
  }

  changlang(lang) {
    console.log('lang', lang);
    this.translate.use(lang);
  }
}
