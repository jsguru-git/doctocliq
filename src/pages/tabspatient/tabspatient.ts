import { Component } from '@angular/core';

import { Tabpatient1Page } from '../tabpatient1/tabpatient1';
import { Tabpatient2Page } from '../tabpatient2/tabpatient2';
import { Tabpatient3Page } from '../tabpatient3/tabpatient3';

@Component({
  templateUrl: 'tabspatient.html'
})
export class TabspatientPage {

  tab1Root = Tabpatient1Page;
  tab2Root = Tabpatient2Page;
  tab3Root = Tabpatient3Page;

  constructor() {

  }
}
