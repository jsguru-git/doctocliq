import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalseecommentsPage } from './modalseecomments';

@NgModule({
  declarations: [
    ModalseecommentsPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalseecommentsPage),
  ],
  exports: [
    ModalseecommentsPage
  ]
})
export class ModalseecommentsPageModule {}
