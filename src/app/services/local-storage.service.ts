import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  private tokenKey: string = 'tweetr_token';

  constructor() { }

  public setJwtToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  public getJwtToken(): string {
    return localStorage.getItem(this.tokenKey);
  }
}
