import { Component, ViewChild, ElementRef,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { Shared } from '../../providers/shared';
import { TranslateService } from '@ngx-translate/core';
 /**
 * Generated class for the MapPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare var google: any;
@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement:ElementRef;
  map:any;
  mapEle: any;
  infoWindows:any[];
  markers: any[];
  list: any[];
  price
  markerindex=0

  constructor(public navCtrl: NavController, public navParams: NavParams,public api: Api, public translateService:TranslateService
  ,public shared: Shared,public zone: NgZone) {
     this.list=this.navParams.get('list');
  }
  ionViewDidLoad() {
    this.shared.showLoading( this.translateService.instant('loading'))
    this.mapEle = this.mapElement.nativeElement;
    this.map = new google.maps.Map(this.mapEle, {
      // center: spaceData.find((d: any) => d.center),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      // streetViewControlOptions: {
      //   position: google.maps.ControlPosition.RIGHT_TOP
      // },
      // zoomControlOptions: {
      //   position: google.maps.ControlPosition.RIGHT_TOP
      // }
      zoomControl: false,
   rotateControl: false,
  fullscreenControl: false,
   scaleControl: false,
  streetViewControl: false, 
    });
    this.deleteMarkers();
    this.showMarker(this.list); 
  }
fristclick=0
  showMarker(Data: any) {    
      
    this.infoWindows = new Array(Data.length);
    this.markers = new Array(Data.length);
    let latlngbounds = new google.maps.LatLngBounds();
        for(var k = 0; k < Data.length; k++) {
          let marker_Data = Data[k];
           if(marker_Data.establishments.length>0){
             for(var i = 0; i < marker_Data.establishments.length; i++) {
            let markerData = marker_Data.establishments[i];
            this.price=''
            var windowcontent='<div style="float:left" ><img class="windowimg" src="'+ this.api.ImageUrl+marker_Data.image_profile +'"></div><div style="float:right; padding: 10px;"><b>'+ marker_Data.title+" "+marker_Data.last_name+'</b><br/>consulta: S/.'+this.price+'</div>'
            let infoWindow = new google.maps.InfoWindow({ content:windowcontent});
            marker_Data
            var markerLatLng = {lat: parseFloat(markerData.location.latitude), lng: parseFloat(markerData.location.longitude)};
            let marker = new google.maps.Marker({
              position: markerLatLng,
              map: this.map,
              title: marker_Data.title,
              icon: "assets/img/marker.jpeg"
            });
            this.markers[this.markerindex] = marker;
            latlngbounds.extend(new google.maps.LatLng(markerLatLng.lat, markerLatLng.lng));
            this.infoWindows[this.markerindex] = infoWindow;
            marker.addListener('click', () => { 
              if(this.fristclick>0){
                infoWindow.close()
              }else this.fristclick=this.fristclick+1
              this.closeAllInfoWindows();
              this.getprice(marker_Data,this.map, marker,infoWindow) 
            }); 
          // move position center of all markers and change zoom
          this.map.setCenter(latlngbounds.getCenter());
          this.map.fitBounds(latlngbounds);
          this.markerindex=this.markerindex+1
     } 
    }
    }
    this.shared.hideLoading()

  }
  
  getprice(item,map, marker,infoWindow ){ 
     this.zone.run(() => {
    this.shared.showLoading( this.translateService.instant('loading'))
    var seq = this.api.get(this.api.apiprice+item.id) 
    seq.map(res=> { return res.json(); }).subscribe(res=> {
      this.shared.hideLoading()
      if(res.length>0) this.price=res[0].price
      else this.price=''
       var windowcontent='<div style="float:left" ><img class="windowimg" src="'+ this.api.ImageUrl+item.image_profile +'"></div><div style="float:right; padding: 10px;"><b>'+ item.title+" "+item.last_name+'</b><br/>consulta: S/.'+this.price+'</div>'
        infoWindow = new google.maps.InfoWindow({ content:windowcontent});
        infoWindow.open(this.map, marker);
      }, err=> {
      this.shared.hideLoading()
      this.shared.ShowToast( this.translateService.instant('Failedloading') )
      console.error('ERROR', err);
    });
     });
  }

  deleteMarkers() {
    if(this.markers != null) {
      this.markers.forEach(function(marker){
        marker.setMap(null);
      }); 
      this.markers = [];
    }
  }
    closeAllInfoWindows() {
       for(let window of this.infoWindows) {
         window.close();
      }
   }


}
