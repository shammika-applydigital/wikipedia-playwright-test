// tests/wikipedia_search.spec.js
const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const ArticlePage = require('../pages/ArticlePage');

test('Wikipedia search and validation with dropdown suggestion', async ({ page, baseURL }) => {
  const searchTerm = 'Weather ';

  // Initialize page objects
  const homePage = new HomePage(page);
  const articlePage = new ArticlePage(page);

  // Step 1: Navigate to Wikipedia's homepage
  await page.goto('/');
  await page.getByLabel('minimize').click();

  // Step 2: Search for the term and validate the dropdown
  await homePage.searchFor(searchTerm);
  const suggestionIsRelevant = await homePage.validateSuggestion(searchTerm);
  expect(suggestionIsRelevant).toBeTruthy();

  // Step 3: Click on the first suggestion to navigate to the article
  await homePage.clickFirstSuggestion();

  // Step 4: Validate the content table exists on the article page
  // const hasContentTable = await articlePage.hasContentTable();
  // expect(hasContentTable).toBeTruthy();
  await articlePage.isContentTableVisible();


  // Bonus Step 5: Change the language to French and validate the URL
  await articlePage.changeLanguageToFrench();
  await articlePage.isLanguageFrench();
});
