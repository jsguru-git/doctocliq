import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions} from 'ionic-angular';
import { DoctorprofilePage } from '../doctorprofile/doctorprofile';
import { Api } from '../../providers/api/api';
import { Shared } from '../../providers/shared';
import { TranslateService } from '@ngx-translate/core';
import { MapPage } from '../../pages/map/map';
import { ModalfiltersPage } from '../../pages/modalfilters/modalfilters';
import { ModalseephonesPage } from '../../pages/modalseephones/modalseephones';
import { ModalseepricesPage } from '../../pages/modalseeprices/modalseeprices';
import * as moment from 'moment';
import { AppointmentStep1Page } from '../appointment-step1/appointment-step1';

/**
 * Generated class for the DoctorlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doctorlist',
  templateUrl: 'doctorlist.html',
})
export class DoctorlistPage {
  speciality
  district
  list=[]
  nextpage 
  apiurl
  today
  tomorrow
  districtname
  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api,public translateService:TranslateService
    ,  public shared: Shared,public modal:ModalController) {
      this.speciality=this.navParams.get('speciality');
      this.district=this.navParams.get('district');
      this.districtname=this.navParams.get('districtname');
      console.log(this.speciality,this.district)
      this.loadlist('')
      this.today=moment().format("YYYY-MM-DD")
      this.tomorrow=moment().add(1,'days').format("YYYY-MM-DD")
  }

  getday(time){
      var now=moment().format("YYYY-MM-DD");
      if(time==now)  return  this.translateService.instant('Today')
      else if(time==moment().add(1,'days').format("YYYY-MM-DD"))   return  this.translateService.instant('Tomorrow')
      else  return moment(time).format("DD-MM")
  }
    gettime(time){
      if(time!=''){
        var now=moment().format("MM-DD-YYYY");
        return moment(now+" "+time).format('HH:mm')
      }else{
        return '_______'
      }
    }
    gotomap(type){
      if(type=='list')   this.navCtrl.push(MapPage,{list:this.list});
      else {
        if(type.establishments.length>0)  this.navCtrl.push(MapPage,{list:[type]});
      }
  } 
  gotoDoctorprofile(item){
    this.navCtrl.push(DoctorprofilePage,{item:item,districtname:this.navParams.get('districtname')});
  } 
  itemchoose
  gotoStep1(time,date,schedule_id,item){
    if(!schedule_id.empty){
    console.log(time,date)
     this.itemchoose=schedule_id.id
     var data={time:time,date:date,item :item,districtsdoctor:'',schedule:schedule_id}
    this.navCtrl.push(AppointmentStep1Page,data);
    }
  } 
 
  loadlist(infiniteScroll){
    if(this.list.length>0&& this.nextpage!=null){ 
       this.apiurl=this.nextpage
        var seq = this.api.getapi(this.apiurl) 
        this.loaddata(seq,infiniteScroll)
     } else if(this.list.length==0){
       this.apiurl=this.api.apidoctors_establishments+"search_text="+this.speciality+"&district_id="+this.district;
        var seq = this.api.get(this.apiurl) 
        this.loaddata(seq,infiniteScroll)
      }else if(infiniteScroll!='') infiniteScroll.complete();
  }
  
  openPricesModal(item){
    const myModalOptions: ModalOptions = {
        showBackdrop: true,
        enableBackdropDismiss: false
      };

      const myModal: Modal = this.modal.create(ModalseepricesPage,{item:item},myModalOptions);
       myModal.onDidDismiss(item => {
 
    })
      myModal.present();
  }

  openFiltersModal(){
    const myModalOptions: ModalOptions = {
        showBackdrop: true,
        enableBackdropDismiss: false
      };

      const myModal: Modal = this.modal.create(ModalfiltersPage,myModalOptions);
       myModal.onDidDismiss(item => {
         this.speciality=item.speciality;
         this.district=item.district
         this.list=[]
        this.loadlist('')
  
    })
      myModal.present();
  }

  openPhonesModal(item){
        const myModalOptions: ModalOptions = {
          showBackdrop: true,
          enableBackdropDismiss: false
        };
    
        const myModal: Modal = this.modal.create(ModalseephonesPage,{item:item} ,myModalOptions);
        myModal.present(); 
  }

  
    loaddata(seq,infiniteScroll){

    this.shared.showLoading( this.translateService.instant('loading'))
   
    seq.map(res=> { return res.json(); }).subscribe(res=> {
      this.shared.hideLoading()
      var data=res.results
      for(let i=0;i<data.length;i++){
        data[i].todaylist=[]
        data[i].tomorrowlist=[]
         data[i].tomorrow=false
         data[i].today=false
         if(data[i].establishments.length>0){
        if(data[i].establishments[0].days.length>0){
          for(let k=0;k<data[i].establishments[0].days.length;k++){
            if(data[i].establishments[0].days[k][0]!=this.today&&data[i].establishments[0].days[k][0]!=this.tomorrow){ 
              if(!data[i].tomorrow)data[i].tomorrow=false
              if(!data[i].today) data[i].today=false
            }else  { 
              if(data[i].establishments[0].days[k][0]==this.today)data[i].today=true
              if(data[i].establishments[0].days[k][0]==this.tomorrow )  data[i].tomorrow=true
              // if(data[i].tomorrow==true) 
              if(data[i].today==true&&data[i].tomorrow==true)   break
            }
          }
          for(let k=0;k<data[i].establishments[0].schedules.length;k++){
            if(data[i].establishments[0].schedules[k].date==this.today) {
            if(data[i].today==true&&data[i].tomorrow==false)   data[i].tomorrowlist.push({time_start:'',id:i,empty:true})
              data[i].todaylist.push(data[i].establishments[0].schedules[k])
            }
            if(data[i].establishments[0].schedules[k].date==this.tomorrow) {
              data[i].tomorrowlist.push(data[i].establishments[0].schedules[k])
              if(data[i].today==false&&data[i].tomorrow==true)  data[i].todaylist.push({time_start:'',id:i,empty:true})
            }
            
          }
        } 
         }else{
           data[i].today=false
           data[i].tomorrow=false
        }
      }
      
      this.list=this.list.concat(data)
      this.nextpage=res.next
     if(infiniteScroll!='') infiniteScroll.complete();
      console.log(this.list)
  }, err=> {
    this.shared.hideLoading()
      if(infiniteScroll!='') infiniteScroll.complete();
      this.shared.ShowToast( this.translateService.instant('Failedloading') )
      console.error('ERROR', err);
    });
    }
}