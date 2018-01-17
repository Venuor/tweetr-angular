import { TweetrAngularPage } from './app.po';

describe('tweetr-angular App', () => {
  let page: TweetrAngularPage;

  beforeEach(() => {
    page = new TweetrAngularPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
