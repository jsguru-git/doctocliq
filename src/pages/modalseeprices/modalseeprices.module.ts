import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalseepricesPage } from './modalseeprices';

@NgModule({
  declarations: [
    ModalseepricesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalseepricesPage),
  ],
  exports: [
    ModalseepricesPage
  ]
})
export class ModalseepricesPageModule {}
