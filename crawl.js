// const { JSDOM } = require("jsdom");
import JSDOM from "jsdom";

async function crawlPage(url) {
  console.log(`Actively crawling ${url}`);
  try {
    const resp = await fetch(url);

    const status = resp.status;

    if (status > 399) {
      console.log(`Error with fetch status code ${status} with ${url}`);
      return;
    }

    const contentType = resp.headers.get("content-type");

    if (!contentType.includes("text/html")) {
      console.log(`Content type: ${contentType} in ${url}`);
      return;
    }
    console.log(await resp.text());
  } catch (err) {
    console.log(`Error: ${err.message} with ${url}`);
  }
}

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

// module.exports = { normalizeURL, getURLsFromHTML, crawlPage };
export { crawlPage };
