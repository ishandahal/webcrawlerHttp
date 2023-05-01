function normalizeURL(urlString) {
  const urlObject = new URL(urlString);
  const hostPath = `${urlObject.hostname}${urlObject.pathname}`;
  if (hostPath && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = { normalizeURL };
