import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppointmentStep3Page } from '../appointment-step3/appointment-step3';
import { Api } from '../../providers/api/api';
import { Shared } from '../../providers/shared';
import { TranslateService } from '@ngx-translate/core';
import { LoginPage } from '../login/login';

/**
 * Generated class for the AppointmentStep2Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-appointment-step2',
  templateUrl: 'appointment-step2.html',
})
export class AppointmentStep2Page {
  dateAppointment
  timeAppointment
  item
  reason
  reasonId
  reasonchoose
  constructor(public navCtrl: NavController, public navParams: NavParams , public api: Api,public translateService:TranslateService
    ,  public shared: Shared) {
    this.dateAppointment= this.navParams.get('date') 
    this.timeAppointment= this.navParams.get('time') 
    this.item=this.navParams.get('item')
    this.loaddata()
  }
   
  gotoStep3(){
    console.log(this.reasonId);
    if(!this.reasonId)       this.shared.ShowToast( this.translateService.instant('choosereason') )
    else{
        var data={time:this.navParams.get('time'),date:this.navParams.get('date'),districtname:this.navParams.get('districtname'),
        item:this.item,reason:this.reasonchoose,districtsdoctor:this.navParams.get('districtsdoctor'),schedule:this.navParams.get('schedule')}
        
       if(!this.shared.user){
         this.shared.ShowToast(this.translateService.instant('needlogin'));
         this.navCtrl.push(LoginPage,data);
      }else{
        this.navCtrl.push(AppointmentStep3Page,data);
      }
    }
  }   
  
  updatereason(id,item,index){
    if(id!=this.reasonId){
      this.reasonchoose=item
      this.reasonId=id
      for(let i=0; i<this.reason.length;i++){
          if(this.reason[i].id==id)  this.reason[i].checkedcol=true
          else if(this.reasonId!=this.reason[i].id)this.reason[i].checkedcol=false
      }
    }else{  
      this.reasonchoose=''
      this.reasonId=''
      this.reason[index].checkedcol=false
    }
  }
   loaddata( ){
    
    var seq = this.api.get(this.api.apireason+"?establishment_id="+this.item.establishments[0].id) 
    this.shared.showLoading( this.translateService.instant('loading'))
   
    seq.map(res=> { return res.json(); }).subscribe(res=> {
      this.shared.hideLoading()
      this.reason=res  
      for(let i=0; i<this.reason.length;i++){
         this.reason[i].checkedcol=false
      }
  }, err=> {
    this.shared.hideLoading()
       this.shared.ShowToast( this.translateService.instant('Failedloading') )
      console.error('ERROR', err);
    });
    
  }
}
