import { Component, OnInit, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { UserService } from '../../server/user.service';
import { VideoService } from '../../server/video.service';
import { ActivatedRoute } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Video } from 'src/app/models/Video';
import { User } from 'src/app/models/User';
//import { url } from 'inspector';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('file1') file: ElementRef;


  Arr = Array.from(
    {length: Math.floor(Math.random() * 10)},
    (item, index) => {
      return {number: index, edit: false};
    }
  );

  tabs = [
    'User Info',
    'My Video',
    'Liked',
    'Subscription',
  ];
  tabKey = 'My Video';
  tabKeyL = 'Liked';
  tabKeyS = 'Subscription';
  tabKeyU = 'User-Info'

  buttonText = '';
  fileArr = [];

  userid: string;
  // videourl: string;
  video:Video;

  user: User;
  videoid: string;
  videos: Array<Video> = [];//my video
  // videoIds: Array<string>;
  likes: Video[]=[]; //likes 后面声明
  // realsub: Array<User>;
  sub: Video[] = [];//看情况
  videoAuthors = new Map<string, User>();

  requestId: string;

  // picFile:File;

  constructor(private renderer: Renderer2,
              private authService: NbAuthService,
              private userService: UserService,
              public videoService: VideoService,
              private route:ActivatedRoute) {
    // this.sub =new Array();
    // this.videos =new Array(); //my video
    // this.likes = new Array(); //likes声明数组 找like的video
    //this.videourl = this.videoService.getVideoImgURL(this.video.url);
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.requestId = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
          console.log(this.requestId);
        }
      });
      this.userService.getUserById(this.requestId).subscribe(
        profile => this.user = profile
      );
  }



  ngOnInit(): void {
    this.getDataReady();
  }

  getDataReady(): void {
    // get all videos made by user
    this.userService.getUserById(this.requestId).subscribe(
      profile => profile.videos.forEach(
        videoid => this.videoService.getVideoById(videoid).subscribe(
          video => {
            if(video !== null && video !== undefined) {this.videos.push(video); }
          }
        )
      )
    );

    // get all videos liked by user
    this.userService.getUserById(this.requestId).subscribe(
      profile => profile.liked.forEach(
        videoid => this.videoService.getVideoById(videoid).subscribe(
          video => {
            if (video !== null && video !== undefined) {this.likes.push(video); }
          }
        )
      )
    );

    // get all users followed by user
    this.userService.getUserById(this.requestId).subscribe(
      profile => profile.subscribe.forEach(
        userid => this.userService.getUserById(userid).subscribe(
          user => user.videos.forEach(
            videoid => this.videoService.getVideoById(videoid).subscribe(
              video => {
                if (video !== undefined && video !== null) {
                  this.sub.push(video);
                  this.videoAuthors.set(video.id, user);
                }
              }
            )
          )
        )
      )
    );

  }




  setKey(event) {
    this.tabKey = event.tabTitle;

    this.Arr = Array.from(
      { length: Math.floor(Math.random() * 10) },
      (item, index) => {
        return {number: index, edit : false};
      }
    );
    switch (event.tabTitle) {
      case 'My Video':
        this.buttonText = 'Delete Video';
        break;
      case 'Liked':
        this.buttonText = 'Unlike';
        break;
      case 'Subscription':
        this.buttonText = 'Unsubscribe';
        break;
      default:
        this.buttonText = '';
    }
  }

  //save the user info that updated by user
  onSave() {
    this.userService.updateUser(this.user).subscribe();
    //save alert once save successfully
    alert('Save SUCCESSFULLY');
  }

  deleteItem(){
    
    this.Arr.forEach((item) => (item.edit = true));
    //  var deleteitem = confirm('Delete?')
    //  if(deleteitem){
    this.videoService.deleteVideo(this.video).subscribe();

    //}
    //window.location.assign('');
  }

  del(event, index) { 
    event.stopPropagation();
    this.Arr.splice(index, 1);
  }

  //local files open (prepare for upload)
  upload1(){
      this.file.nativeElement.click();
    }

  //upload profile image
  upload(){

    var file: File = this.fileArr.pop()
    var form = new FormData()
    form.append("file", file)
    this.userService.uploadProfileImg(form).toPromise().then();


   }




  editFlag: boolean = false;
  editStatus(){
    this.editFlag = true;
  }

  pageID = "home";
  //pageID = "My Video";
  videoData = {title: "123", edit: true, number: 1};
  toEdit(data) {
    if (!this.editFlag || this.tabKey !== 'My Video') return;
    this.pageID = "edit";
    this.videoData = data;
    console.log(this.videoData);
  }

  returnHome(){
    this.pageID = 'home';
    this.editFlag = false;
  }

  editSAVE() {
    // this.pageID = "edit";
    alert('Save SUCCESSFULLY');
  }

  //Add listener
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.renderer.listen(this.file.nativeElement, "change", (event) => {
      console.log(event);
      let files = event.target.files;
      this.fileArr = [];
      for(let index = 0; index < files.length; index++) {
        const file = files[index];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (e) {
          file.url = this.result;
        };
        this.fileArr.push(file);
      }
      console.log(this.fileArr);
      this.file.nativeElement.value = "";
  });
  }
}
