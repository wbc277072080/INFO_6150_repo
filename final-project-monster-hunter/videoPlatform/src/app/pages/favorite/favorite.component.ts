import { Component, OnInit, Input } from '@angular/core';
import {NbMenuItem, NbMenuService ,NbCardModule} from '@nebular/theme';
import { ChangeDetectionStrategy } from '@angular/core';
import {Video} from '../../models/Video';
import {User} from '../../models/User';
import {Comment} from '../../models/Comment';
import {UserService} from '../../server/user.service';
import {VideoService} from '../../server/video.service';
import {ActivatedRoute} from '@angular/router';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { JsonpInterceptor } from '@angular/common/http';
import { DomPortal } from '@angular/cdk/portal';
import { DomSanitizer } from '@angular/platform-browser';
import {  Inject,  OnChanges, SimpleChanges } from "@angular/core";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {


  userid;
  profile: User;
  videos:Array<Video>;
  constructor(private authService: NbAuthService,
              private userService: UserService,
              private videoService : VideoService) {

                //init
                this.videos=new Array();


                this.authService.onTokenChange()
                  .subscribe((token: NbAuthJWTToken) => {

                    if (token.isValid()) {
                      this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
                    }

                  });
                }

                ngOnInit(): void {
                  this.getProfile();
                  //this.getHistory();
                }
                getProfile(){
                  this.userService.getUserById(this.userid).subscribe(user =>{
                    this.profile=user
                    this.profile.favorite.forEach((Item)=>{
                      this.videoService.getVideoById(Item).subscribe((fan)=>{
                        this.videos.push(fan);
                      })
                   })
                  }
                );
                console.log(this.videos)


                }

}
