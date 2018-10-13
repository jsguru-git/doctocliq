import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalfiltersPage } from './modalfilters';

@NgModule({
  declarations: [
    ModalfiltersPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalfiltersPage),
  ],
  exports: [
    ModalfiltersPage
  ]
})
export class ModalfiltersPageModule {}
