import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {FavoriteComponent} from './favorite/favorite.component';
import {UploadvideoComponent} from './uploadvideo/uploadvideo.component';
import {HistoryComponent} from './history/history.component';
import {FollowsComponent} from './follows/follows.component';
import {ProfileComponent} from './profile/profile.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {OtherprofileComponent} from './otherprofile/otherprofile.component';
import {VideodetailComponent} from './videodetail/videodetail.component';
import {EditvideoComponent} from './profile/editvideo/editvideo.component';


const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'favorite', component: FavoriteComponent},
      {path: 'upload', component: UploadvideoComponent},
      {path: 'history', component: HistoryComponent},
      {path: 'follows', component: FollowsComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'details/:id', component: VideodetailComponent},
      {path: 'profile/:id', component: OtherprofileComponent},
      {path: 'updatevideo/:id', component: EditvideoComponent}
    ]
  }
  ,
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
