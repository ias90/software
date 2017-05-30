import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  limit: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.limit = localStorage.getItem('limit');
  }

  ionViewWillLeave() {
    localStorage.setItem('limit', this.limit);
  }
}
