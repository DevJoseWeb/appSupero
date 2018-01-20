import {browser} from 'protractor';

describe('App', () => {

  beforeEach(() => {
    browser.get('/');
  });

  it('it should be true', () => {
    expect(true).toEqual(true);
  });
});
