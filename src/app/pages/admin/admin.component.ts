import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { ApiSettings } from '../../model/api-settings';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../services/user.service';
import { StatisticsService } from '../../services/statistics.service';
import { Statistic } from '../../model/statistic';
import { FormControl, FormGroup } from '@angular/forms';
import { TweetService } from '../../services/tweet.service';
import { Tweet } from '../../model/tweet';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[];
  globalStatistic: Statistic;

  removeUsers: string[];
  removeUsersStatistic: Statistic;
  removeUsersProcessing: boolean;

  tweets: Tweet[];
  tweetRemovalForm: FormGroup;
  tweetRemovalProcessing: boolean;

  constructor(
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private tweetService: TweetService,
    private statisticService: StatisticsService
  ) { }

  ngOnInit() {
    this.users = [];
    this.removeUsers = [];
    this.globalStatistic = new Statistic(0, 0, 0, 0);
    this.removeUsersStatistic = new Statistic(0, 0, 0, 0);

    this.removeUsersProcessing = false;
    this.tweetRemovalProcessing = false;

    this.loadUsers();
    this.updateStatistic();
    this.initRemovalForm();
  }

  getImageUrl(part: string) {
    return this.sanitizer.bypassSecurityTrustUrl(ApiSettings.API_HOST + part);
  }

  addedToRemoveUsers(username: string): boolean {
    return this.removeUsers.includes(username);
  }

  addOrRemoveUsers(username: string) {
    if (this.addedToRemoveUsers(username)) {
      this.removeUsers.splice(this.removeUsers.indexOf(username), 1);
    } else {
      this.removeUsers.push(username);
    }

    if (this.removeUsers.length > 0) {
      this.updateRemoveUserStatistic();
    } else {
      this.cancelRemoveUsers();
    }
  }

  updateRemoveUserStatistic() {
    this.statisticService.getUserStatistic(this.removeUsers)
      .then(statistic => this.removeUsersStatistic = statistic)
      .catch(error => console.log(error));
  }

  cancelRemoveUsers() {
    if (this.removeUsersProcessing) {
      return;
    }

    this.removeUsers = [];
    this.removeUsersStatistic = new Statistic(0, 0, 0, 0);
  }

  removeSelectedUsers() {
    if (this.removeUsersProcessing) {
      return;
    }

    this.removeUsersProcessing = true;

    this.userService.removeUsers(this.removeUsers)
      .then(result => {
        this.updateStatistic();
        this.loadUsers();
        this.cancelRemoveUsers();
        this.initRemovalForm();
        this.removeUsersProcessing = false;
      }).catch(error => {
        console.log(error);
        this.removeUsersProcessing = false;
      });
  }

  removeSelectedTweets() {
    if (this.tweetRemovalProcessing) {
      return;
    }

    this.tweetRemovalProcessing = true;

    const tweets = [];
    Object.keys(this.tweetRemovalForm.controls).forEach(key => {
      if (this.tweetRemovalForm.get(key).value) {
        tweets.push(key);
      }
    });

    if (tweets.length > 0) {
      this.tweetService.removeBulk(tweets)
        .then(result => {
          this.updateStatistic();
          this.initRemovalForm();
          this.updateRemoveUserStatistic();
          this.tweetRemovalProcessing = false;
        }).catch(error => {
          console.log(error);
          this.tweetRemovalProcessing = false;
      });
    }
  }

  onUserCreation() {
    this.updateStatistic();
    this.loadUsers();
  }

  private loadUsers() {
    this.userService.getAll()
      .then(users => this.users = users)
      .catch(error => console.log(error));
  }

  private updateStatistic() {
    this.statisticService.getGlobalStatistic()
      .then(statistic => {
        const imagePercent = statistic.imageTweets / (statistic.tweets || 1);
        statistic.imageTweets = parseFloat(imagePercent.toFixed(2)) * 100;
        this.globalStatistic = statistic;
      })
      .catch(error => console.log(error));
  }

  private initRemovalForm() {
    this.tweetRemovalForm = new FormGroup({});

    this.tweetService.getAll()
      .toPromise()
      .then(tweets => {
        tweets.forEach((tweet) =>
          this.tweetRemovalForm.addControl(tweet.id, new FormControl()));
        this.tweets = tweets;
      })
      .catch(error => console.log(error));
  }

}
