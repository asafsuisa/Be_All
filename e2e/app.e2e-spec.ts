import { BeallPage } from './app.po';

describe('beall App', () => {
  let page: BeallPage;

  beforeEach(() => {
    page = new BeallPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
