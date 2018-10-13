import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AppointmentStep3Page } from './appointment-step3';

@NgModule({
  declarations: [
    AppointmentStep3Page,
  ],
  imports: [
    IonicPageModule.forChild(AppointmentStep3Page),
  ],
  exports: [
    AppointmentStep3Page
  ]
})
export class AppointmentStep3PageModule {}
