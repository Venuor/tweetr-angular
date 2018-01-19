export class Tweet {
  constructor(
    public id: string,
    public text: string,
    public date: Date,
    public user: {
      id: string,
      username: string,
      displayname: string,
      profile: string,
      image: string
    },
    public image: string
  ) {}
}
