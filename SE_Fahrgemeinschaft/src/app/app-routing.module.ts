import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'impressum', loadChildren: './impressum/impressum.module#ImpressumPageModule' },
  { path: 'openrouteservice', loadChildren: './openrouteservice/openrouteservice.module#OpenrouteservicePageModule' },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
