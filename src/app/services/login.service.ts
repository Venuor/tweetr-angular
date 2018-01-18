import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Token } from '../model/token';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class LoginService {

  private localUrl = 'http://localhost:4000/api/login';

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  public login(username: string, password: string): Promise<Token> {
    return this.http.post<Token>(this.localUrl, { username: username, password: password })
      .toPromise()
      .then(response => {
        this.localStorageService.setJwtToken(response.token);
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
