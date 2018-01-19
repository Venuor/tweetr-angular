import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tweet } from '../model/tweet';
import { Observable } from 'rxjs/Observable';
import { ApiSettings } from '../model/api-settings';

@Injectable()
export class TweetService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>(ApiSettings.API_HOST + '/api/tweets');
  }
}
