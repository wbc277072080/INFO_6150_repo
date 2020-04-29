import { Component, OnInit } from '@angular/core';
import {NB_STEPPER, NbStepperComponent} from '@nebular/theme';
import {VideoService} from '../../server/video.service';
import {Video} from '../../models/Video';
import {NbAuthJWTToken, NbAuthService} from '@nebular/auth';
import {UserService} from '../../server/user.service';
import {User} from '../../models/User';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Comment} from '../../models/Comment';
import {Tags} from '../../models/Tags';

@Component({
  selector: 'app-uploadvideo',
  templateUrl: './uploadvideo.component.html',
  styleUrls: ['./uploadvideo.component.scss'],
  providers: [{ provide: NB_STEPPER, useExisting: NbStepperComponent }],
})
export class UploadvideoComponent implements OnInit {
  form: any;
  video: Video;
  userid: string;
  profile: User;
  videoTitle: string;
  videoUrl: string;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  comments: Comment[];
  tags = Tags;
  constructor(private videoService: VideoService,
              private authService: NbAuthService,
              private userService: UserService,
              private formBuilder: FormBuilder) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
        }

      });
    this.userService.getUserById(this.userid).subscribe(profile => this.profile = profile);
    this.video = new Video('', '', '', '');
  }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      url: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      title: ['', Validators.required],
      tag: ['', Validators.required],
      description: ['']
    });
  }

  step1next() {
    if (this.getYoutubeURL(this.firstFormGroup.value.url)) {
      this.video.auth = this.profile.id;
      this.video.comments = this.comments;
      // this.nbStepperComponent.next();
    }
    console.log(this.tags);
  }

  step2next() {
    this.video.title = this.secondFormGroup.value.title;
    this.video.tag = this.secondFormGroup.value.tag;
    this.video.description = (this.secondFormGroup.value.description === undefined ? 'none' : this.secondFormGroup.value.description);
    this.video.comments=new Array()
    this.videoService.uploadVideo(this.video).subscribe();
  }

  getYoutubeURL(url: string): boolean {
    if (url !== undefined ) {
      const temp = url.replace('https://www.youtube.com/watch?v=', '');
      if (temp === null) { return false; }
      this.video.url = temp;
      return true;
    }
    return false;
  }

}
