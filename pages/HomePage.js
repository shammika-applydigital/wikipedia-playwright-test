// pages/HomePage.js
class HomePage {
    constructor(page) {
        this.page = page;
        this.searchInput = 'input[name="search"]';
        this.suggestionDropdown = '#typeahead-suggestions';
        this.suggestionTitles = `${this.suggestionDropdown} .suggestion-title`;
    }

    async searchFor(term) {
        await this.page.click(this.searchInput);
        await this.page.fill(this.searchInput, '');
        await this.page.type(this.searchInput, term);

        //await this.page.fill(this.searchInput, term);
        //await this.page.locator(this.searchInput).click();
        //await this.page.waitForSelector(this.suggestionDropdown, { state: 'visible' });
    }

    async validateSuggestion(term) {

        // Wait for the suggestion titles to be visible to ensure they are loaded
        await this.page.waitForSelector(this.suggestionTitles, { state: 'visible' });
        // Collect all suggestion titles
        const suggestions = await this.page.$$eval(this.suggestionTitles, (titles) =>
            titles.map((title) => title.textContent.toLowerCase())
        );
        // Check if any of the collected titles includes the term
        return suggestions.some((title) => title.includes(term.toLowerCase()));
    }

    async clickFirstSuggestion() {
        await this.page.click(`${this.suggestionDropdown} .suggestion-link:first-child`);

    }
}

module.exports = HomePage;
