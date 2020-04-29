import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../server/user.service";
import {VideoService} from "../../server/video.service";
import {Video} from "../../models/Video";

@Component({
  selector: 'app-otherprofile',
  templateUrl: './otherprofile.component.html',
  styleUrls: ['./otherprofile.component.scss']
})
export class OtherprofileComponent implements OnInit {
  profile: User;
  followClicked = true;
  videos: Video[] = [];

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              public videoService: VideoService) { }

  ngOnInit(): void {
    this.getUser();
    this.getVideos();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUserById(id).subscribe(profile => this.profile = profile);
  }

  getVideos(): void {
    this.videoService.getAllVideosFromAuthor(this.route.snapshot.paramMap.get('id')).subscribe(
      videos => videos.forEach(video => this.videos.push(video))
    );
  }


  addFollow(): void{
    if (!this.followClicked) {
      this.userService.subscribeUser(this.profile).toPromise().then();

    } else {
      this.userService.unSubscribeUser(this.profile).toPromise().then()
    }
  }

}
