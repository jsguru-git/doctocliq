import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DoctorthanksPage } from './doctorthanks';

@NgModule({
  declarations: [
    DoctorthanksPage,
  ],
  imports: [
    IonicPageModule.forChild(DoctorthanksPage),
  ],
  exports: [
    DoctorthanksPage
  ]
})
export class DoctorthanksPageModule {}
