import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { OpenrouteservicePage } from './openrouteservice.page';

const routes: Routes = [
  {
    path: '',
    component: OpenrouteservicePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OpenrouteservicePage]
})
export class OpenrouteservicePageModule {}
