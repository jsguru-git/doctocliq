import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterdoctorPage } from '../registerdoctor/registerdoctor';
import { RegisterpatientPage } from '../registerpatient/registerpatient';
import { PatientsmsPage } from '../patientsms/patientsms';
import { DoctorsmsPage } from '../doctorsms/doctorsms';



/**
 * Generated class for the RegistermainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registermain',
  templateUrl: 'registermain.html',
})
export class RegistermainPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  gotoRegisterDoctor(){
            //  this.navCtrl.push(DoctorsmsPage);
  	this.navCtrl.push(RegisterdoctorPage);
  }
  gotoRegisterPatient(){
              // this.navCtrl.push(PatientsmsPage); 
  	this.navCtrl.push(RegisterpatientPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistermainPage');
  }

}
