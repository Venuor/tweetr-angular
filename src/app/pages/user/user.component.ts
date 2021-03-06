import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TweetService } from '../../services/tweet.service';
import { Tweet } from '../../model/tweet';
import { Subscription } from 'rxjs/Subscription';
import { UserService } from '../../services/user.service';
import { User } from '../../model/user';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SocialGraph } from '../../model/social-graph';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  tweets: Tweet[];
  user: User;
  socialGraph: SocialGraph;

  loggedInUser: User;
  showButton: boolean;
  isFollowing: boolean;
  showRemove: boolean;

  tweetForm: FormGroup;
  @ViewChild('image') tweetImage: ElementRef;
  fileName: string;
  tweetProcessing: boolean;

  private paramSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tweetService: TweetService,
    private userService: UserService,
    private titleService: Title,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.tweetProcessing = false;
    this.tweets = [];
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      const username = params.get('username');
      this.getTweets(username);
      this.getUser(username);
      this.getSocialGraphData(username);
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
    if (this.tweetProcessing) {
      return;
    }

    this.tweetProcessing = true;

    const formData = new FormData();
    formData.append('text', this.tweetForm.get('text').value);
    formData.append('image', this.tweetForm.get('image').value);

    this.tweetService.postTweet(formData)
      .then(result => {
        this.tweetForm.get('text').setValue('');
        this.tweetForm.get('image').setValue('');
        this.tweetImage.nativeElement.value = '';
        this.fileName = '';
        this.getTweets(this.user.username);
        this.tweetProcessing = false;
      })
      .catch(error => {
        this.tweetProcessing = false;
        this.handleError(error);
      });
  }

  updateUser() {
    this.getUser(this.user.username);
  }

  removeTweet($event) {
    this.tweetService.deleteTweet($event)
      .then(result => {
        this.getTweets(this.user.username);
      })
      .catch(error => {
        this.handleError(error);
      });
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

  private getSocialGraphData(username) {
    this.userService.getSocialGraph(username)
      .then(graph => {
        this.socialGraph = graph;
      }).catch(err => console.log(err));
  }

  private handleError(error: any) {
    if (error.error && error.error.statusCode === 401) {
      this.getUser(this.user.username);
      this.userService.logout();
    }

    console.log(error);
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }
}
