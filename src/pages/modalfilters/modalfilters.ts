import { Component } from '@angular/core';
import { IonicPage, NavParams, ViewController,ModalController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { Searchbar1Page } from '../searchbar1/searchbar1';
import { Searchbar2Page } from '../searchbar2/searchbar2';
import { Shared } from '../../providers/shared';

/**
 * Generated class for the ModalfiltersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modalfilters' ,
  templateUrl: 'modalfilters.html',
})
export class ModalfiltersPage {
  specialityselect
  districtselect
  speciality=''
  district=''
  constructor(private navParams: NavParams, private view: ViewController,  public shared: Shared,
    public translateService: TranslateService, public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalfiltersPage');
  }
  closeModal(){
     if(this.district==''){ 
      this.shared.ShowToast(this.translateService.instant('needdistrict'))
    }else if(this.speciality==''){
      this.shared.ShowToast(this.translateService.instant('needspeciality'))
    }else {
      this.view.dismiss({speciality:this.speciality,district:this.districtselect.id});
    }
  	
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
      console.log(item)
      
    })
    addModal.present();
   } 


}
