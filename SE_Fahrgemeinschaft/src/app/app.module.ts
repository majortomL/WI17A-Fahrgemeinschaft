import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//firebase overall
import {AngularFireModule} from "@angular/fire";
//firebase Services
import { AngularFireAuthModule } from '@angular/fire/auth';
//Testing HTTP and JSON
import { HttpClientModule } from '@angular/common/http';
//for Firebase Config
import { environment} from "../environments/environment";
//firebase realtimedatabase
import { AngularFireDatabaseModule} from "@angular/fire/database";
//for Provider auth Guard
import { AuthTestGuard }from './guards/authtest.guard';
import { AgbComponent } from './component/agb/agb.component'
@NgModule({
  declarations: [AppComponent, AgbComponent],
  entryComponents: [AgbComponent],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(environment.fire),
      AngularFireAuthModule,
      AngularFireDatabaseModule,
      HttpClientModule,

  ],
  providers: [
    StatusBar,
    SplashScreen,
      AuthTestGuard,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
