import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterdoctorPage } from './registerdoctor';

@NgModule({
  declarations: [
    RegisterdoctorPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterdoctorPage),
  ],
  exports: [
    RegisterdoctorPage
  ]
})
export class RegisterdoctorPageModule {}
