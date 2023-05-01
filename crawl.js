const { JSDOM } = require("jsdom");

function getURLsFromHTML(HTMLbody, basePath) {
  const URLsArray = [];
  const dom = new JSDOM(HTMLbody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const link of linkElements) {
    if (link.href.slice(0, 1) === "/") {
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
  if (hostPath && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = { normalizeURL, getURLsFromHTML };
