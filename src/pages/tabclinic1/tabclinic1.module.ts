import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { Tabclinic1Page } from './tabclinic1';

@NgModule({
  declarations: [
    Tabclinic1Page,
  ],
  imports: [
    BrowserModule,
    IonicPageModule.forChild(Tabclinic1Page),
  ],
  exports: [
    Tabclinic1Page
  ]
})
export class Tabclinic1PageModule {}