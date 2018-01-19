export class User {
  constructor(public id: string,
              public username: string,
              public displayname: string,
              public email: string,
              public joined: Date,
              public description: string,
              public subscribers: string[],
              public image: string,
              public subscriptions: string[]
  ) {}
}
