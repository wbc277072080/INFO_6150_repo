import { Component, OnInit } from '@angular/core';
import {UserService} from '../../server/user.service';
import {User} from '../../models/User';
import {Video} from '../../models/Video';
import {SafePipe} from '../pipe/SafePipe';
import {Tags} from '../../models/Tags';
import {VideoService} from '../../server/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  tags = Tags;
  videoList = new Map<string, Video[]>();
  userList = new Map<string, User>();
  videoListKeys = [];
  userListKeys;

  // url = 'https://www.youtube.com/embed/3yxNUbYZEWU';
  // videoList: Array<Array<Video>> = [];

  constructor(public userService: UserService, public videoService: VideoService) {
  }


  ngOnInit(): void {
    this.getvideos();
  }

  getvideos(): void {
    for (let i = 0 ; i < this.tags.length; i++) {
      this.videoService.getVideoByTag(this.tags[i]).subscribe(
        videos => {
          if (videos !== undefined) {
            this.videoList.set(this.tags[i], videos);
            this.videoListKeys.push(this.tags[i]);
            videos.forEach(
              video => this.userService.getUserById(video.auth).subscribe(
                user => this.userList.set(video.id, user)
              )
            );
          }
        }
      );
    }
  }
}
