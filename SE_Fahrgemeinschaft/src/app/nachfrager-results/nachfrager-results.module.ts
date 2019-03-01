import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NachfragerResultsPage } from './nachfrager-results.page';

const routes: Routes = [
  {
    path: '',
    component: NachfragerResultsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NachfragerResultsPage]
})
export class NachfragerResultsPageModule {}
