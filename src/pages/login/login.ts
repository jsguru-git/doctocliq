import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, ModalController, ModalOptions} from 'ionic-angular';
import { TabspatientPage } from '../tabspatient/tabspatient';
import { TabsdoctorPage } from '../tabsdoctor/tabsdoctor';
import { TabsclinicPage } from '../tabsclinic/tabsclinic';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Shared } from '../../providers/shared';
import { Api } from '../../providers/api/api';
import { TranslateService } from '@ngx-translate/core';
import { ModalforgotpasswordPage } from '../../pages/modalforgotpassword/modalforgotpassword';
import { AppointmentStep3Page } from '../appointment-step3/appointment-step3';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  registerForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modal: ModalController ,
    public translateService:TranslateService
    , public api: Api, public shared: Shared,formBuilder: FormBuilder,) {
      this.registerForm = formBuilder.group({
      password: ['',Validators.compose([ Validators.required, Validators.minLength(6)])],
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
    let passcontrol = this.registerForm.controls['password'];
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
      }  else if (!passcontrol.valid) {
        if (passcontrol.errors['required']) {
          errorMsg = this.translateService.instant('needpassword'); 
        } else if (passcontrol.errors['minlength']) {
          errorMsg = this.translateService.instant('minpassword');  
        }
      }
    this.shared.showAlert(errorMsg)
    console.log(errorMsg)
    return false;
  }

  login(){
/******---------- */
    // this.navCtrl.push(TabsclinicPage); 
/**------ */
    if (this.validate()) {
      this.shared.showLoading( this.translateService.instant('loading'))
       let body = new FormData();
         body.append('cel_phone',this.registerForm.value.phone);
         body.append('password', this.registerForm.value.password);
      let seq = this.api.post("patients/login/", body)  
      console.log(seq)
      seq.map(res => res.json()).subscribe(res => {
          this.shared.hideLoading()
          console.log(res)
          if(res.patient) {
            this.shared.loggedIn(res.patient,'login')        
            if(this.navParams.get('item')){
              var data={time:this.navParams.get('time'),date:this.navParams.get('date'),districtname:this.navParams.get('districtname'),
              item:this.navParams.get('item'),reason:this.navParams.get('reason'),districtsdoctor:this.navParams.get('districtsdoctor'),schedule:this.navParams.get('schedule')}
              this.navCtrl.push(AppointmentStep3Page,data);
            }else this.navCtrl.push(TabspatientPage); 
          }else if(res.doctor) {
            this.shared.loggedIn(res.doctor,'login')
            this.navCtrl.push(TabsdoctorPage); 
          }
          else{
            var seq1 = this.api.post("../rest-auth/login/", body)
//            console.log(seq1)
//            this.navCtrl.push(TabsclinicPage);
//            return;
            console.log(body);
            seq1.map(res => res.json()).subscribe(res => {
              console.log(res)
              if(res.doctor){
              // if(res1.clinic) {
                  // this.shared.loggedIn(res1.clinic,'login')
                  this.navCtrl.push(TabsclinicPage);
              }
              else{
                this.shared.ShowToast(this.translateService.instant('errorlogin'));
              }
            });
          }
          // else if(res.clinic){
          //   this.shared.loggedIn(res.clinic,'login')
          //   this.navCtrl.push(TabsclinicPage); 
          // }
          // else this.shared.ShowToast(this.translateService.instant('errorlogin'));
          //  } else this.shared.ShowToast(this.translateService.instant('errorlogin'));
      }, err => {
        console.error('ERROR', err)
        this.shared.hideLoading()
        this.shared.ShowToast(err);
      });
    }
  } 

  openForgotpasswordModal(){

    const myModalOptions: ModalOptions = {
      showBackdrop: true,
      enableBackdropDismiss: false
    };

    // const myModalData = {
    
    // };

    const myModal: Modal = this.modal.create(ModalforgotpasswordPage,myModalOptions);

    myModal.present();
  }

}
