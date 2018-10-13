import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AppointmentStep4Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment-step4',
  templateUrl: 'appointment-step4.html',
})
export class AppointmentStep4Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  finish(){
    this.navCtrl.popToRoot ();
  }
}
