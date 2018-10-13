import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core' ;
import { Api } from '../../providers/api/api';
import { Shared } from '../../providers/shared';

/**
 * Generated class for the ModalseepricesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modalseeprices',
  templateUrl: 'modalseeprices.html',
})
export class ModalseepricesPage {
item
  constructor(private view: ViewController, public navParams: NavParams, public translateService:TranslateService
  , public api: Api ,  public shared: Shared) {
    this.item=this.navParams.get('item')
    console.log(this.item)
    this.loaddata()
  }
list
  
  closeModal(){
    this.view.dismiss();
  }
  loaddata(){
    console.log(this.api.apiprice,this.item.id)
    this.shared.showLoading( this.translateService.instant('loading'))
    var seq = this.api.get(this.api.apiprice+this.item.id) 
    seq.map(res=> { return res.json(); }).subscribe(res=> {
      this.shared.hideLoading()
      this.list=res
       console.log(this.list)
  }, err=> {
    this.shared.hideLoading()
       this.shared.ShowToast( this.translateService.instant('Failedloading') )
      console.error('ERROR', err);
    });
  }

}
