import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Searchbar1Page } from './searchbar1';

@NgModule({
  declarations: [
    Searchbar1Page,
  ],
  imports: [
    IonicPageModule.forChild(Searchbar1Page),
  ],
  exports: [
    Searchbar1Page
  ]
})
export class Searchbar1PageModule {}
