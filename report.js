function printPages(pages) {
  console.log('==================');
  console.log('REPORT');
  console.log('==================');

  const sortedPages = sortPages(pages);
  for (let index = 0, l = sortedPages.length; index < l; index += 1) {
    //   for (const page of sortedPages) {
    const page = sortedPages[index];
    const url = page[0];
    const hits = page[1];

    console.log(`Found ${hits} links to page: ${url}`);
  }

  console.log('=================');
  console.log('END REPORT');
  console.log('==================');
}

function sortPages(pages) {
  const pagesArray = Object.entries(pages);
  pagesArray.sort((a, b) => b[1] - a[1]);
  return pagesArray;
}

module.exports = {
  sortPages,
  printPages,
};
