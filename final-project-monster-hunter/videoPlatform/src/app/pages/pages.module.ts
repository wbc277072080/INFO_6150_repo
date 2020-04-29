import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MatDatepickerModule } from '@angular/material/datepicker';

import { PagesRoutingModule } from './pages-routing.module';
import {
  NB_STEPPER,
  NbActionsModule, NbButtonModule, NbCardModule,
  NbContextMenuModule, NbDatepickerModule,
  NbIconModule, NbInputModule,
  NbLayoutModule, NbMenuModule, NbOptionModule, NbSelectModule, NbStepperComponent,
  NbStepperModule, NbTabsetModule, NbToggleModule,
  NbUserModule
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import {FavoriteComponent} from './favorite/favorite.component';
import {FollowsComponent} from './follows/follows.component';
import {HistoryComponent} from './history/history.component';
import {HomeComponent} from './home/home.component';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {UploadvideoComponent} from './uploadvideo/uploadvideo.component';
import {VideodetailComponent} from './videodetail/videodetail.component';
import { OtherprofileComponent } from './otherprofile/otherprofile.component';
import {SafePipe} from './pipe/SafePipe';
import { EditvideoComponent } from './profile/editvideo/editvideo.component';


@NgModule({
  declarations: [
    ProfileComponent,
    FavoriteComponent,
    FollowsComponent,
    HistoryComponent,
    HomeComponent,
    NavBarComponent,
    UploadvideoComponent,
    VideodetailComponent,
    OtherprofileComponent,
    SafePipe,
    EditvideoComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbEvaIconsModule,
    NbActionsModule,
    NbIconModule,
    NbUserModule,
    NbContextMenuModule,
    NbStepperModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbTabsetModule,
    NbSelectModule,
    NbOptionModule,
    NbDatepickerModule.forRoot(),
    NbCardModule,
    NbToggleModule,
    FormsModule,
    NbInputModule,
    // MatDatepickerModule
  ],
  exports: [
    SafePipe
  ]
})
export class PagesModule { }
