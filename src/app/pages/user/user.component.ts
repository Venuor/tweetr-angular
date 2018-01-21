import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from '../../services/tweet.service';
import { Tweet } from '../../model/tweet';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  tweets: Tweet[];
  user: User;
  loggedInUser: User;
  showButton: boolean;
  isFollowing: boolean;
  showRemove: boolean;
  tweetForm: FormGroup;
  fileName: string;

  private paramSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tweetService: TweetService,
    private userService: UserService,
    private titleService: Title,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.tweets = [];
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      const username = params.get('username');
      this.getTweets(username);
      this.getUser(username);
    });
  }

  updateFileDisplay($event) {
    const file = $event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.tweetForm.get('image').setValue(file);
    } else {
      this.fileName =  '';
      this.tweetForm.get('image').setValue(null);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('text', this.tweetForm.get('text').value);
    formData.append('image', this.tweetForm.get('image').value);

    this.tweetService.postTweet(formData)
      .then(result => {
        this.tweetForm.reset();
        this.fileName = '';
        this.getTweets(this.user.username);
      })
      .catch(this.handleError);
  }

  updateUser() {
    this.getUser(this.user.username);
  }

  removeTweet($event) {
    this.tweetService.deleteTweet($event)
      .then(result => this.getTweets(this.user.username))
      .catch(this.handleError);
  }

  private getUser(username: string) {
    this.userService.getUser(username)
      .toPromise()
      .then(user => {
        this.user = user;
        this.titleService.setTitle('Tweetr - ' + user.displayname);
        this.getLoggedInUser();
      })
      .catch(err => console.log(err));
  }

  private getLoggedInUser() {
    this.userService.getLoggedInUser()
      .then(loggedInUser => {
        this.showButton = loggedInUser !== null && loggedInUser.username !== this.user.username;
        this.loggedInUser = loggedInUser;
        this.showRemove = !this.showButton;

        if (this.showButton) {
          this.isFollowing = this.user.subscribers.includes(loggedInUser.username);
        } else if (this.loggedInUser) {
          this.tweetForm = this.fb.group( {
            text: ['', [
              Validators.required,
              Validators.minLength(1),
              Validators.maxLength(140)
            ]],
            image: ''
          });
        }
      })
      .catch(err => {
        this.showButton = false;
        this.loggedInUser = null;
        this.showRemove = false;
      });
  }

  private getTweets(username: string) {
    this.tweetService.getTweetsForUsername(username)
      .toPromise()
      .then(tweets => this.tweets = tweets);
  }

  private handleError(error: any) {
    if (error.error.statusCode === 401) {
      this.getUser(this.user.username);
      this.userService.logout();
    }

    console.log(error);
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
