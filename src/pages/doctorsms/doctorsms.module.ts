import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorsmsPage } from './doctorsms';

@NgModule({
  declarations: [
    DoctorsmsPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorsmsPage),
  ],
  exports: [
    DoctorsmsPage
  ]
})
export class DoctorsmsPageModule {}
