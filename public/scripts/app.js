/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// TEST CODE!!! EVENTUALLY WILL PULL FROM SERVER
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

// createTweetElement produces the html for the individual elements.
function createTweetElement (input) {
  // Create variables representing the individual elements in a tweet.
  // Tweet wrap creation
  let tweetWrap = $('<article>').addClass('tweetContainer');

  // Tweet Header creation
  let tweetHead = $('<header>');
  let profImg = $('<img />')
  let name = $('<h2>')
  let userName = $('<p>');

  // Tweet Content creation
  let tweetContent = $('<div>').addClass('tweetContent');
  let tweetContentText = $('<p>');

  // Tweet Footer creation.
  let tweetFooter = $('<footer>');
  let footerSplitLeft = $('<div>').addClass('col-50');
  let footerSplitRight = $('<div>').addClass('col-50');
  let dateAgo = $('<p>');
  let icons = $('<p>').addClass('icons');

  // Converts date from millisecond format -> "Normal" format, and how long since that point in time.
  function convertDate (inputDate) {
    var seconds = Math.floor((new Date() - inputDate) / 1000);
    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years ago';
    }
    interval = Math.floor(seconds / 2592000);

    if (interval > 1) {
      return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);

    if (interval > 1) {
      return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);

    if (interval > 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);

    if (interval > 1) {
      return interval + ' minutes ago';
    }

    return Math.floor(seconds) + ' seconds ago';
  }

  // Appending elements to facilitate the creation of a tweet.

  // Create tweet wrapper.
  $(tweetWrap).append(tweetHead);

  // Create tweet header.
  $(tweetHead).append(profImg);
  $(profImg).attr('src', input['user']['avatars']['small']);
  $(tweetHead).append(name);
  $(name).text(input['user']['name']);
  $(tweetHead).append(userName);
  $(userName).text(input['user']['handle']);

  // Create tweet content.
  $(tweetWrap).append(tweetContent);
  $(tweetContent).append(tweetContentText);
  $(tweetContentText).text(input['content']['text']);

  // Create footer.
  $(tweetWrap).append(tweetFooter);
  $(tweetFooter).append(footerSplitLeft);
  $(footerSplitLeft).append(dateAgo);
  $(dateAgo).text(convertDate(input['created_at']));
  $(tweetFooter).append(footerSplitRight);
  $(footerSplitRight).append(icons);
  $(icons).append('<i class="fas fa-flag"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i>')
  return tweetWrap;
}

// Loop through database and run the createTweetElement for each entry found.
function renderTweets (inputData) {
  for (let tweet in inputData) {
    $('.container').append(createTweetElement(inputData[tweet]))
  }
}

// Run function on load.
$(document).ready(function() {
  renderTweets(data)
});
