import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentStep2Page } from './appointment-step2';

@NgModule({
  declarations: [
    AppointmentStep2Page,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentStep2Page),
  ],
  exports: [
    AppointmentStep2Page
  ]
})
export class AppointmentStep2PageModule {}
