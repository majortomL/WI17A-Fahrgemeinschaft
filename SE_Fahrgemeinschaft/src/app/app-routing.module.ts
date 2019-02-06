import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'impressum', loadChildren: './impressum/impressum.module#ImpressumPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'slider', loadChildren: './slider/slider.module#SliderPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
