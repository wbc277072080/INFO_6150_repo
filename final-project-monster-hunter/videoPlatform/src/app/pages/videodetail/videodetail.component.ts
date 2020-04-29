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
  selector: 'app-videodetail',
  //changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './videodetail.component.html',
  styleUrls: ['./videodetail.component.scss']
})
export class VideodetailComponent implements OnInit{
// button clicked
likeClicked =false;
favoriteClicked =false;
followClicked =false;


likedVideo: Video[] = [];
followers: User[] = [];

//comment text
commentTxt : string;

//video Id
videoId:string;

//video
video:Video;

//user
userid;
user:User;
author:User;
authorid;
authorname:string;

//video-url
videoUrl:string;

//comment-list
comments:Comment[];

//video-list
videos:Video[];

favorite: Video[] = [];

change: boolean;

//history
historys:Video[] = [];


  constructor(private videoService: VideoService,
              private userService: UserService,
              private route: ActivatedRoute,
              private authService: NbAuthService,
              private sanitizer: DomSanitizer) {

                //video-list
                this.videos=new Array();

                //video
                this.video=new Video("","","","");

                //user
                //this.user=new User();

                //safeurl
                this.videoUrl="";

                this.favorite=new Array();

                this.comments=new Array();

                this.historys=new Array();
                this.videoId="";
                this.authorid=""

                this.change = false;

                //console.log(this.video.id);
                //get userid
                authService.onTokenChange()
                    .subscribe((token: NbAuthJWTToken) => {

                      if (token.isValid()) {
                        this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
                      }

                    });
                // get the authorid of this video
                this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
                  video => this.videoService.getAuthor(video).subscribe(
                    author => {
                    this.authorid=author.id,
                    this.authorname=author.username

                    }
                  )
                );

               }

  ngOnInit(): void {

    this.getReadyData();
    //this.getReadyButton();
    //this.getVideo();
    //this.getProfile();

  }

  getReadyData(): void{

    //get the user now
    this.userService.getUserById(this.userid).subscribe(
      user => this.user=user
    )

    //get the video url
    this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
      video => this.videoUrl=this.videoService.getVideoURL(video.url)
    )


    // get the favorite video list from profile
    this.userService.getUserById(this.userid).subscribe(
      user => user.favorite.forEach(
            video =>  this.favorite.push(video))
      );

    // get the liked video list from profile
    this.userService.getUserById(this.userid).subscribe(
      user => user.liked.forEach(
        video => this.likedVideo.push(video)
      )
    );

    // get the follower list from profile
    this.userService.getUserById(this.userid).subscribe(
      user => user.subscribe.forEach(
        follower => this.followers.push(follower)
      )
    );


    // get the author of this video
    this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
      video => this.videoService.getAuthor(video).subscribe(
        author => {
        this.author = author
        //this.authorid=author.id
        }
      )
    );

    // get the video from route
    this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
      video => this.video = video
    );

    // get all of the video from author
    this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
      profilevideo => this.videoService.getAuthor(profilevideo).subscribe(
        author => this.videoService.getAllVideosFromAuthor(author.id).subscribe(
          videos => videos.forEach(
            video => this.videos.push(video)
          )
        )
      )
    );

    // update history
    this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
      video => this.userService.unpdateHistory(video).toPromise().then()
    );

    //comments
    this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
      video=>video.comments.forEach((Item)=>{
        this.comments.push(Item)
      })
    )

    //init button
    //like
    this.videoService.getVideoById(this.route.snapshot.paramMap.get('id')).subscribe(
      video => {
        if(video.like.includes(this.userid)){
          this.likeClicked=true;
        }
        else{
          this.likeClicked=false;
        }
      }
    );

    //favorite
    this.userService.getUserById(this.userid).subscribe(
      user=>{
        if(user.favorite.includes(this.route.snapshot.paramMap.get('id'))){
          this.favoriteClicked=true;
        }
        else{
          this.favoriteClicked=false;
        }
      }
    )

    //follows
    this.userService.getUserById(this.userid).subscribe(
      user => {
        //console.log("auth",this.authorid)
        if(user.subscribe.includes(this.authorid)){
          this.followClicked=true;
        }
        else{
          this.followClicked=false;
        }
      }
      );





  }

  // getReadyButton(): void{
  //   //init button
  //   if (this.favorite.includes(this.video)){
  //     this.favoriteClicked = true;
  //   } else{
  //     this.favoriteClicked = false;
  //   }

  //   if(this.likedVideo.includes(this.video)){
  //     this.likeClicked = true;
  //   } else{
  //     this.likeClicked = false;
  //   }

  //   if(this.followers.includes(this.author)){
  //     this.followClicked = true;
  //   } else {
  //     this.followClicked = false;
  //   }
  // }

  // getVideo(){
  //   console.log(this.videoId)
  //   this.route.url.subscribe(url=>{this.videoId=url[1].toString()});

  //   this.videoService.getVideoById(this.videoId).subscribe(video =>{
  //     this.video=video,console.log(this.video),
  //     this.videoUrl=this.videoService.getVideoURL(video.url),
  //     console.log(this.videoUrl)
  //     this.userService.unpdateHistory(this.video).toPromise().then()
  //     console.log("update history",this.video)

  //     //get author of video
  //     this.videoService.getAuthor(video).subscribe(auth=>{
  //       this.author=auth;
  //     })
  //     video.comments.forEach((Item)=>{
  //       this.comments.push(Item)
  //     })
  //     //init button
  //                 if(video.like.includes(this.userid)){
  //                   this.likeClicked=true;
  //                 }
  //                 else{
  //                   this.likeClicked=false;
  //                 }

  //   }
  //   );

  // }


  // getProfile(){
  //   this.userService.getUserById(this.userid).subscribe(user =>{
  //     this.user=user,
  //     //add favorite to list
  //     this.user.favorite.forEach((Item)=>{
  //       this.favorite.push(Item)
  //     }),

  //     //add video of user
  //     this.user.videos.forEach((Item)=>{
  //        this.videoService.getVideoById(Item).subscribe((fan)=>{
  //         if(!this.videos.includes(fan)) {
  //           this.videos.push(fan);
  //         }

  //        })
  //     })
  //     //init button
  //     if(user.favorite.includes(this.videoId)){
  //       this.favoriteClicked=true;
  //     }
  //     else{
  //       this.favoriteClicked=false;
  //     }
  //     //console.log(this.videos)
  //     //console.log(this.author.id)
  //     //if(user.subscribe.includes(this.author))
  //   }



  // );
  // }

  addComment(){
    var newComment={
      id: "",
      txt: this.commentTxt,
      videoId: this.videoId,
      createDate: new Date(),
      auth: this.user.username,
    };
    console.log(this.video.comments)

    this.video.comments.push(newComment);
    this.commentTxt='';
    this.comments.push(newComment);

    //update database
    this.videoService.updateVideo(this.video)
      .subscribe(video =>{
        this.video = video;
        this.video.comments=video.comments;
      });


  }

  likeClick(){
    console.log(this.likeClicked)

    if(!this.likeClicked){
      if(!this.video.like.includes(this.userid)){
        this.video.like.push(this.userid);
        this.userService.likeVideo(this.video).toPromise().then()
      }

      //update database
      this.videoService.updateVideo(this.video)
      .subscribe(video =>{

        this.video = video;
      });


    }
    else if(this.likeClicked){
      for(var i=0;i<this.video.like.length;i++){
        if(this.video.like[i]==this.userid){
          this.video.like.splice(i,1);
          this.userService.unlikeVideo(this.video).toPromise().then()

        }
      }

      //update database
      this.videoService.updateVideo(this.video)
      .subscribe(video =>{
        this.video = video;

      });
      //console.log(this.video.like);

    }
    this.likeClicked =!this.likeClicked;
  }

  //click favorite btn
  favoriteClick(){
    //console.log("before",this.user.favorite);

    if(!this.favoriteClicked){

      var user = this.user;
      if(!this.favorite.includes(this.video)){
        //user.favorite.push(this.videoId);
        this.userService.setFavoriteVideo(this.video).toPromise().then()
        console.log(this.favorite)

      }

    }
    else if(this.favoriteClicked){
      this.userService.unFavoriteVideo(this.video).toPromise().then()
      console.log(this.favorite)
    }


  }
  addFollow(){
    //var author:User;

    if(!this.followClicked){
    this.userService.subscribeUser(this.author).toPromise().then()

    }
    else if(this.followClicked){

    this.userService.unSubscribeUser(this.author).toPromise().then()
    }
  }
}
