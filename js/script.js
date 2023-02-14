// Selecting Elements
const quoteContainer = document.querySelector('.quote-container');
const quoteText = document.querySelector('.quote');
const author = document.querySelector('.author');
const newQuoteBtn = document.querySelector('.new-btn');
const twitterBtn = document.querySelector('.twitter-btn');
const loader = document.querySelector('.loader');

let apiQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  // Getting a Random Quote
  const quote = apiQuotes[Math.trunc(Math.random() * apiQuotes.length)];

  if (quote.text.length > 120) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;

  // Check for author
  if (!quote.author) {
    author.textContent = 'Unknown';
  } else if (quote.author) {
    author.textContent = quote.author;
  }
}

function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} — ${author.textContent}`;
  window.open(twitterURL, '_blank');
}

// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();

  const apiURL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();

    newQuote();

    hideLoadingSpinner();
  } catch {
    console.log("Whoops, there's an error");
  }
}

// On Load
getQuotes();

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
