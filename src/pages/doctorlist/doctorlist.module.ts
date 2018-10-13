import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorlistPage } from './doctorlist';

@NgModule({
  declarations: [
    DoctorlistPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorlistPage),
  ],
  exports: [
    DoctorlistPage
  ]
})
export class DoctorlistPageModule {}
