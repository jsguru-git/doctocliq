import { NgModule, ErrorHandler, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ModalfiltersPage } from '../pages/modalfilters/modalfilters';
import { ModalseephonesPage } from '../pages/modalseephones/modalseephones';
import { ModalseepricesPage } from '../pages/modalseeprices/modalseeprices';


import { LegaltermsPage } from '../pages/legalterms/legalterms';
import { MapPage } from '../pages/map/map';

import { TabspatientPage } from '../pages/tabspatient/tabspatient';

import { Tabpatient2Page } from '../pages/tabpatient2/tabpatient2';
import { Tabpatient3Page } from '../pages/tabpatient3/tabpatient3';
import { Tabpatient1Page } from '../pages/tabpatient1/tabpatient1';

import { TabsdoctorPage } from '../pages/tabsdoctor/tabsdoctor';

import { Tabdoctor2Page } from '../pages/tabdoctor2/tabdoctor2';
import { Tabdoctor3Page } from '../pages/tabdoctor3/tabdoctor3';
import { Tabdoctor1Page } from '../pages/tabdoctor1/tabdoctor1';

import { TabsclinicPage } from '../pages/tabsclinic/tabsclinic';

import { Tabclinic1Page } from '../pages/tabclinic1/tabclinic1';
import { Tabclinic2Page } from '../pages/tabclinic2/tabclinic2';
import { Tabclinic3Page } from '../pages/tabclinic3/tabclinic3';

import { ModalforgotpasswordPage } from '../pages/modalforgotpassword/modalforgotpassword';
import { ModalseecommentsPage } from '../pages/modalseecomments/modalseecomments';
import { AppointmentStep1Page } from '../pages/appointment-step1/appointment-step1';


import { LandingPage } from '../pages/landing/landing';
import { LoginPage } from '../pages/login/login';
import { RegistermainPage } from '../pages/registermain/registermain';
import { RegisterdoctorPage } from '../pages/registerdoctor/registerdoctor';
import { RegisterpatientPage } from '../pages/registerpatient/registerpatient';

import { DoctorsmsPage } from '../pages/doctorsms/doctorsms';
import { DoctorthanksPage } from '../pages/doctorthanks/doctorthanks';
import { DoctorlistPage } from '../pages/doctorlist/doctorlist';
import { DoctorprofilePage } from '../pages/doctorprofile/doctorprofile';

import { PatientsmsPage } from '../pages/patientsms/patientsms';

import { Searchbar1Page } from '../pages/searchbar1/searchbar1';
import { Searchbar2Page } from '../pages/searchbar2/searchbar2';

import { AppointmentStep2Page } from '../pages/appointment-step2/appointment-step2';
import { AppointmentStep3Page } from '../pages/appointment-step3/appointment-step3';
import { AppointmentStep4Page } from '../pages/appointment-step4/appointment-step4';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Api } from '../providers/api/api';
import { Shared } from '../providers/shared';
import { Search } from '../pipes/search/search';
import { ArrayFilterPipe } from '../pipes/array-filter.pipe';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomEventTitleFormatterProvider } from '../providers/custom-event-title-formatter/custom-event-title-formatter';
import { CustomDateFormatterProvider } from '../providers/custom-date-formatter/custom-date-formatter';

import { CalendarModule, CalendarDateFormatter, CalendarEventTitleFormatter, CalendarWeekViewComponent } from 'angular-calendar';
import { CalendarWeekHoursViewModule } from 'angular-calendar-week-hours-view';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs);

// import { InputsModule } from '@progress/kendo-angular-inputs';
// import '@progress/kendo-angular-l10n';
// import '@progress/kendo-angular-intl';

// import 'hammerjs';

/* ---------calendar------- */

