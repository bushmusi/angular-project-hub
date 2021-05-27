import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {NgxSmartModalService} from 'ngx-smart-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public ngxSmartModalService: NgxSmartModalService, private translate: TranslateService) {
  }

  Lang;

  ngOnInit(): void {

    if (environment.production) {
      this.Lang = window['lang'];
      console.log('Lang', this.Lang);
      if (this.Lang == 'am-ET') {
        this.translate.setDefaultLang('am');
        environment.Lang = '2C2EBBEA-3361-E111-95D5-00E04C05559B';
        // this.translate.use('am');
      } else {
        this.translate.setDefaultLang('en');
        environment.Lang = '10D04E8B-3361-E111-95D5-00E04C05559B';
        // this.translate.use('en');
      }
    } else {
      this.Lang = '';
       this.translate.setDefaultLang('en');
       environment.Lang = '10D04E8B-3361-E111-95D5-00E04C05559B';
      //environment.Lang = '2C2EBBEA-3361-E111-95D5-00E04C05559B';
      //this.translate.use('am');
    }


  }
}
