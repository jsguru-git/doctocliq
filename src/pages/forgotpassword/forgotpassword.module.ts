import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgotpasswordPage } from './forgotpassword';

@NgModule({
  declarations: [
    ForgotpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgotpasswordPage),
  ],
  exports: [
    ForgotpasswordPage
  ]
})
export class ForgotpasswordPageModule {}
