import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthDataProvider } from "../providers/auth-data/auth-data";

import firebase from "firebase";

//import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LandingPage';
  zone: NgZone;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public authData: AuthDataProvider) {
    firebase.initializeApp({
      apiKey: "AIzaSyB366wcu8UhGuqGof3f0a-SiQTvFYdwDf4",
    authDomain: "myapp-cccce.firebaseapp.com",
    databaseURL: "https://myapp-cccce.firebaseio.com",
    projectId: "myapp-cccce",
    storageBucket: "myapp-cccce.appspot.com",
    messagingSenderId: "558638845078"
    });

    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      console.log('onAuthStateChanged');
      this.zone.run(() => {
        if (!user) {
          this.rootPage = 'LandingPage';
          unsubscribe();
        } else {
          this.rootPage = 'HomePage';
          unsubscribe();
        }
      });
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

