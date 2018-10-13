import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LegaltermsPage } from './legalterms';

@NgModule({
  declarations: [
    LegaltermsPage,
  ],
  imports: [
    IonicPageModule.forChild(LegaltermsPage),
  ],
  exports: [
    LegaltermsPage
  ]
})
export class LegaltermsPageModule {}
