import { AppPage } from './app.po';
import { protractor, browser, until, by } from 'protractor';

describe('angular-weather App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display the heading', () => {
    page.navigateTo();
    expect(page.header.isDisplayed()).toBe(true);
  });

  it('should get some results for a valid city', () => {
    page.navigateTo();
    page.searchInput.sendKeys('Paris');
    page.button.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.results), 5000);
    expect(page.results.isDisplayed()).toBe(true);
    const rowElems = page.results.$$('tr');
    expect(rowElems.count()).toBe(2);
    const firstCol = rowElems.get(1).$$('td');
    expect(firstCol.get(0).getText()).toMatch('Paris');
  });

  it('should get show error for a invalid city', () => {
    page.navigateTo();
    page.searchInput.sendKeys('124124');
    page.button.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.errorText), 5000);
    expect(page.errorText.isDisplayed()).toBe(true);
  });

  it('should get multiple results for valid cities', () => {
    page.navigateTo();
    page.searchInput.sendKeys('Paris');
    page.button.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.results), 5000);
    expect(page.results.isDisplayed()).toBe(true);
    let rowElems = page.results.$$('tr');
    expect(rowElems.count()).toBe(2);
    let firstCol = rowElems.get(1).$$('td');
    expect(firstCol.get(0).getText()).toMatch('Paris');
    page.searchInput.clear();
    page.searchInput.sendKeys('London');
    page.button.click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(page.results, 'London'), 5000);
    rowElems = page.results.$$('tr');
    expect(rowElems.count()).toBe(3);
    firstCol = rowElems.get(2).$$('td');
    expect(firstCol.get(0).getText()).toMatch('London');
    page.searchInput.clear();
    page.searchInput.sendKeys('New York');
    page.button.click();
    browser.wait(protractor.ExpectedConditions.textToBePresentInElement(page.results, 'New York'), 5000);
    rowElems = page.results.$$('tr');
    expect(rowElems.count()).toBe(4);
    firstCol = rowElems.get(3).$$('td');
    expect(firstCol.get(0).getText()).toMatch('New York');
  });

  it('should get one result for a valid city that is searched multiple times', () => {
    page.navigateTo();
    page.searchInput.sendKeys('Paris');
    page.button.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.results), 5000);
    expect(page.results.isDisplayed()).toBe(true);
    page.button.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.results), 5000);
    page.button.click();
    browser.wait(protractor.ExpectedConditions.presenceOf(page.results), 5000);
    const rowElems = page.results.$$('tr');
    expect(rowElems.count()).toBe(2);
    const firstCol = rowElems.get(1).$$('td');
    expect(firstCol.get(0).getText()).toMatch('Paris');
  });

});
