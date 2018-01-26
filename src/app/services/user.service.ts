import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
      .catch(error => this.handleError(error));
  }

  getUser(username: string) {
    return this.http.get<User>(ApiSettings.API_HOST + '/api/user/' + username);
  }

  public getAll() {
    return this.http.get<User[]>(ApiSettings.API_HOST + '/api/users')
      .toPromise();
  }

  public subscribe(username: string): Promise<any> {
    return this.http.post(
      ApiSettings.API_HOST + '/api/user/' + username + '/subscribe',
      {},
      { headers: this.getAuthHeader() }
      )
      .toPromise()
      .catch(error => this.handleError(error));
  }

  public unsubscribe(username: string): Promise<any> {
    return this.http.post(
      ApiSettings.API_HOST + '/api/user/' + username + '/unsubscribe',
      {},
      { headers: this.getAuthHeader() }
      )
      .toPromise()
      .catch(error => this.handleError(error));
  }

  public getLoggedInUser(): Promise<User> {
    if (this.localStorageService.getJwtToken()) {
      if (this.user) {
        return Promise.resolve(this.user);
      } else {
        return this.reloadLoggedInUser();
      }
    } else {
      return Promise.reject(null);
    }
  }

  public reloadLoggedInUser(): Promise<User> {
    if (this.localStorageService.getJwtToken()) {
      return this.http.get<User>(
        ApiSettings.API_HOST + '/api/user',
        {headers: this.getAuthHeader()}
      )
        .toPromise()
        .then(user => {
          this.user = user;
          return user;
        })
        .catch(error => this.handleError(error));
    } else {
      return Promise.reject(null);
    }
  }

  public changeSettings(username: string, data: FormData): Promise<any> {
    return this.http.put(
      ApiSettings.API_HOST + '/api/user/' + username,
      data,
      { headers: this.getAuthHeader() }
    ).toPromise();
  }

  public changePassword(username: string, data: FormData): Promise<any> {
    return this.http.post(
      ApiSettings.API_HOST + '/api/user/' + username + '/password',
      data,
      { headers: this.getAuthHeader() }
    ).toPromise();
  }

  public logout() {
    this.resetStoredValues();
  }

  public removeUsers(users: string[]) {
    let params = new HttpParams();
    params = params.append('users', users.toString());

    return this.http.delete(
      ApiSettings.API_HOST + '/api/users',
      { headers: this.getAuthHeader(), params:  params }
      ).toPromise();
  }

  private getAuthHeader(): HttpHeaders {
    const headers = new HttpHeaders();
    return headers.append('Authorization', this.localStorageService.getJwtToken());
  }

  private handleError(error: any): Promise<any> {
    console.error(error);
    if (error.error && error.error.statusCode === 401) {
      this.resetStoredValues();
    }
    return Promise.reject(error.message || error);
  }

  private resetStoredValues() {
    this.localStorageService.clear();
    this.user = null;
  }
}
