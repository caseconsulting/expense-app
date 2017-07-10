import { ExpenseAppPage } from './app.po';

describe('expense-app App', () => {
  let page: ExpenseAppPage;

  beforeEach(() => {
    page = new ExpenseAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
