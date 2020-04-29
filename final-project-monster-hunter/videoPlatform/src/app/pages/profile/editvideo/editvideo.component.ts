import { Component, OnInit } from '@angular/core';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {VideoService} from '../../../server/video.service';
import {UserService} from '../../../server/user.service';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Video} from '../../../models/Video';
import {User} from '../../../models/User';
import {Location} from '@angular/common';

@Component({
  selector: 'app-editvideo',
  templateUrl: './editvideo.component.html',
  styleUrls: ['./editvideo.component.scss']
})
export class EditvideoComponent implements OnInit {

  userid: string;
  video: Video;
  profile: User;
  constructor(private authService: NbAuthService,
              public videoService: VideoService,
              private userService: UserService,
              private location: Location,
              private route: ActivatedRoute) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
        }

      });
  }

  ngOnInit(): void {
    this.getDataReady();
  }

  getDataReady(): void {
    this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
      video => this.video = video
    );
    this.userService.getUserById(this.userid).subscribe(
      profile => this.profile = profile
    );

  }

  //save function that save the title and description after edit
  save(): void {
    this.videoService.updateVideo(this.video).subscribe();
    alert('Save SUCCESSFULLY');
    this.location.back();
  }


  //delete the video that user do not want anymore
  delete(): void {
    this.profile.videos = this.profile.videos.filter( v => v !== this.route.snapshot.paramMap.get('id'));
    console.log(this.profile);
    this.userService.updateUser(this.profile).subscribe();
    // this.videoService.deleteVideo(this.video).subscribe();
    var deleteitem = confirm('Delete?')
      if(deleteitem){
        this.videoService.deleteVideo(this.video).subscribe();
        alert('Delete SUCCESSFULLY');
      }
    this.location.back();
  }
}