@NgModule({
  declarations: [
    MyApp,
    LandingPage,
    LoginPage,
    RegistermainPage,

    Tabpatient3Page,
    Tabpatient2Page,
    Tabpatient1Page,LegaltermsPage,MapPage,ModalfiltersPage,ModalseephonesPage,ModalseepricesPage,
    TabspatientPage,
    Tabdoctor3Page,
    Tabdoctor2Page,
    Tabdoctor1Page,
    TabsdoctorPage,
    Tabclinic1Page,
    Tabclinic2Page,
    Tabclinic3Page,
    TabsclinicPage,
    ModalforgotpasswordPage,ModalseecommentsPage,AppointmentStep1Page,
    Searchbar1Page,
    Searchbar2Page,
    RegisterdoctorPage,
    RegisterpatientPage,
    DoctorthanksPage,
    DoctorsmsPage,
    PatientsmsPage,
    DoctorlistPage,
    DoctorprofilePage,
    AppointmentStep2Page,
    AppointmentStep3Page,
    AppointmentStep4Page,
    Search,ArrayFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule, 
     IonicStorageModule.forRoot(),
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot(),
    CalendarWeekHoursViewModule
    // InputsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    
    Tabpatient3Page,
    Tabpatient2Page,
    Tabpatient1Page,LegaltermsPage,MapPage,ModalfiltersPage,ModalseephonesPage,ModalseepricesPage,
    TabspatientPage,
    Tabdoctor3Page,
    Tabdoctor2Page,
    Tabdoctor1Page,
    TabsdoctorPage,
    Tabclinic1Page,
    Tabclinic2Page,
    Tabclinic3Page,
    TabsclinicPage,
    ModalforgotpasswordPage,ModalseecommentsPage,AppointmentStep1Page,
    LoginPage,
    RegistermainPage,
    Searchbar1Page,
    Searchbar2Page,
    RegisterdoctorPage,
    RegisterpatientPage,
    DoctorthanksPage,
    DoctorsmsPage,
    PatientsmsPage,
    DoctorlistPage,
    DoctorprofilePage,
    AppointmentStep2Page,
    AppointmentStep3Page,
    AppointmentStep4Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    Shared,
    CustomEventTitleFormatterProvider,
    CustomDateFormatterProvider,
    {
      provide: CalendarDateFormatter,
      useClass: CustomDateFormatterProvider
    },
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatterProvider
    }
  ]
})
export class AppModule {}

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}







/* @NgModule({
  declarations: [
    MyApp,
    LandingPage,
    LoginPage,
    RegistermainPage,

    Tabpatient3Page,
    Tabpatient2Page,
    Tabpatient1Page,LegaltermsPage,MapPage,ModalfiltersPage,ModalseephonesPage,ModalseepricesPage,
    TabspatientPage,
    Tabdoctor3Page,
    Tabdoctor2Page,
    Tabdoctor1Page,
    TabsdoctorPage,
    ModalforgotpasswordPage,ModalseecommentsPage,AppointmentStep1Page,
    Searchbar1Page,
    Searchbar2Page,
    RegisterdoctorPage,
    RegisterpatientPage,
    DoctorthanksPage,
    DoctorsmsPage,
    PatientsmsPage,
    DoctorlistPage,
    DoctorprofilePage,
    AppointmentStep2Page,
    AppointmentStep3Page,
    AppointmentStep4Page,
    Search,ArrayFilterPipe
  ],
  imports: [
    BrowserModule,
    HttpModule, 
     IonicStorageModule.forRoot(),
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LandingPage,
    
    Tabpatient3Page,
    Tabpatient2Page,
    Tabpatient1Page,LegaltermsPage,MapPage,ModalfiltersPage,ModalseephonesPage,ModalseepricesPage,
    TabspatientPage,
    Tabdoctor3Page,
    Tabdoctor2Page,
    Tabdoctor1Page,
    TabsdoctorPage,
    ModalforgotpasswordPage,ModalseecommentsPage,AppointmentStep1Page,
    LoginPage,
    RegistermainPage,
    Searchbar1Page,
    Searchbar2Page,
    RegisterdoctorPage,
    RegisterpatientPage,
    DoctorthanksPage,
    DoctorsmsPage,
    PatientsmsPage,
    DoctorlistPage,
    DoctorprofilePage,
    AppointmentStep2Page,
    AppointmentStep3Page,
    AppointmentStep4Page
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    Shared
  ]
})
export class AppModule {}

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
 */