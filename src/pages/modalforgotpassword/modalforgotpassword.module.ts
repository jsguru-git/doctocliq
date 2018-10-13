import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalforgotpasswordPage } from './modalforgotpassword';

@NgModule({
  declarations: [
    ModalforgotpasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalforgotpasswordPage),
  ],
  exports: [
    ModalforgotpasswordPage
  ]
})
export class ModalforgotpasswordPageModule {}
