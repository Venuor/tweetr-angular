import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiSettings } from '../model/api-settings';
import { User } from '../model/user';
import { LocalStorageService } from './local-storage.service';
import { Token } from '../model/token';

@Injectable()
export class UserService {
  private user: User;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  public login(username: string, password: string): Promise<Token> {
    return this.http.post<Token>(
      ApiSettings.API_HOST + '/api/login',
      { username: username, password: password })
      .toPromise()
      .then(response => {
        this.localStorageService.setJwtToken(response.token);
        return response;
      })
      .catch(this.handleError);
  }

  getUser(username: string) {
    return this.http.get<User>(ApiSettings.API_HOST + '/api/user/' + username);
  }

  public subscribe(username: string): Promise<any> {
    return this.http.post(
      ApiSettings.API_HOST + '/api/user/' + username + '/subscribe',
      {},
      { headers: this.getAuthHeader() }
      )
      .toPromise()
      .catch(this.handleError);
  }

  public unsubscribe(username: string): Promise<any> {
    return this.http.post(
      ApiSettings.API_HOST + '/api/user/' + username + '/unsubscribe',
      {},
      { headers: this.getAuthHeader() }
      )
      .toPromise()
      .catch(this.handleError);
  }

  public getLoggedInUser(): Promise<User> {
    if (this.localStorageService.getJwtToken()) {
      if (this.user) {
        return Promise.resolve(this.user);
      } else {
        return this.http.get<User>(
          ApiSettings.API_HOST + '/api/user',
          { headers: this.getAuthHeader() }
          )
          .toPromise()
          .then(user => {
            this.user = user;
            return user;
          })
          .catch(this.handleError);
      }
    } else {
      return Promise.resolve(null);
    }
  }

  private getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers.append('Authorization', this.localStorageService.getJwtToken());
  }

  private handleError(error: any): Promise<any> {
    if (error.statusCode === 401) {
      this.localStorageService.clear();
      this.user = null;
    }
    console.log(error);
    return Promise.reject(error.message || error);
  }
}
