import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppointmentStep4Page } from '../appointment-step4/appointment-step4';
import * as moment from 'moment';
import { Api } from '../../providers/api/api';
import { Shared } from '../../providers/shared';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the AppointmentStep3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment-step3',
  templateUrl: 'appointment-step3.html',
})
export class AppointmentStep3Page {
dateAppointment
timeAppointment
item
reason
districtsdoctor
comment
districtname
  constructor(public navCtrl: NavController, public navParams: NavParams,public translateService:TranslateService
    , public api: Api, public shared: Shared) {
    this.dateAppointment=moment(this.navParams.get('date')).format("ddd DD MMM") 
    this.timeAppointment=moment(this.navParams.get('date')+" "+this.navParams.get('time')).format('hh:mm a')
    this.item=this.navParams.get('item')
    this.reason=this.navParams.get('reason')
    this.districtsdoctor=this.navParams.get('districtsdoctor')
    this.districtname=this.navParams.get('districtname')
  }

  gotoStep4(){
   
      var data={time:this.navParams.get('time'),date:this.navParams.get('date'),item:this.item,reason:this.navParams.get('reason'),districtsdoctor:this.navParams.get('districtsdoctor'),comment:this.comment}
      var schedule=this.navParams.get('schedule')
      schedule.time_start=moment(this.navParams.get('date')+" "+schedule.time_start).format('YYYY-MM-DD hh:mm:ss')
      schedule.time_end=moment(this.navParams.get('date')+" "+schedule.time_end).format('YYYY-MM-DD hh:mm:ss')
      this.shared.showLoading( this.translateService.instant('loading'))
      let body = new FormData();
      body.append('doctor',schedule.doctor);
      body.append('schedule',schedule.id);
      body.append('end',schedule.time_end);
      body.append('establishment', schedule.establishment);
      body.append('patient',this.shared.user.id);//1 
      body.append('start',  schedule.time_start);
      body.append('reason', this.reason.id);
      body.append('comment_patient', this.comment);
       let seq = this.api.post(this.api.apicreatappointments, body)  
      seq.map(res => res.json()).subscribe(res => {
          this.shared.hideLoading()
          console.log(res)
          this.navCtrl.push(AppointmentStep4Page);
      }, err => {
        console.error('ERROR', err);
        this.shared.hideLoading()
        this.shared.ShowToast(err);
      });
    
  
  }
 

}
