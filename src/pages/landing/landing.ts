import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegistermainPage } from '../registermain/registermain';
import { Searchbar1Page } from '../searchbar1/searchbar1';
import { Searchbar2Page } from '../searchbar2/searchbar2';
import { DoctorlistPage } from '../doctorlist/doctorlist';
import { TranslateService } from '@ngx-translate/core';
import { Shared } from '../../providers/shared';
import * as moment from 'moment';

/**
 * Generated class for the LandingPage page.   ...
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {
  specialityselect
  districtselect
  speciality=''
  district=''
  constructor(public navCtrl: NavController, public navParams: NavParams,  public shared: Shared,
    public translateService: TranslateService, public modalCtrl: ModalController) {
      if(this.shared.specialitylist.length==0)this.shared.loadspecialities()
      if(this.shared.districtlist.length==0)this.shared.loaddistricts()
        console.log(moment( ).add(3,'days').format("YYYY-MM-DD"))
       
  }

  gotoLogin(){
  	this.navCtrl.push(LoginPage);
  }
  gotoRegister(){
  	this.navCtrl.push(RegistermainPage);
  }

  gotoSearch1(){
    let addModal = this.modalCtrl.create(Searchbar1Page);
    addModal.onDidDismiss(item => {
      this.specialityselect=item

      if(item &&item.name)this.speciality=item.name
    })
    addModal.present();
  }
  gotoSearch2(){
    let addModal = this.modalCtrl.create(Searchbar2Page);
    addModal.onDidDismiss(item => {
      this.districtselect=item 
      if(item &&item.name)this.district=item.name
      // console.log(item)
      
    })
    addModal.present();
   } 
  gotoDoctorlist(){
    if(this.district==''){ 
      this.shared.ShowToast(this.translateService.instant('needdistrict'))
    }else if(this.speciality==''){
      this.shared.ShowToast(this.translateService.instant('needspeciality'))
    }else {
      this.navCtrl.push(DoctorlistPage,{speciality:this.speciality,district:this.districtselect.id,districtname:this.districtselect.name}
      );
    }
  }                   
   
}

