import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tweet } from '../model/tweet';
import { Observable } from 'rxjs/Observable';
import { ApiSettings } from '../model/api-settings';
import { HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class TweetService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  getAll(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(ApiSettings.API_HOST + '/api/tweets');
  }

  getTweetsForUsername(username: string) {
    return this.http.get<Tweet[]>(ApiSettings.API_HOST + '/api/tweets/' + username);
  }

  getTweetsForTimeline(username: string) {
    return this.http.get<Tweet[]>(
      ApiSettings.API_HOST + '/api/tweets/' + username + '/timeline',
      { headers: this.getAuthHeader() }
      );
  }

  postTweet(data: FormData): Promise<any> {
    return this.http.post(
      ApiSettings.API_HOST + '/api/tweets',
      data,
      { headers: this.getAuthHeader() }
      )
      .toPromise();
  }

  deleteTweet(id: string): Promise<any> {
    let params = new HttpParams();
    params = params.append('tweets', id);

    return this.http.delete(
      ApiSettings.API_HOST + '/api/tweets',
      {
        headers: this.getAuthHeader(),
        params: params
      })
      .toPromise();
  }

  removeAll(username: string): Promise<any> {
    return this.http.delete(
      ApiSettings.API_HOST + '/api/tweets/' + username,
      { headers: this.getAuthHeader() }
      ).toPromise();
  }

  removeBulk(tweets: string[]) {
    let params = new HttpParams();
    params = params.append('tweets', tweets.toString());

    return this.http.delete(
      ApiSettings.API_HOST + '/api/tweets',
      {
        headers: this.getAuthHeader(),
        params: params
      })
      .toPromise();
  }

  public getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers.append('Authorization', this.localStorageService.getJwtToken());
  }
}
