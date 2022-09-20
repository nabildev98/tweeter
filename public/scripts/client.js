/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// will turn the tweet objects into HTML formatted tweet articles

const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweet = function (data) {
  $("#tweet-container").empty();
  for (let tweet of data) {
    $("#tweet-container").prepend(createTweetElement(tweet));
  }
};

const createTweetElement = function (data) {
  console.log(data);
  let $tweet = $(`

  <article class="tweet">
  <header>
    <div class="icon-container">
      <img class="avatars"
        src="${escape(data.user.avatars)}"
        alt="">
      <h3>${escape(data.user.name)}</h3>
    </div>
    <h4>${escape(data.user.handle)}</h4>
  </header>

  <p>${escape(data.content.text)}</p>
  
  <footer>
    <h2>${escape(timeago.format(data.created_at))}
  
    </h2>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>
  `);
  return $tweet;
};

const submitTweet = function (event) {
  event.preventDefault();
  // console.log('data being sent to server!');

  $(".error").slideUp(400).text("");

  if (!$(this).children().find("textarea").val()) {
    return $(".error").text("Valid tweet must be entered").slideDown();
  }
  if ($(this).children().find("textarea").val().length > 140) {
    return $(".error").text("Maximum limit exceeded").slideDown();
  }

  $.ajax("/tweets", {
    method: "POST",
    data: $(this).serialize(),
  })

    .then(function (tweet) {
      loadTweets();
    })
    .catch((err) => {
      console.log("error", err);
    });
  $(this).children().find("textarea").val("");
  $(".counter").text(140);
};

const loadTweets = function () {
  $.ajax("/tweets", { method: "GET" }).then((tweets) => {
    console.log("pulling tweets from database!");
    renderTweet(tweets);
  });
};

const timeSinceTweet = () => {
  const rightNow = Date();
  const millisofDay = 24 * 60 * 60 * 1000;
  const timeDifference = (rightNow - dateOfTweet) / millisofDay;
  const hourDifference = timeDifference * 24;
  const minuteDifference = hourDifference * 60;
  if (Math.floor(hourDifference) === 0) {
    return `${Math.floor(minuteDifference)} minutes`;
  } else if (Math.floor(timeDifference / 365) === 0) {
    return `${Math.floor(hourDifference)} hours`;
  } else if (timeDifference < 31) {
    return `${Math.floor(timeDifference / 365)} days`;
  } else if (timeDifference <= 365) {
    return `${Math.floor(timeDifference / 31)} months`;
  } else {
    return `${Math.floor(timeDifference / 365)} years`;
  }
};

$(document).ready(() => {
  loadTweets();
  // renderTweet(data);
  $(".tweetSubmit").submit(submitTweet);
});
