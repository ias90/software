import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {TrackPage} from "../track/track";

@Component({
  selector: 'page-playlist',
  templateUrl: 'playlist.html'
})
export class PlaylistPage {
  tracks: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {
  }

  ionViewWillEnter() {
    this.storage.get('playlist')
      .then(val => {
        this.tracks = val;
      });
  }

  showMore(track) {
    this.navCtrl.push(TrackPage, {
      track: track
    });
  }

  removeFromPlaylist(track) {
    let foundTrackIndex = this.tracks.findIndex(item => item.id === track.id);
    this.tracks.splice(foundTrackIndex, 1);
    this.storage.set('playlist', this.tracks);
  }
}
