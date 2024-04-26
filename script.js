// Create an api widget
class QuoteWidget {
  constructor(apiUrl, outputElementId) {
    this.apiUrl = apiUrl;
    this.outputElementId = outputElementId;
  }

  async fetchQuote(searchTerm = '') {
    const searchUrl = searchTerm ? `https://api.quotable.io/search/quotes?query=${encodeURIComponent(searchTerm)}` : this.apiUrl;
    try {
      const response = await fetch(searchUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching quote:', error);
      return null;
    }
  }

  async displayQuote() {
    const quoteData = await this.fetchQuote();
    const outputElement = document.getElementById(this.outputElementId);
    if (quoteData && quoteData.results.length > 0 && outputElement) {
      const firstQuote = quoteData.results[0];
      outputElement.innerHTML = `<p>${firstQuote.content}</p><p>- ${firstQuote.author}</p>`;
    } else {
      console.log('No quote found or output element missing');
    }
  }

  async searchQuote(searchTerm) {
    const quoteData = await this.fetchQuote(searchTerm);
    const outputElement = document.getElementById(this.outputElementId);
    if (quoteData && quoteData.results.length > 0 && outputElement) {
      const firstQuote = quoteData.results[0];
      outputElement.innerHTML = `<p>${firstQuote.content}</p><p>- ${firstQuote.author}</p>`;
      // Call handleSearchResult with no error and the quote data to hide the error message
      handleSearchResult(null, firstQuote);
    } else {
      // Call handleSearchResult with an error if no quote was found
      handleSearchResult(new Error('No quote found or output element missing'), null);
    }
  }
}

// Example usage in index.html:
// <div id="quote"></div>
// <script>
//   const quoteWidget = new QuoteWidget('https://api.quotable.io/random', 'quote');
//   quoteWidget.searchQuote('inspiration');
// </script>

