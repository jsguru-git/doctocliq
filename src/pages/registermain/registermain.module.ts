import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegistermainPage } from './registermain';

@NgModule({
  declarations: [
    RegistermainPage,
  ],
  imports: [
    IonicPageModule.forChild(RegistermainPage),
  ],
  exports: [
    RegistermainPage
  ]
})
export class RegistermainPageModule {}
