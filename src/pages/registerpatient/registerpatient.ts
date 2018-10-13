import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { PatientsmsPage } from '../patientsms/patientsms';
import { LegaltermsPage } from '../../pages/legalterms/legalterms';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Shared } from '../../providers/shared';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';
import { Searchbar2Page } from '../searchbar2/searchbar2';

@IonicPage()
@Component({
  selector: 'page-registerpatient',
  templateUrl: 'registerpatient.html',
})
export class RegisterpatientPage {
  registerForm: FormGroup;
   districtselect
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController  
    , public api: Api, public shared: Shared,formBuilder: FormBuilder,public translateService:TranslateService) {
      this.registerForm = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required ,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ])],
      password: ['',Validators.compose([ Validators.required, Validators.minLength(6)])],
      phone: ['',Validators.compose([ Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      district: ['', Validators.required],
      agreeterms: [false, Validators.requiredTrue]
    });
    if(this.shared.districtlist.length>0)this.shared.loaddistricts()
    console.log(this.api.apipatients+this.api.apiRegpatient)
  }
  
  gotoSearch2(){
    let addModal = this.modalCtrl.create(Searchbar2Page);
    addModal.onDidDismiss(item => {
      this.districtselect=item.name
      this.registerForm.get('district').setValue(item.id)
      // this.registerForm.value.district=item.id
      console.log(item,this.registerForm.value.district)
      
    })
    addModal.present();
   }
  validate(): boolean {
    if (this.registerForm.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let passcontrol = this.registerForm.controls['password'];
    let firstnamecontrol = this.registerForm.controls['firstname'];
    let lastnamecontrol = this.registerForm.controls['lastname'];
    let emailcontrol = this.registerForm.controls['email'];
    let phonecontrol = this.registerForm.controls['phone'];
    let agreetermscontrol = this.registerForm.controls['agreeterms'];
    let districtcontrol = this.registerForm.controls['district'];

   if (!firstnamecontrol.valid) {
      if (firstnamecontrol.errors['required']) {
        errorMsg =this.translateService.instant('needfirstname'); 
      } 
    }
    else if (!lastnamecontrol.valid) {
      if (lastnamecontrol.errors['required']) {
        errorMsg =this.translateService.instant('needlastname');  
      } 
    }
    else  if (!emailcontrol.valid) {
      if (emailcontrol.errors['required']) {
        errorMsg =this.translateService.instant('needemail');   
      } else if (emailcontrol.errors['pattern']) {
        errorMsg = this.translateService.instant('correctemail'); 
      } 
      
    }
    else if (!passcontrol.valid) {
      if (passcontrol.errors['required']) {
        errorMsg = this.translateService.instant('needpassword'); 
      } else if (passcontrol.errors['minlength']) {
        errorMsg =  this.translateService.instant('minpassword'); 
      }
    }
    else if (!phonecontrol.valid) {
      if (phonecontrol.errors['required']) {
        errorMsg = this.translateService.instant('needphone');
      }  else if (phonecontrol.errors['minlength']) {
        errorMsg = this.translateService.instant('minphone');
      }
      else if (phonecontrol.errors['maxlength']) {
        errorMsg =this.translateService.instant('maxphone');
      }
    
    }
    else if (!districtcontrol.valid) {
      if (districtcontrol.errors['required']) {
        errorMsg = this.translateService.instant('needdistrict');
      }  
    }
    else if (!agreetermscontrol.valid) {
      if (agreetermscontrol.errors['required']) {
        errorMsg = this.translateService.instant('AcceptLegal');
      }  
    }    
    this.shared.showAlert(errorMsg)
    console.log(errorMsg)
    return false;
  }

  gotopage(){
    this.navCtrl.push(LegaltermsPage);
  }

  gotoPatientsms(){
    if (this.validate()) {
      let body = new FormData();
      body.append('first_name', this.registerForm.value.firstname);
      body.append('last_name', this.registerForm.value.lastname);
      body.append('email', this.registerForm.value.email);
      body.append('password', this.registerForm.value.password);
      body.append('district', this.registerForm.value.district);
      body.append('cel_phone', this.registerForm.value.phone);
      this.shared.showLoading( this.translateService.instant('loading'))
      let seq = this.api.post(this.api.apipatients+this.api.apiRegpatient, body) 
      seq.map(res => res.json()).subscribe(res => {
          console.log(res)
          this.shared.setphone(this.registerForm.value.phone)   
          this.navCtrl.push(PatientsmsPage); 
          this.shared.hideLoading()
          this.shared.ShowToast(this.translateService.instant('successreg'));
      }, err => {
        console.error('ERROR', err);
        this.shared.hideLoading()
        this.shared.ShowToast(err);
      });
    }
  }
  

}