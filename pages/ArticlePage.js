// pages/ArticlePage.js
import { test, expect } from '@playwright/test';
class ArticlePage {
    constructor(page) {
        this.page = page;
        this.contentTable = '#vector-toc';
        this.languageButton = '#p-lang-btn-checkbox'; // Button to open language dropdown
        //this.languageSearchInput = 'input.uls-filterinput'; // Language search input
        this.languageSearchInput = 'input.uls-filterinput[placeholder="Search for a language"]';
        this.frenchLanguageOption = 'li[data-code="fr"]'; // French language option
        this.pageTitle = '#firstHeading .mw-page-title-main'; // Page title for language verification

    }

    // Checks if the content table exists on the page
    async hasContentTable() {
        return (await this.page.$(this.contentTable)) !== null;
    }

    // Checks if the content table is visible on the page
    async isContentTableVisible() {
        return await this.page.isVisible(this.contentTable);
    }

    async changeLanguageToFrench() {

        await this.page.waitForTimeout(1000);
        // Click on the language button to open the dropdown
        //await this.page.check(this.languageButton);
        await this.page.waitForSelector(this.languageButton, { state: 'visible' });
        await this.page.click(this.languageButton);
        // Wait for the language search input to be visible
        await this.page.waitForTimeout(1000);
        await this.page.waitForSelector(this.languageSearchInput, { state: 'visible' });
        // Type "French" into the language search input
        await this.page.fill(this.languageSearchInput, 'French');
        // Click the French language option
        await this.page.click(this.frenchLanguageOption);
    }

    // async isLanguageFrench() {
    //     // Check if the current URL includes '/fr/' to confirm the language change
    //     const isUrlCorrect = this.page.url().includes('/fr/');
    //     // Wait for the French title to be visible and then verify it's the correct title
    //     const isTitleCorrect = await this.page.isVisible(this.pageTitle) &&
    //         (await this.page.textContent(this.pageTitle)) === 'Temps (météorologie)';
    //     return isUrlCorrect && isTitleCorrect;
    // }

    async isLanguageFrench() {
        // Check if the current URL includes '/fr/' to confirm the language change
         const currentUrl = this.page.url();
         //expect(currentUrl).toContain('/fr/', 'URL does not include /fr/, indicating the page may not have switched to French.');
         await expect(this.page).toHaveURL(/.*fr/);
    
        // Then verify it's the correct title
        const pageTitleText = await this.page.textContent(this.pageTitle);
        expect(pageTitleText).toBe('Temps (météorologie)', 'The page title does not match the expected French title.');
    
        // If both conditions are true, the page has successfully switched to French
        return true;
    }
}

module.exports = ArticlePage;
