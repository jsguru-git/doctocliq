import { Component } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Shared } from '../../providers/shared';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'page-modalforgotpassword',
  templateUrl: 'modalforgotpassword.html',
})
export class ModalforgotpasswordPage {   
  registerForm: FormGroup;

  constructor(private view: ViewController, public translateService:TranslateService
    , public api: Api, public shared: Shared,formBuilder: FormBuilder ) {
      this.registerForm = formBuilder.group({
      phone: ['',Validators.compose([ Validators.required, Validators.minLength(9), Validators.maxLength(9)])],
    });
  }
 
  validate(): boolean {
    if (this.registerForm.valid) {
      return true;
    }

    // figure out the error message
    let errorMsg = '';

    // validate each field
    let phonecontrol = this.registerForm.controls['phone'];
    
   
      if (!phonecontrol.valid) {
      if (phonecontrol.errors['required']) {
        errorMsg =  this.translateService.instant('needphone');
      }  else if (phonecontrol.errors['minlength']) {
        errorMsg = this.translateService.instant('minphone');
      }
      else if (phonecontrol.errors['maxlength']) {
        errorMsg = this.translateService.instant('maxphone');
      }
    }  
    this.shared.showAlert(errorMsg)
    console.log(errorMsg)
    return false;
  }
  closeModal(){
  	this.view.dismiss();
  }
sendsms(){

    if (this.validate()) {
      // this.shared.showLoading( this.translateService.instant('loading'))
      //  let body = new FormData();
      //    body.append('cel_phone',this.registerForm.value.phone);
      // let seq = this.api.post("patients/login/", body)  
      // seq.map(res => res.json()).subscribe(res => {
      //     this.shared.hideLoading()
      //     console.log(res) 
      // }, err => {
      //   console.error('ERROR', err);
      //   this.shared.hideLoading()
      //   this.shared.ShowToast(err);
      // });
    }

}

}
