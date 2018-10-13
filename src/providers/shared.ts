
import {LoadingController,AlertController,ToastController } from 'ionic-angular'
import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { Api } from '../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Shared {

public user
public loader
public celphone//='112233445'
public specialitylist=[]
public districtlist=[]
 constructor(public loadingCtrl: LoadingController,public alertCtrl: AlertController
    ,public toastCtrl: ToastController,public storage: Storage,public api: Api,public translateService:TranslateService) {

  }
    
    filtersearch(items,searchTerm){
 
        return items.filter((item) => {
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     
 
    }
    
     filterItems(items, conditions ) { 
        return items.filter(item => {
            for (let field in conditions) {
                if (item[field] !== conditions[field]) {
                    return false;
                }
            }
            return true;
        });
    }
 loadspecialities(){
    // this.showLoading( this.translateService.instant('loading'))
    var seq = this.api.get(this.api.apispecialities) 
    seq.map(res=> { return res.json(); }).subscribe(res=> {
    //   this.hideLoading()
      this.specialitylist=res.results
    }, err=> {
    //   this.hideLoading()
      this.ShowToast( this.translateService.instant('Failedloading') )
      console.error('ERROR', err);
    });
  }
 loaddistricts(){
    // this.showLoading( this.translateService.instant('loading'))
    var seq = this.api.get( this.api.apiGetdistricts) 
    seq.map( res=> { return res.json(); }).subscribe( res=>{
        // this.hideLoading()
        this.districtlist = res.results;                 
    },  err=> {
        // this.hideLoading()
        this.ShowToast( this.translateService.instant('Failedloading') )
        console.error('ERROR', err);
    });
  }
    setphone(phone){
        this.storage.set('phone',phone);
        this.celphone=phone
    }
  loggedIn(user,type) {
    this.user = user;
    this.storage.set('userdata', JSON.stringify(this.user));
    if(type=='register') this.storage.set('validationsms',false);
    else this.storage.set('validationsms',true);
  }
//show loading pop up 
    showLoading(txt) {
        this.loader = this.loadingCtrl.create({ content: txt});
        this.loader.present(); 
    }

    //hide loading pop up 
     hideLoading() {  this.loader.dismiss();  }
    
    //show alert confirmation
    showAlert(txt) {
        let alert = this.alertCtrl.create({  title: 'alert', subTitle: txt,  buttons: ['ok'] });
        alert.present();
    }

    //show toast  
    ShowToast(messaage) {
        let toast = this.toastCtrl.create({ message: messaage, duration: 2000,  position: 'bottom'});
        toast.present();
    }
}