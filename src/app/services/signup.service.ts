import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable()
export class SignupService {

  private localUrl = 'http://localhost:4000/api/user';

  constructor(private http: HttpClient) { }

  public signup(
    username: string,
    displayname: string,
    password: string,
    passwordConfirm: string,
    email: string
  ): Promise<User> {
    return this.http.post<User>(this.localUrl, {
      username: username,
      displayname: displayname,
      password: password,
      passwordConfirm: passwordConfirm,
      email: email
    }).toPromise();
  }

}
