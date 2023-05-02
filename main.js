// import { crawlPage } from './crawl.js';
const { crawlPage } = require('./crawl');

async function main() {
  if (process.argv.length < 3) {
    console.log('No url found.');
    process.exit(1);
  }
  if (process.argv.length > 3) {
    console.log('Can only provide one url.');
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`Crawling ${baseURL}`);

  const pages = await crawlPage(baseURL, baseURL, {});

  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

main();
