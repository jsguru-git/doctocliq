import { Component } from '@angular/core';
import { Platform ,Config} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LandingPage } from '../pages/landing/landing';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LandingPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public translate: TranslateService, public config: Config, 
 ) {
   this. initTranslate()
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
   initTranslate() {
    // Set the default language for translation strings, and the current language.
    // this.translate.setDefaultLang('sp');
      this.translate.setDefaultLang('en');
      // this.translate.use('en');
    // if (this.translate.getBrowserLang() !== undefined) {
    //   this.translate.use(this.translate.getBrowserLang());
    // } else {
    //   this.translate.use('en'); // Set your language here
    // }

    this.translate.get(['back']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.back);
    });
  }
}
