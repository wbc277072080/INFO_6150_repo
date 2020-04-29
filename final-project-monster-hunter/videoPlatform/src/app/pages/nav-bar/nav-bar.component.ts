import { Component, OnInit } from '@angular/core';
import {NbMenuItem, NbMenuService} from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import {User} from '../../models/User';
import {UserService} from '../../server/user.service';
import {Video} from '../../models/Video';
import {VideoService} from '../../server/video.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  item: NbMenuItem[] = [
    {
      title: 'profile',
      link: '/pages/profile'
    },
    {
      title: 'history',
      link: '/pages/history'
    },
    { title: 'logout',
      link: '/auth/logout'}
    ];

  userid;
  profile: User;
  user1: User;
  user2: User;
  video: Video;
  videos: Video[];

  constructor(private authService: NbAuthService, private userService: UserService, private videoService: VideoService) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
        }

      });

    // console.log(this.userid);
    userService.getUserById(this.userid).subscribe(profile => this.profile = profile);
    // console.log(this.profile);
  }

  ngOnInit(): void {
  }


  subuser() {
    // console.log(`user2: ${this.user2.id}`);
    // // this.userService.getUserById('5e992c9b5a991c1bba3418b7').subscribe(user2 => this.user2 = user2);
    // this.userService.unSubscribeUser(this.user2).subscribe(profile => this.profile = profile);
    // this.video = new Video(this.profile.id, 'this is my description', 'this should be the url');
    // this.videoService.uploadVideo(this.video).subscribe(
    //   vidoe => this.video = vidoe
    // );
    //
    // this.videoService.getAuthor(this.video).subscribe(user => console.log(`author id: ${user.id}`));
    console.log(this.video);
    //this.videoServmace.getAllVideosFromAuthor(this.video).subscribe(videos => this.videos = videos);

  } 
  fun2() {
    // this.videoService.getVideoById(`5e9b614b198a1424dda0c1e2`).subscribe(video => this.video = video);
    console.log(this.video);
    console.log(this.videos);

    // this.userService.unSubscribeUser(this.user2).subscribe();
    // this.videoService.deleteVideo(this.video).subscribe();
    console.log(this.profile);

  }

}
