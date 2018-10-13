import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PatientsmsPage } from './patientsms';

@NgModule({
  declarations: [
    PatientsmsPage,
  ],
  imports: [
    IonicPageModule.forChild(PatientsmsPage),
  ],
  exports: [
    PatientsmsPage
  ]
})
export class PatientsmsPageModule {}
