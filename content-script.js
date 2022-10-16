const getConnections = async () => {
  var websiteUrl = window.location.href;

  if (websiteUrl.includes("following")) {
    document.querySelectorAll('[aria-label="Trending"]')[0].innerHTML = "";

    var mutualConnections = [];
    var mutualIds = [];

    for (var i = 0; i < 200; i++) {
      console.log("Loop", i);
      window.scrollTo(0, window.scrollY + window.innerHeight);
      document.querySelectorAll('[data-testid="cellInnerDiv"]').forEach((a) => {
        if (
          a.querySelectorAll('[data-testid="userFollowIndicator"]').length > 0
        ) {
          var id = a.style.transform.split("(")[1].split("p")[0];
          console.log(a.querySelectorAll("a")[0].href);
          console.log(id);

          if (mutualIds.indexOf(id) === -1) {
            mutualIds.push(id);
            mutualConnections.push({
              name: a.querySelectorAll("a")[1].innerText,
              username: a.querySelectorAll("a")[2].innerText,
              photo: a.querySelector("img").src,
              profileLink: a.querySelectorAll("a")[0].href,
            });
          }
        }
      });
      await delay(500);
    }
    console.log(mutualConnections);
  } else {
    console.log("Not on Following Page");
  }
};

chrome.runtime.onMessage.addListener(async function (response, sendResponse) {
  var websiteUrl = window.location.href;

  if (websiteUrl.includes("following")) {
    document.querySelectorAll('[aria-label="Trending"]')[0].innerHTML = "";

    var mutualConnections = [];
    var mutualIds = [];

    for (var i = 0; i < 200; i++) {
      console.log("Loop", i);
      window.scrollTo(0, window.scrollY + window.innerHeight);
      document.querySelectorAll('[data-testid="cellInnerDiv"]').forEach((a) => {
        if (
          a.querySelectorAll('[data-testid="userFollowIndicator"]').length > 0
        ) {
          var id = a.style.transform.split("(")[1].split("p")[0];
          console.log(a.querySelectorAll("a")[0].href);
          console.log(id);

          if (mutualIds.indexOf(id) === -1) {
            mutualIds.push(id);
            mutualConnections.push({
              name: a.querySelectorAll("a")[1].innerText,
              username: a.querySelectorAll("a")[2].innerText,
              photo: a.querySelector("img").src,
              profileLink: a.querySelectorAll("a")[0].href,
            });
          }
        }
      });
      await delay(500);
    }
    console.log(mutualConnections);
  } else {
    console.log("Not on Following Page");
  }
});

const delay = (millis) => {
  new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), millis);
  });
};
