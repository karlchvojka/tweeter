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

    // Convert for years
    if (interval > 1) {
      return interval + ' years ago';
    }
    interval = Math.floor(seconds / 2592000);

    // Convert for months
    if (interval > 1) {
      return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);

    // Convert for days
    if (interval > 1) {
      return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);

    // Convert for hours
    if (interval > 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);

    // Convert for Minuets
    if (interval >= 1) {
      return interval + ' minutes ago';
    }

    // Convert for Seconds
    return Math.floor(seconds) + ' seconds ago';
  }

  // ****************************************************** //
  // Appending elements to facilitate the creation of a tweet.
  // ****************************************************** //
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
    $('.pre-tweets').prepend(createTweetElement(inputData[tweet]))
  }
}

// Run function on load.
$(document).ready(function () {

  $('.composeButton').click(function () {
    $('.new-tweet').slideToggle('slow', function () {
      $('.new-tweet form textarea').focus();
    });
  })
  // Handles Form Submission
  $('.new-tweet form').submit(function (e) {
    e.preventDefault();

    // Error checks for empty textarea
    if (!$('textarea', this).val()) {
      // Check for fixes and hide error messages.
      if ($('.errorMessages:visible').length > 0) {
        $('.errorMessages').slideToggle('slow');
      }

      $('.errorMessages').slideToggle('slow');
      $('.errorMessages h3').text('Please fill out the form properly');
      return
    }

    // Error checks for tweets that are too long
    if ($('.new-tweet form textarea').val().length > 140) {
      // Check for fixes and hide error messages.
      if ($('.errorMessages:visible').length > 0) {
        $('.errorMessages').slideToggle('slow');
      }

      $('.errorMessages').slideToggle('slow');
      $('.errorMessages h3').text('Tweet max length is 140. Please try again.');
      return
    }

    if ($('.errorMessages:visible').length > 0) {
      $('.errorMessages').slideToggle('slow');
    }

    // Serializes the data inputed into the field.
    const sentData = $(this).serialize();

    // AJAX POST declaration.
    $.ajax({
      type: 'POST',
      url: '/tweets',
      data: sentData
    })

    loadTweets();
  })

  // Load Tweets declared as variable.
  const loadTweets = () => $.ajax({
    type: 'GET',
    url: '/tweets',
    dataType: 'json'
  })
    .done(function (response) {
      // Render tweets after loading from Database.
      renderTweets(response);
    })

  // Call Loadtweets on document load.
  loadTweets();
});
