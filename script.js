const quoteContainer = document.querySelector(".quote-container");
const quote = document.querySelector(".quote");
const author = document.querySelector("#author");
const quoteBtn = document.querySelector(".new-quote");
const twitterBtn = document.querySelector(".twitter-button");
const loader = document.querySelector(".loader");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function completeLoading() {
  if (loader.hidden === false) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get quote from https://www.forismatic.com/
// Creating a async function which returns a promise
async function getQuote() {
  loading();
  // This won't work directly because of CORS policy
  // Notice that ? before adding parameters
  const apiUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  // Using a proxy API to get the data from above usl
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    // If author name is black add unknown
    data.quoteAuthor === "" ? (author.textContent = "unknown") : (author.textContent = data.quoteAuthor);
    data.quoteText.length > 100 ? quote.classList.add("long-quote") : quote.classList.remove("long-quote");
    quote.textContent = data.quoteText;
  } catch (error) {
    // We may get an error if json data have some quotes so
    // That's why if this catch block runs anyway we will call the same function again
    console.log("inside catch");
    console.log("Something went wrong!", error);
  }
  completeLoading();
}

// Twitter API to tweet the data
function tweetQuote() {
  const quoteText = quote.textContent;
  const authorName = author.textContent;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText} - ${authorName}`;
  window.open(twitterUrl, "_blank");
}

// Calling the function
getQuote();

quoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);
