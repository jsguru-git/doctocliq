import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Shared } from '../../providers/shared';

/**
 * Generated class for the Searchbar1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-searchbar1',
  templateUrl: 'searchbar1.html',
})
export class Searchbar1Page {
  term: string = '';
  selectitem
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController ,  public shared: Shared) {
  }
 
 searchFn(ev: any) {
    this.term = ev.target.value;
  }
  choose(item){
  	this.view.dismiss(item);
  }
  closeModal(){
  	this.view.dismiss();
  }
}
