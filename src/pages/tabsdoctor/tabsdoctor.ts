import { Component } from '@angular/core';

import { Tabdoctor1Page } from '../tabdoctor1/tabdoctor1';
import { Tabdoctor2Page } from '../tabdoctor2/tabdoctor2';
import { Tabdoctor3Page } from '../tabdoctor3/tabdoctor3';

@Component({
  templateUrl: 'tabsdoctor.html'
})
export class TabsdoctorPage {

  tab1Root = Tabdoctor1Page;
  tab2Root = Tabdoctor2Page;
  tab3Root = Tabdoctor3Page;

  constructor() {

  }
}
