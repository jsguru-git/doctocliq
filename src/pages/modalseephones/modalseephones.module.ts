import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalseephonesPage } from './modalseephones';

@NgModule({
  declarations: [
    ModalseephonesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalseephonesPage),
  ],
  exports: [
    ModalseephonesPage
  ]
})
export class ModalseephonesPageModule {}
