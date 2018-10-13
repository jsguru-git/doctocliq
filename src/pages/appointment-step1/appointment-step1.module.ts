import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentStep1Page } from './appointment-step1';

@NgModule({
  declarations: [
    AppointmentStep1Page,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentStep1Page),
  ],
  exports: [
    AppointmentStep1Page
  ]
})
export class AppointmentStep1PageModule {}
