import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppointmentStep2Page } from '../appointment-step2/appointment-step2';
import * as moment from 'moment';
import { Api } from '../../providers/api/api';
import { Shared } from '../../providers/shared';
import { TranslateService } from '@ngx-translate/core';


/**
 * Generated class for the AppointmentStep1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment-step1',
  templateUrl: 'appointment-step1.html',
})
export class AppointmentStep1Page {
dateAppointment
timeAppointment
item
districtsdoctor
apiurl
districtname
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api,public translateService:TranslateService
    ,  public shared: Shared) {
    this.dateAppointment=moment(this.navParams.get('date')).locale('es').format("ddd DD MMM")//=this.navParams.get('date')//.locale()
    this.timeAppointment=moment(this.navParams.get('date')+" "+this.navParams.get('time')).locale('es').format('hh:mm a')
    this.item=this.navParams.get('item')
    // districtname:this.districtname}
    this.districtname=this.districtsdoctor=this.navParams.get('districtname')
    // if(this.navParams.get('districtsdoctor')=='')this.loaddoctordistricts()
  }
// loaddoctordistricts( ){
//       this.apiurl=this.api.apiGetdistricts+this.item.establishments[0].id 
//       var seq = this.api.get(this.apiurl) 
//       this.shared.showLoading( this.translateService.instant('loading'))
   
//     seq.map(res=> { return res.json(); }).subscribe(res=> {
//       this.shared.hideLoading()
//       this.districtsdoctor=res.name 
//   }, err=> {
//     this.shared.hideLoading()
//        this.shared.ShowToast( this.translateService.instant('Failedloading') )
//       console.error('ERROR', err);
//     });
    
//   }

  gotoStep2(){
      if(this.navParams.get('districtsdoctor')!='')   this.districtsdoctor=this.navParams.get('districtsdoctor')
      var data={time:this.navParams.get('time'),date:this.navParams.get('date'),item:this.item,districtsdoctor:this.districtsdoctor,schedule:this.navParams.get('schedule'),districtname:this.districtname}
    this.navCtrl.push(AppointmentStep2Page,data);
  }

}
