import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent} from './pages/nav-bar/nav-bar.component';
import { HomeComponent } from './pages/home/home.component';
import {FavoriteComponent} from './pages/favorite/favorite.component';
import {UploadvideoComponent} from './pages/uploadvideo/uploadvideo.component';
import {HistoryComponent} from './pages/history/history.component';
import {FollowsComponent} from './pages/follows/follows.component';
import {ProfileComponent} from './pages/profile/profile.component';
import { AuthGuard } from './server/auth-guard.service';

import {
  NbAuthComponent,
  NbLoginComponent,
  NbRegisterComponent,
  NbLogoutComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'pages',
    canActivate: [AuthGuard], // here we tell Angular to check the access with our AuthGuard
    loadChildren: './pages/pages.module#PagesModule'
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#NgxAuthModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
