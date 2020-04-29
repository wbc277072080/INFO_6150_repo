import { Component, OnInit } from '@angular/core';
import {NbAuthJWTToken, NbAuthService} from "@nebular/auth";
import {UserService} from "../../server/user.service";
import {User} from "../../models/User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.scss']
})
export class FollowsComponent implements OnInit {

  userid: string;
  profile: User;
  followers: User[] = [];
  followees: User[] = [];
  constructor(private authService: NbAuthService,
              private userService: UserService) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.userid = token.getPayload()._id; // here we receive a payload from the token and assigns it to our `user` variable
        }

      });

  }

  ngOnInit(): void {
    this.getUserFollows();
  }

  getUserFollows(): void {
    this.userService.getUserById(this.userid).subscribe(
      profile => profile.subscribe.forEach(
        user => this.userService.getUserById(user).subscribe(
          follower => this.followers.push(follower)
        ))
    );
    this.userService.getUserById(this.userid).subscribe(
      profile => profile.subscribed.forEach(
        user => this.userService.getUserById(user).subscribe(
          followee => this.followees.push(followee)
        )
      )
    );
  }

  Click(): void{

  }
}
