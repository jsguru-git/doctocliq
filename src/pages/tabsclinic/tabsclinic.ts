import { Component } from '@angular/core';

import { Tabclinic1Page } from '../tabclinic1/tabclinic1';
import { Tabclinic2Page } from '../tabclinic2/tabclinic2';
import { Tabclinic3Page } from '../tabclinic3/tabclinic3';

@Component({
  templateUrl: 'tabsclinic.html'
})
export class TabsclinicPage {

  tab1Root = Tabclinic1Page;
  tab2Root = Tabclinic2Page;
  tab3Root = Tabclinic3Page;

  constructor() {

  }
}