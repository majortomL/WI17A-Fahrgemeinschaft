import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthTestGuard } from './guards/authtest.guard';
const routes: Routes = [
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'impressum', loadChildren: './impressum/impressum.module#ImpressumPageModule' },
  { path: 'login', loadChildren: './login/login.module#LogInPageModule' },
  { path: 'registration', loadChildren: './registration/registration.module#RegistrationPageModule' },
  { path: 'welcome', loadChildren: './welcome/welcome.module#WelcomePageModule' },
  { path: '', loadChildren: './home/home.module#HomePageModule' },
//, canActivate: [AuthTestGuard]
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'impressum', loadChildren: './impressum/impressum.module#ImpressumPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
