import { browser, by, element } from 'protractor';

export class AppPage {
  header = element(by.className('navbar-brand'));

  searchInput = element(by.id('city'));

  button = element(by.className('btn-search'));

  results = element(by.id('resultsTable'));

  errorText = element(by.id('searchError'));
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
