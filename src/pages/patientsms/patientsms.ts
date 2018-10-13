import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabspatientPage } from '../tabspatient/tabspatient';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Shared } from '../../providers/shared';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';
 

@IonicPage()
@Component({
  selector: 'page-patientsms',
  templateUrl: 'patientsms.html',
})
export class PatientsmsPage  {
  registerForm
  numberresend=0
  constructor(public navCtrl: NavController, public navParams: NavParams,public translateService:TranslateService
    , public api: Api, public shared: Shared,formBuilder: FormBuilder,) {
      this.registerForm = formBuilder.group({
      code: ['',Validators.compose([ Validators.required, Validators.minLength(4), Validators.maxLength(4)])],
    });
  }
 
  validate(): boolean {
    if (this.registerForm.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';
    // validate each field
    let codecontrol = this.registerForm.controls['code'];
    if (!codecontrol.valid) {
      if (codecontrol.errors['required']) {
        errorMsg =  this.translateService.instant('needcode');
      } else if (codecontrol.errors['minlength']) {
        errorMsg = this.translateService.instant('minpcode');
      }
      else if (codecontrol.errors['maxlength']) {
        errorMsg = this.translateService.instant('maxcode');
      }
    }
    this.shared.showAlert(errorMsg)
    console.log(errorMsg)
    return false;
  }
 resendsms(){
    console.log(this.numberresend)
    if(this.numberresend==0||this.numberresend==1){
      this.numberresend=this.numberresend+1 
      this.shared.showLoading( this.translateService.instant('loading'))
      let body = new FormData();
      body.append('cel_phone',this.shared.celphone);
      let seq = this.api.post(this.api.apipatients+this.api.apiresend_sms, body)  
      seq.map(res => res.json()).subscribe(res => {
          this.shared.hideLoading()
          // console.log(res)
          this.shared.ShowToast(this.translateService.instant('sendsmsm'));
      }, err => {
        console.error('ERROR', err);
        this.shared.hideLoading()
        this.shared.ShowToast(err);
      });
    }
  }
  validatecode(){
     if (this.validate()) {
      this.shared.showLoading( this.translateService.instant('loading'))
       let body = new FormData();
         body.append('cel_phone',this.shared.celphone);
         body.append('pin', this.registerForm.value.code);
      let seq = this.api.post(this.api.apipatients+this.api.apiconfirm, body)  
      seq.map(res => res.json()).subscribe(res => {
          this.shared.hideLoading()
          console.log(res)
          // if(res.patient) { 
            setTimeout(function() {
            this.navCtrl.push(TabspatientPage);
            }, 3000);
          // } else this.shared.ShowToast(this.translateService.instant('errorcode'));
      }, err => {
        console.error('ERROR', err);
        this.shared.hideLoading()
        this.shared.ShowToast(err);
      });
    }
  }
}

