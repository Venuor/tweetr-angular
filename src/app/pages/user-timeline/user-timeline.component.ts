import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import { Title } from '@angular/platform-browser';
import { Tweet } from '../../model/tweet';
import { TweetService } from '../../services/tweet.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {
  user: User;
  tweets: Tweet[];

  constructor(
    private userService: UserService,
    private titleService: Title,
    private tweetService: TweetService,
    private router: Router,
    private local: LocalStorageService
  ) { }

  ngOnInit() {
    this.tweets = [];

    this.userService.getLoggedInUser()
      .then(user => {
        this.user = user;
        this.titleService.setTitle('Tweetr - ' + user.displayname + '\'s Timeline');

        return this.tweetService.getTweetsForTimeline(user.username).toPromise();
      })
      .then(tweets => this.tweets = tweets)
      .catch(err => this.handleError(err));
  }

  private handleError(error: any) {
    console.log(this.local.getJwtToken());
    if (error.error.statusCode === 401) {
      this.userService.logout();
      this.router.navigate(['login']);
    }

    console.log(error);
  }

}
