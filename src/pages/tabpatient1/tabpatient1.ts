import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Shared } from '../../providers/shared';
import { DoctorlistPage } from '../doctorlist/doctorlist';

import { Searchbar1Page } from '../searchbar1/searchbar1';
import { Searchbar2Page } from '../searchbar2/searchbar2';
@Component({
  selector: 'page-tabpatient1',
  templateUrl: 'tabpatient1.html'
})
export class Tabpatient1Page {
  specialityselect
  districtselect
  speciality=''
  district=''

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,  public shared: Shared,
    public translateService: TranslateService) {}
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
      console.log(item)
      
    })
    addModal.present();
   } 
   gotoDoctorlist(){
     if(this.district==''){ 
       this.shared.ShowToast(this.translateService.instant('needdistrict'))
     }else if(this.speciality==''){
       this.shared.ShowToast(this.translateService.instant('needspeciality'))
     }else {
       this.navCtrl.push(DoctorlistPage,{speciality:this.speciality,district:this.districtselect.id}
       );
     }
    }
}
