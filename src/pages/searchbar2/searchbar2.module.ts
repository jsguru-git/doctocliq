import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Searchbar2Page } from './searchbar2';

@NgModule({
  declarations: [
    Searchbar2Page,
  ],
  imports: [
    IonicPageModule.forChild(Searchbar2Page),
  ],
  exports: [
    Searchbar2Page
  ]
})
export class Searchbar2PageModule {}
