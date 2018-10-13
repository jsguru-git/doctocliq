import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ModalseecommentsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modalseecomments',
  templateUrl: 'modalseecomments.html',
})
export class ModalseecommentsPage {
	
  constructor(private navParams: NavParams, private view: ViewController) {
  }

  ionViewWillLoad() {
    const comments = this.navParams.get('comments');
    console.log(comments);
  }

  closeModal(){
  	this.view.dismiss();
  }

}
