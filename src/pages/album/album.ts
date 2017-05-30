import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {SpotifyService} from "../../providers/spotify.service";

@Component({
  selector: 'page-album',
  templateUrl: 'album.html'
})
export class AlbumPage {
  album: any;
  albumId: string;
  loader: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private spotify: SpotifyService,
              private loadingCtrl: LoadingController) {
    this.albumId = this.navParams.data.albumId;
  }

  ionViewDidLoad(){
    this.loader = this.loadingCtrl.create();
    this.loader.present();
  }

  ionViewWillEnter() {
    this.spotify.getAlbum(this.albumId)
      .subscribe(res => {
        this.album = res;
        this.loader.dismiss();
        console.log(this.album);
      });
  }
}
