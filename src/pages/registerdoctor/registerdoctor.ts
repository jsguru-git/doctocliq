import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DoctorsmsPage } from '../doctorsms/doctorsms';
import { Api } from '../../providers/api/api';
import { LegaltermsPage } from '../../pages/legalterms/legalterms';
import { Shared } from '../../providers/shared';
import { TranslateService } from '@ngx-translate/core';
import { Searchbar1Page } from '../searchbar1/searchbar1';

@IonicPage()
@Component({
  selector: 'page-registerdoctor',
  templateUrl: 'registerdoctor.html',
})
export class RegisterdoctorPage {
  registerForm: FormGroup;
  specialityselect
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public navParams: NavParams,
     public api: Api,formBuilder: FormBuilder,public translateService:TranslateService
    ,  public shared: Shared,) {
    this.registerForm = formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.compose([Validators.required ,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$') ])],
      password: ['',Validators.compose([ Validators.required, Validators.minLength(6)])],
      phone: ['',Validators.compose([ Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
      speciality: ['', Validators.required],
       agreeterms: [false, Validators.requiredTrue]
    });
    if(this.shared.specialitylist.length==0) this.shared.loadspecialities()
   }
 gotoSearch1(){
     
    let addModal = this.modalCtrl.create(Searchbar1Page);
    addModal.onDidDismiss(item => {
      this.specialityselect=item.name
      this.registerForm.get('speciality').setValue(item.id)      
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
    let specialitycontrol = this.registerForm.controls['speciality'];
 
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
     else if (!specialitycontrol.valid) {
      if (specialitycontrol.errors['required']) {
        errorMsg = this.translateService.instant('needspeciality'); 
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
  
  gotoDoctorsms(){
    if (this.validate()) {  
      this.shared.showLoading( this.translateService.instant('loading'))
      let body = new FormData();
      body.append('first_name', this.registerForm.value.firstname);
      body.append('last_name', this.registerForm.value.lastname);
      body.append('email', this.registerForm.value.email);
      body.append('password', this.registerForm.value.password);
      body.append('speciality', this.registerForm.value.speciality);
      body.append('cel_phone', this.registerForm.value.phone);
    
      let seq = this.api.post(this.api.apidoctors+this.api.apiRegdoctor, body) 
      seq.map(res => res.json()).subscribe(res => {
        this.shared.hideLoading()
        // console.log(res)
        this.shared.setphone(this.registerForm.value.phone)
         this.navCtrl.push(DoctorsmsPage);
        this.shared.ShowToast(this.translateService.instant('successreg'));
      }, err => {
        console.error('ERROR', err);
        this.shared.hideLoading()
        this.shared.ShowToast(err);
      });

    }
  }

}