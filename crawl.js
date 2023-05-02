const { JSDOM } = require('jsdom');
// import JSDOM from 'jsdom';

async function crawlPage(baseURL, currentURL, pages) {
  // If this is on offsite URL, return immediately
  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  // If we have already visited this page
  // just increase the count and don't visit again
  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  // Initialize this page in the map
  // since it doesn't exist yet
  pages[normalizedURL] = 1;

  console.log(`Actively crawling ${currentURL}`);

  try {
    const resp = await fetch(currentURL);

    const status = resp.status;

    if (status > 399) {
      console.log(`Error with fetch status code ${status} with ${currentURL}`);
      return pages;
    }

    const contentType = resp.headers.get('content-type');

    if (!contentType.includes('text/html')) {
      console.log(`Content type: ${contentType} in ${currentURL}`);
      return pages;
    }

    const htmlBody = await resp.text();

    const nextURLs = getURLsFromHTML(htmlBody, baseURL);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`Error: ${err.message} with ${currentURL}`);
  }

  return pages;
}

function getURLsFromHTML(HTMLbody, basePath) {
  const URLsArray = [];

  const dom = new JSDOM(HTMLbody);
  const linkElements = dom.window.document.querySelectorAll('a');

  for (const link of linkElements) {
    if (link.href.slice(0, 1) === '/') {
      // Relative url
      try {
        const urlObj = new URL(`${basePath}${link.href}`);
        URLsArray.push(urlObj.href);
      } catch (err) {
        console.log(`error with relative url: ${err.message}`);
      }
    } else {
      // Absolute url
      try {
        const urlObj = new URL(link.href);
        URLsArray.push(urlObj.href);
      } catch (err) {
        console.log(`error with absolute url: ${err.message}`);
      }
    }
  }
  return URLsArray;
}

function normalizeURL(urlString) {
  const urlObject = new URL(urlString);
  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostPath && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
// export { crawlPage };
