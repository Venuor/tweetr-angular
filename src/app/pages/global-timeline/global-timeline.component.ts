import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tweet } from '../../model/tweet';
import { TweetService } from '../../services/tweet.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-global-timeline',
  templateUrl: './global-timeline.component.html',
  styleUrls: ['./global-timeline.component.css']
})
export class GlobalTimelineComponent implements OnInit, OnDestroy {
  tweets: Tweet[] = [];
  subscription: Subscription;

  constructor(private tweetService: TweetService) {
  }

  ngOnInit() {
    this.tweets = [];
    this.subscription = this.tweetService.getAll().subscribe(tweets => this.tweets = tweets);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
