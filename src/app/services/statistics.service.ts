import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Statistic } from '../model/statistic';
import { ApiSettings } from '../model/api-settings';

@Injectable()
export class StatisticsService {

  constructor(private http: HttpClient) { }

  getGlobalStatistic(): Promise<Statistic> {
    return this.http.get<Statistic>(ApiSettings.API_HOST + '/api/statistics/global')
      .toPromise();
  }

  getUserStatistic(users: string[]): Promise<Statistic> {
    let params = new HttpParams();
    params = params.append('users', users.toString());

    return this.http.get<Statistic>(
      ApiSettings.API_HOST + '/api/statistics/users',
      { params: params }
      ).toPromise();
  }

}
