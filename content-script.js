

chrome.runtime.onMessage.addListener(async function (response, sendResponse) {
  const container = '[aria-labelledby="accessible-list-1"]'
  console.log("🚀 ~ file: content-script.js ~ line 4 ~ response, sendResponse", response, sendResponse)
  // storing the scroll position

  // storing all the connections
  var mutualConnections = [];

  // track the dublicates in the list
  var mutualIds = [];

  let retriesLeft = 100
  let startScroll = window.scrollY

  // debugger;


  const scrollAndScan = async () => {
    if (retriesLeft <= 0) {
      console.log("🚀 ~ file: content-script.js ~ line 21 ~ scrollAndScan ~ retriesLeft", retriesLeft)
      return
    }
    // debugger;

    console.log("🚀 ~ scrolled to", startScroll)

    const profileDOMs = document.querySelectorAll('[data-testid="cellInnerDiv"]')

    profileDOMs.forEach((a) => {
      if (
        a.querySelectorAll('[data-testid="userFollowIndicator"]').length > 0
      ) {
        const id = a.style.transform.split("(")[1].split("p")[0];
        if (mutualIds.indexOf(id) === -1) {
          mutualIds.push(id);
          const name = a.querySelectorAll("a")[1].innerText
          console.log("🚀 ~ found", name)
          mutualConnections.push({
            name,
            username: a.querySelectorAll("a")[2].innerText,
            photo: a.querySelector("img").src,
            profileLink: a.querySelectorAll("a")[0].href,
          });
        }
      }
    });

    // smooth scroll to the by window hright
    window.scrollTo({ top: window.scrollY + window.innerHeight, behavior: 'smooth' });
    await delay(100)
    // await waitForScroll()


    // await window.scrollTo(0, window.scrollY + window.innerHeight);

    // check if the scroll position has changed
    if (startScroll === window.scrollY) {
      console.log("🚀 ~ file: content-script.js ~ line 57 ~ scrollAndScan ~ startScroll === window.scrollY", startScroll, window.scrollY, window.innerHeight)
      // debugger;
      await waitForDOMChange(container, 500)
      retriesLeft--

      // debugger;
      // await window.scrollTo(0, window.scrollY + window.innerHeight);
    } else {
      // retriesLeft = 3
    }

    startScroll = window.scrollY
    await scrollAndScan()
    await delay(0)

  }

  var websiteUrl = window.location.href;

  if (!websiteUrl.includes("following")) {
    console.log("Not on Following Page");
    return;
  }

  // clear out the sidebar
  // document.querySelectorAll('[aria-label="Trending"]')[0].innerHTML = "";

  scrollAndScan()

  console.log(mutualConnections);

});

const delay = (millis) => {
  new Promise((resolve, reject) => {
    setTimeout((_) => resolve(), millis);
  });
};


// a promise to wait for DOM sub tree to modify with a timeout
const waitForDOMChange = (selector, timeout = 500) => {
  return new Promise((resolve, reject) => {
    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      resolve();
    }, timeout);
  });
}


// promise to wait for the window smooth scroll to finish
const waitForScroll = () => {
  return new Promise((resolve, reject) => {
    let scrollCursor = window.scrollY;

    window.addEventListener('scroll', () => {
      scrollCursor = window.scrollY;
    });

    const interval = setInterval(() => {
      if (scrollCursor === window.scrollY) {
        clearInterval(interval);
        resolve();
      }
    }, 100)
  });
}


window.addEventListener('scroll', () => {
  console.log('scroll')
});