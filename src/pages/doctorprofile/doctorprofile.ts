import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions} from 'ionic-angular';
import { AppointmentStep1Page } from '../appointment-step1/appointment-step1';
import { AppointmentStep2Page } from '../appointment-step2/appointment-step2';
import { ModalseecommentsPage } from '../../pages/modalseecomments/modalseecomments';
import { ModalseephonesPage } from '../../pages/modalseephones/modalseephones';
import { ModalseepricesPage } from '../../pages/modalseeprices/modalseeprices';
import { Api } from '../../providers/api/api';
import { Shared } from '../../providers/shared';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

/**
 * Generated class for the DoctorprofilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-doctorprofile',
  templateUrl: 'doctorprofile.html',
})
export class DoctorprofilePage {
item
districtsdoctor
apiurl
daysindex=1
daylist=[]
itemchoose
today
districtname
scheduledoctor
daysearch
   
  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController, public api: Api,public translateService:TranslateService
    ,  public shared: Shared) {
    this.item=navParams.get('item') 
    this.districtname=this.districtsdoctor=this.navParams.get('districtname')
    if(this.item.establishments.length>0){ 
      // this.changeday(0)
        this.today =moment().format("YYYY-MM-DD")
      //  console.log('this.today',this.today)//02-10-201
      this.loaddoctor(moment().format("DD-MM-YYYY"),moment().format("YYYY-MM-DD")) 
    }
      
   }
  backarrow(){
    if(this.daysearch>this.today) {
     this.loaddoctor(moment(this.daysearch).subtract(3,'days').format("DD-MM-YYYY") ,moment(this.daysearch).subtract(3,'days').format("YYYY-MM-DD"))
    }
  }
 nextarrow(){
    // console.log(moment(this.daysearch).add(3,'days').format("DD-MM-YYYY") ,moment(this.daysearch).add(3,'days').format("YYYY-MM-DD"))
   this.loaddoctor(moment(this.daysearch).add(3,'days').format("DD-MM-YYYY") ,moment(this.daysearch).add(3,'days').format("YYYY-MM-DD"))
  }
  // changeday(index){ 
  //   this.daylist=[]
  //   for(let i=index;i<index+3;i++){
  //     console.log(i,this.item.establishments[0].days[i])
  //     if(!this.item.establishments[0].days[i]) {
  //         if(!this.item.establishments[0].days[i]&&i==1) this.daylist.push({date:this.getday(moment(this.item.establishments[0].days[i-1][0]).add(1,'days').format("YYYY-MM-DD")),dateschedules:moment(this.item.establishments[0].days[i-1][0]).add(1,'days').format("YYYY-MM-DD"),schedules:[]})
  //         else  this.daylist.push({date:this.getday(moment(this.item.establishments[0].days[i-2][0]).add(2,'days').format("YYYY-MM-DD")),dateschedules:moment(this.item.establishments[0].days[i-2][0]).add(2,'days').format("YYYY-MM-DD"),schedules:[]})
          
  //         }else this.daylist.push({date:this.getday(this.item.establishments[0].days[i][0]),dateschedules:this.item.establishments[0].days[i][0],schedules:[]})
  //     var dateselected= this.shared.filterItems(this.item.establishments[0].schedules,{'date':this.daylist[i].dateschedules })//[0]
  //     for(let k=0;k<dateselected.length;k++){
  //          this.daylist[i].schedules.push(dateselected[k])
  //      }
  //     if(dateselected.length==0){
  //       console.log(dateselected.length)
  //        if(!this.item.establishments[0].days[i]&&i==1)    var dateempty= this.shared.filterItems(this.item.establishments[0].schedules,{'date':this.daylist[i-1].dateschedules })//[0]
  //       else  var dateempty= this.shared.filterItems(this.item.establishments[0].schedules,{'date':this.daylist[i-2].dateschedules })//[0]

  //       console.log(dateempty.length)
  //       for(let k=0;k<dateempty.length;k++){
  //          this.daylist[i].schedules.push({time_start:'',id:k,empty:true})
  //       }
  //     }
  //   }
  //  }

  getday(time){
    // console.log(time)
      var now=moment().format("YYYY-MM-DD");
      if(time==now)  return  this.translateService.instant('Today')
      else if(time==moment().add(1,'days').format("YYYY-MM-DD"))   return  this.translateService.instant('Tomorrow')
      else  return moment(time).locale('es').format("ddd")+" "+moment(time).format("D")+" "+moment(time).locale('es').format("MMM")
  }
  gettime(time){
    if(time!=''){
      var now=moment().format("MM-DD-YYYY");
      return moment(now+" "+time).format('HH:mm')
    }else{
        return '_______'
    }
  }

  gotoStep1(time,date,schedule_id){
    if(!schedule_id.empty){
      this.itemchoose=schedule_id.id
      console.log(time,date)
      var data={time:time,date:date,item:this.item,districtsdoctor:this.districtsdoctor,schedule:schedule_id,districtname:this.districtname}
      this.navCtrl.push(AppointmentStep1Page,data);
    }
  } 
  
  openPricesModal( ){
    const myModalOptions: ModalOptions = {
        showBackdrop: true,
        enableBackdropDismiss: false
      };

      const myModal: Modal = this.modal.create(ModalseepricesPage,{item:this.item},myModalOptions);
       myModal.onDidDismiss(item => {
 
    })
      myModal.present();
  }
  openPhonesModal(){

  	const myModalOptions: ModalOptions = {
  		showBackdrop: true,
  		enableBackdropDismiss: false
  	};

  	const myModal: Modal = this.modal.create(ModalseephonesPage,{item:this.item},myModalOptions);

  	myModal.present();

  }


  openCommentsModal(){

  	const myModalOptions: ModalOptions = {
  		showBackdrop: true,
  		enableBackdropDismiss: false
  	};

  	const myModal: Modal = this.modal.create(ModalseecommentsPage ,myModalOptions);
  	myModal.present();
  } 
  
  loaddoctor(day ,day_list){
    
      this.apiurl=this.api.apischedule+this.item.establishments[0].id+"&date="+day+"&days=3"
      var seq = this.api.get(this.apiurl) 
      this.shared.showLoading( this.translateService.instant('loading'))
     seq.map(res=> { return res.json(); }).subscribe(res=> {
      this.shared.hideLoading()
      this.scheduledoctor=res
      if(res.length>0){
        this.daysearch=day_list
           this.daylist=[]
          for(let i=0;i<3;i++){
             this.daylist.push({date:this.getday(moment(day_list).add(i,'days').format("YYYY-MM-DD"))
            ,dateschedules:moment(day_list).add(i,'days').format("YYYY-MM-DD"),schedules:[]}) 
         }
         for(let i=0;i<this.daylist.length;i++){
               var dateselected= this.shared.filterItems( this.scheduledoctor,{'date':this.daylist[i].dateschedules }) 
          for(let k=0;k<dateselected.length;k++){
              this.daylist[i].schedules.push(dateselected[k])
          }
          if(dateselected.length==0){
            if(i>0)  var dateempty= this.shared.filterItems(this.scheduledoctor,{'date':this.daylist[i-1].dateschedules }) 
            else var dateempty= this.shared.filterItems(this.scheduledoctor,{'date':this.daylist[i+1].dateschedules })
            for(let k=0;k<dateempty.length;k++){
              this.daylist[i].schedules.push({time_start:'',id:k,empty:true})
            }
          }
        }
      }
   }, err=> {
    this.shared.hideLoading()
       this.shared.ShowToast( this.translateService.instant('Failedloading') )
      console.error('ERROR', err);
    });
    
  }
}
