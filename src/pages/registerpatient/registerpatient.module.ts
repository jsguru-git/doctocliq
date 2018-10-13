import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterpatientPage } from './registerpatient';

@NgModule({
  declarations: [
    RegisterpatientPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterpatientPage),
  ],
  exports: [
    RegisterpatientPage
  ]
})
export class RegisterpatientPageModule {}
